import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomBytes } from 'crypto'
import { prisma } from '../../lib/prisma.js'

function generateCheckinCode(): string {
  // 6 chars alfanumérico sem ambíguos (0/O, 1/I/l)
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  return Array.from(randomBytes(6))
    .map((b) => chars[b % chars.length])
    .join('')
}

const confirmSchema = z.object({
  observacao: z.string().max(500).optional(),
})

export async function participationRoutes(app: FastifyInstance) {
  /**
   * POST /opportunities/:id/interest
   * Jovem manifesta interesse em uma oportunidade. RF09
   */
  app.post(
    '/:id/interest',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { sub: youngId, role } = request.user as { sub: string; role: string }

      if (role !== 'young') {
        return reply.status(403).send({ error: 'Apenas jovens podem manifestar interesse.' })
      }

      const { id: opportunityId } = request.params as { id: string }

      const opportunity = await prisma.opportunity.findUnique({
        where: { id: opportunityId },
      })

      if (!opportunity || opportunity.status !== 'PUBLICADA') {
        return reply.status(404).send({ error: 'Oportunidade não encontrada.' })
      }

      // Verifica se já existe participação
      const existing = await prisma.participation.findUnique({
        where: {
          young_id_opportunity_id: { young_id: youngId, opportunity_id: opportunityId },
        },
      })

      if (existing) {
        return reply.status(409).send({ error: 'Você já manifestou interesse nesta oportunidade.' })
      }

      let codigo_checkin: string
      let tentativas = 0
      // Garante unicidade do código de check-in
      do {
        codigo_checkin = generateCheckinCode()
        tentativas++
        const existe = await prisma.participation.findUnique({ where: { codigo_checkin } })
        if (!existe) break
      } while (tentativas < 10)

      const participation = await prisma.participation.create({
        data: {
          young_id: youngId,
          opportunity_id: opportunityId,
          codigo_checkin,
          status: 'INTERESSE_REGISTRADO',
        },
        select: {
          id: true,
          status: true,
          codigo_checkin: true,
          data_interesse: true,
          opportunity: {
            select: {
              titulo: true,
              data_inicio: true,
              data_fim: true,
              ponto_contato: true,
            },
          },
        },
      })

      return reply.status(201).send(participation)
    },
  )

  /**
   * GET /institution/opportunities/:id/interests
   * Instituição vê apenas e-mail e faixa etária dos interessados na própria oportunidade. RF10
   */
  app.get(
    '/institution/opportunities/:id/interests',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { sub: userId, role } = request.user as { sub: string; role: string }

      if (role !== 'institution_user') {
        return reply.status(403).send({ error: 'Acesso negado.' })
      }

      const { id: opportunityId } = request.params as { id: string }

      // Verifica que a oportunidade pertence à instituição do usuário
      const institutionUser = await prisma.institutionUser.findUnique({ where: { id: userId } })
      if (!institutionUser) {
        return reply.status(404).send({ error: 'Usuário não encontrado.' })
      }

      const opportunity = await prisma.opportunity.findFirst({
        where: { id: opportunityId, institution_id: institutionUser.institution_id },
      })

      if (!opportunity) {
        return reply.status(404).send({ error: 'Oportunidade não encontrada ou não pertence à sua instituição.' })
      }

      const participations = await prisma.participation.findMany({
        where: { opportunity_id: opportunityId },
        select: {
          id: true,
          status: true,
          data_interesse: true,
          codigo_checkin: true,
          // RF10: apenas dados mínimos do jovem — email e faixa etária, nunca perfil completo
          young: {
            select: {
              email: true,
              ano_nascimento: true,
            },
          },
        },
        orderBy: { data_interesse: 'asc' },
      })

      // Converte ano_nascimento para faixa etária antes de enviar
      const result = participations.map((p) => ({
        id: p.id,
        status: p.status,
        data_interesse: p.data_interesse,
        codigo_checkin: p.codigo_checkin,
        jovem: {
          email: p.young.email,
          faixa_etaria: calcularFaixaEtaria(p.young.ano_nascimento),
        },
      }))

      return reply.send({ data: result, total: result.length })
    },
  )

  /**
   * POST /participations/:id/confirm
   * Confirma presença ou conclusão. Apenas institution_user autorizado. RF12 + RF13
   */
  app.post(
    '/:id/confirm',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { sub: userId, role } = request.user as { sub: string; role: string }

      if (role !== 'institution_user') {
        return reply.status(403).send({ error: 'Apenas usuários institucionais podem confirmar participações.' })
      }

      const { id: participationId } = request.params as { id: string }

      const body = confirmSchema.safeParse(request.body)
      if (!body.success) {
        return reply.status(400).send({ error: body.error.flatten() })
      }

      const participation = await prisma.participation.findUnique({
        where: { id: participationId },
        include: {
          opportunity: true,
        },
      })

      if (!participation) {
        return reply.status(404).send({ error: 'Participação não encontrada.' })
      }

      // Verifica que a oportunidade pertence à instituição do usuário logado
      const institutionUser = await prisma.institutionUser.findUnique({ where: { id: userId } })
      if (
        !institutionUser ||
        institutionUser.institution_id !== participation.opportunity.institution_id
      ) {
        return reply.status(403).send({ error: 'Você não tem permissão para confirmar esta participação.' })
      }

      // RF13: atividade pontual só pode ser confirmada após data_fim
      if (participation.opportunity.frequencia === 'PONTUAL') {
        const dataFim = participation.opportunity.data_fim
        if (dataFim && new Date() < dataFim) {
          return reply.status(400).send({
            error: `Atividade pontual só pode ser confirmada após o término (${dataFim.toISOString()}).`,
          })
        }
      }

      if (participation.status !== 'INTERESSE_REGISTRADO') {
        return reply.status(400).send({
          error: `Esta participação já está com status "${participation.status}".`,
        })
      }

      const updated = await prisma.participation.update({
        where: { id: participationId },
        data: {
          status: 'CONFIRMADA_PELA_INSTITUICAO',
          data_confirmacao: new Date(),
          confirmado_por_id: userId,
        },
      })

      return reply.send({
        id: updated.id,
        status: updated.status,
        data_confirmacao: updated.data_confirmacao,
        mensagem: 'Participação confirmada. A credencial pode ser emitida agora.',
      })
    },
  )
}

function calcularFaixaEtaria(ano_nascimento: number): string {
  const idade = new Date().getFullYear() - ano_nascimento
  if (idade <= 14) return '12-14'
  if (idade <= 17) return '15-17'
  return '18+'
}
