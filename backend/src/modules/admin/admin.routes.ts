import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma.js'

const decisionSchema = z.object({
  decisao: z.enum(['APROVADA', 'REJEITADA', 'SOLICITAR_COMPLEMENTO']),
  motivo: z.string().min(10).max(1000).optional(),
})

export async function adminRoutes(app: FastifyInstance) {
  // Todas as rotas exigem autenticação de admin
  app.addHook('preHandler', async (request, reply) => {
    try {
      await request.jwtVerify()
      const user = request.user as { role: string }
      if (user.role !== 'admin') {
        return reply.status(403).send({ error: 'Acesso restrito a administradores.' })
      }
    } catch {
      return reply.status(401).send({ error: 'Não autenticado.' })
    }
  })

  /**
   * GET /admin/institutions?status=pending
   * Fila de análise de instituições. RF04
   */
  app.get('/institutions', async (request, reply) => {
    const query = request.query as { status?: string; page?: string; limit?: string }

    const statusMap: Record<string, string> = {
      pending: 'PENDENTE',
      em_analise: 'EM_ANALISE',
      aprovada: 'APROVADA',
      rejeitada: 'REJEITADA',
      suspensa: 'SUSPENSA',
    }

    const status = query.status ? statusMap[query.status] : undefined
    const page = Math.max(1, parseInt(query.page ?? '1', 10))
    const limit = Math.min(50, parseInt(query.limit ?? '20', 10))

    const [institutions, total] = await Promise.all([
      prisma.institution.findMany({
        where: status ? { status_verificacao: status as any } : undefined,
        include: {
          documents: { select: { id: true, filename: true, uploaded_em: true } },
          regions: { include: { municipio: { select: { nome: true, uf: true } } } },
        },
        orderBy: { criado_em: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.institution.count({
        where: status ? { status_verificacao: status as any } : undefined,
      }),
    ])

    return reply.send({ data: institutions, total, page, limit })
  })

  /**
   * POST /admin/institutions/:id/decision
   * Aprovar, rejeitar ou solicitar complemento. RF04 + RF05 (grava log). RF23
   */
  app.post('/institutions/:id/decision', async (request, reply) => {
    const { id } = request.params as { id: string }
    const { sub: adminId } = request.user as { sub: string }

    const body = decisionSchema.safeParse(request.body)
    if (!body.success) {
      return reply.status(400).send({ error: body.error.flatten() })
    }

    const { decisao, motivo } = body.data

    if (decisao !== 'APROVADA' && !motivo) {
      return reply.status(400).send({
        error: 'Motivo é obrigatório para rejeição ou solicitação de complemento.',
      })
    }

    const institution = await prisma.institution.findUnique({ where: { id } })
    if (!institution) {
      return reply.status(404).send({ error: 'Instituição não encontrada.' })
    }

    const novoStatus =
      decisao === 'APROVADA'
        ? 'APROVADA'
        : decisao === 'REJEITADA'
          ? 'REJEITADA'
          : 'EM_ANALISE' // SOLICITAR_COMPLEMENTO volta para análise

    const [updated] = await prisma.$transaction([
      prisma.institution.update({
        where: { id },
        data: {
          status_verificacao: novoStatus as any,
          aprovada_por: decisao === 'APROVADA' ? adminId : undefined,
          aprovada_em: decisao === 'APROVADA' ? new Date() : undefined,
          motivo_decisao: motivo,
        },
      }),
      prisma.auditLog.create({
        data: {
          ator_id: adminId,
          ator_tipo: 'Admin',
          acao: `INSTITUTION_DECISION_${decisao}`,
          entidade_tipo: 'Institution',
          entidade_id: id,
          institution_id: id,
          contexto: { decisao, motivo: motivo ?? null },
        },
      }),
    ])

    return reply.send({
      id: updated.id,
      status_verificacao: updated.status_verificacao,
      mensagem: `Decisão registrada: ${decisao}`,
    })
  })

  /**
   * POST /admin/institutions/:id/suspend
   * Suspende uma instituição imediatamente. RF25
   */
  app.post('/institutions/:id/suspend', async (request, reply) => {
    const { id } = request.params as { id: string }
    const { sub: adminId } = request.user as { sub: string }
    const body = z.object({ motivo: z.string().min(10) }).safeParse(request.body)
    if (!body.success) {
      return reply.status(400).send({ error: body.error.flatten() })
    }

    await prisma.$transaction([
      prisma.institution.update({
        where: { id },
        data: { status_verificacao: 'SUSPENSA' },
      }),
      prisma.auditLog.create({
        data: {
          ator_id: adminId,
          ator_tipo: 'Admin',
          acao: 'INSTITUTION_SUSPENDED',
          entidade_tipo: 'Institution',
          entidade_id: id,
          institution_id: id,
          contexto: { motivo: body.data.motivo },
        },
      }),
    ])

    return reply.send({ mensagem: 'Instituição suspensa com sucesso.' })
  })
}
