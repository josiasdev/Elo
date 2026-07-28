import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma.js'
import { config } from '../../config.js'
import {
  hashCredential,
  buildVerifiableCredential,
  type CredentialData,
} from '../../services/credential.js'
import { anchorCredential, verifyCredentialOnChain } from '../../services/blockchain.js'
import { logger } from '../../lib/logger.js'

export async function credentialRoutes(app: FastifyInstance) {
  /**
   * POST /credentials/:id/anchor
   * Gera o VC, calcula o hash, ancora no Soroban e grava no banco. RF15-RF17
   */
  app.post(
    '/:id/anchor',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { sub: userId, role } = request.user as { sub: string; role: string }

      // Apenas institution_user ou admin podem ancorar
      if (role !== 'institution_user' && role !== 'admin') {
        return reply.status(403).send({ error: 'Acesso negado.' })
      }

      const { id: credentialId } = request.params as { id: string }

      // Tenta buscar credencial existente por ID ou criar via participation_id
      // Para o MVP: o ID é o participation_id — a credencial é gerada na primeira ancoragem
      const participation = await prisma.participation.findUnique({
        where: { id: credentialId },
        include: {
          opportunity: {
            include: {
              institution: { select: { id: true, nome: true } },
              municipio: { select: { id: true } },
            },
          },
          young: { select: { id: true } },
        },
      })

      if (!participation) {
        return reply.status(404).send({ error: 'Participação não encontrada.' })
      }

      if (participation.status !== 'CONFIRMADA_PELA_INSTITUICAO') {
        return reply.status(400).send({
          error: 'A participação deve estar confirmada antes de emitir a credencial.',
        })
      }

      // Verifica se já existe credencial ancorada
      if (participation.credential_id) {
        const existing = await prisma.credential.findUnique({
          where: { id: participation.credential_id },
        })
        if (existing && existing.status !== 'PENDENTE_ANCORAGEM') {
          return reply.status(409).send({ error: 'Esta participação já possui credencial emitida.' })
        }
      }

      const opp = participation.opportunity

      const dadosCredencial: CredentialData = {
        institution_id: opp.institution.id,
        institution_nome: opp.institution.nome,
        opportunity_titulo: opp.titulo,
        opportunity_tipo: opp.tipo,
        ods: opp.ods,
        faixa_etaria: participation.young
          ? calcularFaixaEtaria(
              (
                await prisma.young.findUnique({
                  where: { id: participation.young_id },
                  select: { ano_nascimento: true },
                })
              )!.ano_nascimento,
            )
          : 'N/A',
        periodo_inicio: opp.data_inicio?.toISOString() ?? null,
        periodo_fim: opp.data_fim?.toISOString() ?? null,
        municipio_id: opp.municipio.id,
        emitida_em: new Date().toISOString(),
        emissor: config.ELOCIV_ISSUER_PUBLIC_KEY,
      }

      const hash = hashCredential(dadosCredencial)
      const vcJson = buildVerifiableCredential(dadosCredencial, hash)

      // Cria a credencial no banco com status PENDENTE_ANCORAGEM
      const credential = await prisma.credential.create({
        data: {
          participation_id: participation.id,
          young_id: participation.young_id,
          dados_credencial: vcJson as any,
          hash_ancorado: hash,
          emissor: config.ELOCIV_ISSUER_PUBLIC_KEY,
          visibilidade: 'PRIVADA',
          status: 'PENDENTE_ANCORAGEM',
        },
      })

      // Vincula à participação e atualiza status
      await prisma.participation.update({
        where: { id: participation.id },
        data: { credential_id: credential.id, status: 'CERTIFICADO_EMITIDO' },
      })

      // Ancora no Soroban
      try {
        const { tx_id, ledger } = await anchorCredential(hash)

        await prisma.credential.update({
          where: { id: credential.id },
          data: { tx_id, block_number: ledger, status: 'ATIVA' },
        })

        return reply.status(201).send({
          id: credential.id,
          hash_ancorado: hash,
          tx_id,
          ledger,
          status: 'ATIVA',
          mensagem: 'Credencial emitida e ancorada com sucesso na blockchain Stellar.',
        })
      } catch (err) {
        logger.error({ err, credentialId: credential.id }, 'Falha na ancoragem Stellar')

        // RNF07: erro de blockchain não apaga a operação
        return reply.status(202).send({
          id: credential.id,
          hash_ancorado: hash,
          status: 'PENDENTE_ANCORAGEM',
          mensagem:
            'Credencial gerada, mas a ancoragem na blockchain está pendente. Use POST /credentials/:id/anchor para reprocessar.',
        })
      }
    },
  )

  /**
   * GET /credentials/:id/verify
   * Retorna dados off-chain e resultado on-chain do hash. RF18
   */
  app.get('/:id/verify', async (request, reply) => {
    const { id } = request.params as { id: string }

    const credential = await prisma.credential.findUnique({
      where: { id },
      include: {
        participation: {
          include: {
            opportunity: {
              select: {
                titulo: true,
                tipo: true,
                data_inicio: true,
                data_fim: true,
                institution: { select: { nome: true } },
              },
            },
          },
        },
      },
    })

    if (!credential) {
      return reply.status(404).send({ error: 'Credencial não encontrada.' })
    }

    // Consulta on-chain
    const onChain = await verifyCredentialOnChain(credential.hash_ancorado)

    return reply.send({
      id: credential.id,
      hash: credential.hash_ancorado,
      status: credential.status,
      tx_id: credential.tx_id,
      ledger: credential.block_number,
      emitida_em: credential.emitida_em,
      on_chain: onChain,
      atividade: credential.participation.opportunity.titulo,
      instituicao: credential.participation.opportunity.institution.nome,
    })
  })

  /**
   * PATCH /credentials/:id/visibility
   * Jovem altera visibilidade da credencial (pública/privada). RF20
   */
  app.patch(
    '/:id/visibility',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { sub: youngId, role } = request.user as { sub: string; role: string }

      if (role !== 'young') {
        return reply.status(403).send({ error: 'Apenas o jovem pode alterar a visibilidade.' })
      }

      const { id } = request.params as { id: string }
      const body = z
        .object({ visibilidade: z.enum(['PUBLICA', 'PRIVADA']) })
        .safeParse(request.body)
      if (!body.success) {
        return reply.status(400).send({ error: body.error.flatten() })
      }

      const credential = await prisma.credential.findUnique({ where: { id } })
      if (!credential || credential.young_id !== youngId) {
        return reply.status(404).send({ error: 'Credencial não encontrada.' })
      }

      const updated = await prisma.credential.update({
        where: { id },
        data: { visibilidade: body.data.visibilidade },
        select: { id: true, visibilidade: true },
      })

      return reply.send(updated)
    },
  )
}

function calcularFaixaEtaria(ano_nascimento: number): string {
  const idade = new Date().getFullYear() - ano_nascimento
  if (idade <= 14) return '12-14'
  if (idade <= 17) return '15-17'
  return '18+'
}
