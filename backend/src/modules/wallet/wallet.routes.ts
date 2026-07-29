import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma.js'

export async function walletRoutes(app: FastifyInstance) {
  /**
   * GET /wallet/public/:slug
   * Carteira pública do jovem. Exibe apenas credenciais marcadas como PUBLICA.
   * NUNCA expõe e-mail, telefone, endereço ou dados de contato. RF21
   */
  app.get('/public/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string }

    const young = await prisma.young.findUnique({
      where: { apelido: slug },
      select: {
        id: true,
        apelido: true,
        municipio: { select: { nome: true, uf: true } },
        interesses: true,
        // Apenas credenciais públicas e ativas
        credentials: {
          where: { visibilidade: 'PUBLICA', status: 'ATIVA' },
          select: {
            id: true,
            hash_ancorado: true,
            tx_id: true,
            block_number: true,
            emitida_em: true,
            dados_credencial: true,
            participation: {
              select: {
                opportunity: {
                  select: {
                    titulo: true,
                    tipo: true,
                    ods: true,
                    data_inicio: true,
                    data_fim: true,
                    institution: { select: { nome: true, categoria: true } },
                    municipio: { select: { nome: true, uf: true } },
                  },
                },
              },
            },
          },
          orderBy: { emitida_em: 'desc' },
        },
      },
    })

    if (!young) {
      return reply.status(404).send({ error: 'Carteira não encontrada.' })
    }

    // Formata a linha do tempo da carteira cívica (RF19)
    const linha_do_tempo = young.credentials.map((c) => ({
      id: c.id,
      atividade: c.participation.opportunity.titulo,
      tipo: c.participation.opportunity.tipo,
      ods: c.participation.opportunity.ods,
      instituicao: c.participation.opportunity.institution.nome,
      municipio: c.participation.opportunity.municipio,
      periodo: {
        inicio: c.participation.opportunity.data_inicio,
        fim: c.participation.opportunity.data_fim,
      },
      emitida_em: c.emitida_em,
      verificacao: {
        hash: c.hash_ancorado,
        tx_id: c.tx_id,
        ledger: c.block_number,
      },
    }))

    return reply.send({
      apelido: young.apelido,
      municipio: young.municipio,
      interesses: young.interesses,
      total_credenciais_publicas: linha_do_tempo.length,
      linha_do_tempo,
    })
  })

  /**
   * GET /wallet/me
   * Carteira privada do jovem autenticado. Exibe todas as credenciais (públicas e privadas). RF19
   */
  app.get(
    '/me',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { sub: youngId, role } = request.user as { sub: string; role: string }

      if (role !== 'young') {
        return reply.status(403).send({ error: 'Acesso negado.' })
      }

      const credentials = await prisma.credential.findMany({
        where: { young_id: youngId },
        select: {
          id: true,
          hash_ancorado: true,
          tx_id: true,
          block_number: true,
          visibilidade: true,
          status: true,
          emitida_em: true,
          revogada_em: true,
          motivo_revogacao: true,
          participation: {
            select: {
              opportunity: {
                select: {
                  titulo: true,
                  tipo: true,
                  ods: true,
                  data_inicio: true,
                  data_fim: true,
                  institution: { select: { nome: true } },
                  municipio: { select: { nome: true, uf: true } },
                },
              },
            },
          },
        },
        orderBy: { emitida_em: 'desc' },
      })

      return reply.send({ total: credentials.length, credenciais: credentials })
    },
  )
}
