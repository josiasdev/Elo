import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma.js'

const createReportSchema = z.object({
  alvo_tipo: z.enum(['Institution', 'Opportunity']),
  alvo_id: z.string().uuid(),
  descricao: z.string().min(20).max(2000),
  gravidade: z.enum(['BAIXA', 'MEDIA', 'ALTA', 'CRITICA']),
})

export async function reportRoutes(app: FastifyInstance) {
  /**
   * POST /reports
   * Jovem registra uma denúncia sobre instituição ou oportunidade. RF24
   */
  app.post(
    '/',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { sub: youngId, role } = request.user as { sub: string; role: string }

      if (role !== 'young') {
        return reply.status(403).send({ error: 'Apenas jovens podem registrar denúncias.' })
      }

      const body = createReportSchema.safeParse(request.body)
      if (!body.success) {
        return reply.status(400).send({ error: body.error.flatten() })
      }

      const { alvo_tipo, alvo_id, descricao, gravidade } = body.data

      // Verifica se o alvo existe
      if (alvo_tipo === 'Institution') {
        const inst = await prisma.institution.findUnique({ where: { id: alvo_id } })
        if (!inst) return reply.status(404).send({ error: 'Instituição não encontrada.' })
      } else {
        const opp = await prisma.opportunity.findUnique({ where: { id: alvo_id } })
        if (!opp) return reply.status(404).send({ error: 'Oportunidade não encontrada.' })
      }

      const report = await prisma.report.create({
        data: { young_id: youngId, alvo_tipo, alvo_id, descricao, gravidade },
        select: { id: true, alvo_tipo: true, gravidade: true, status: true, criada_em: true },
      })

      // RF25: denúncias CRITICA ou ALTA disparam suspensão preventiva automática
      if (gravidade === 'CRITICA' || gravidade === 'ALTA') {
        if (alvo_tipo === 'Institution') {
          await prisma.institution.update({
            where: { id: alvo_id },
            data: { status_verificacao: 'SUSPENSA' },
          })
        } else {
          await prisma.opportunity.update({
            where: { id: alvo_id },
            data: { status: 'EM_ANALISE' },
          })
        }
      }

      return reply.status(201).send({
        ...report,
        mensagem:
          gravidade === 'CRITICA'
            ? 'Denúncia registrada. A instituição/oportunidade foi suspensa preventivamente para apuração.'
            : 'Denúncia registrada com sucesso.',
      })
    },
  )
}
