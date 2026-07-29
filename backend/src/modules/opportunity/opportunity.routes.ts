import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma.js'

const createOpportunitySchema = z.object({
  titulo: z.string().min(5).max(200),
  descricao: z.string().min(20).max(3000),
  tipo: z.enum([
    'VOLUNTARIADO',
    'ACAO_PONTUAL',
    'GRUPO_DE_JOVENS',
    'CURSO_PROFISSIONALIZANTE',
    'CURSO_EDUCACIONAL',
    'PALESTRA',
    'OFICINA_TECNICA',
    'FORMACAO_COMPLEMENTAR',
    'OUTROS',
  ]),
  ods: z.array(z.number().int().min(1).max(17)).min(1),
  faixa_etaria_alvo: z.enum(['DE_12_A_14', 'DE_15_A_17', 'DE_18', 'TODAS']),
  frequencia: z.enum(['PONTUAL', 'CONTINUA']),
  data_inicio: z.string().datetime().optional(),
  data_fim: z.string().datetime().optional(),
  hora_inicio: z.string().optional(),
  modalidade: z.enum(['PRESENCIAL', 'ONLINE']),
  endereco: z.string().optional(),
  link_online: z.string().url().optional(),
  vagas: z.number().int().positive().optional(),
  ponto_contato: z.string().min(5).max(200),
  municipio_id: z.string().length(7),
  criterio_conclusao: z.string().optional(),
})

const listOpportunitiesSchema = z.object({
  municipio_id: z.string().length(7).optional(),
  tipo: z.string().optional(),
  ods: z.string().optional(), // CSV: "3,4,5"
  faixa_etaria: z.enum(['DE_12_A_14', 'DE_15_A_17', 'DE_18', 'TODAS']).optional(),
  modalidade: z.enum(['PRESENCIAL', 'ONLINE']).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
})

export async function opportunityRoutes(app: FastifyInstance) {
  /**
   * POST /opportunities
   * Criar oportunidade. Exige institution_user autenticado e instituição aprovada. RF06
   */
  app.post(
    '/',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { sub: userId, role } = request.user as { sub: string; role: string }

      if (role !== 'institution_user') {
        return reply.status(403).send({ error: 'Apenas usuários institucionais podem criar oportunidades.' })
      }

      const institutionUser = await prisma.institutionUser.findUnique({
        where: { id: userId },
        include: { institution: true },
      })

      if (!institutionUser) {
        return reply.status(404).send({ error: 'Usuário institucional não encontrado.' })
      }

      // RF05 — instituição não aprovada não pode publicar
      if (institutionUser.institution.status_verificacao !== 'APROVADA') {
        return reply.status(403).send({
          error: 'A instituição ainda não foi aprovada e não pode publicar oportunidades.',
        })
      }

      const body = createOpportunitySchema.safeParse(request.body)
      if (!body.success) {
        return reply.status(400).send({ error: body.error.flatten() })
      }

      const data = body.data

      // Validações condicionais
      if (data.modalidade === 'PRESENCIAL' && !data.endereco) {
        return reply.status(400).send({ error: 'Endereço é obrigatório para atividades presenciais.' })
      }

      if (data.modalidade === 'ONLINE' && !data.link_online) {
        return reply.status(400).send({ error: 'Link é obrigatório para atividades online.' })
      }

      if (data.frequencia === 'CONTINUA' && !data.criterio_conclusao) {
        return reply.status(400).send({
          error: 'Critério de conclusão é obrigatório para atividades contínuas. Ex: "Mínimo 75% de presença"',
        })
      }

      const municipio = await prisma.municipality.findUnique({ where: { id: data.municipio_id } })
      if (!municipio) {
        return reply.status(400).send({ error: 'Município não encontrado.' })
      }

      const opportunity = await prisma.opportunity.create({
        data: {
          institution_id: institutionUser.institution_id,
          titulo: data.titulo,
          descricao: data.descricao,
          tipo: data.tipo,
          ods: data.ods,
          faixa_etaria_alvo: data.faixa_etaria_alvo,
          frequencia: data.frequencia,
          data_inicio: data.data_inicio ? new Date(data.data_inicio) : undefined,
          data_fim: data.data_fim ? new Date(data.data_fim) : undefined,
          hora_inicio: data.hora_inicio,
          modalidade: data.modalidade,
          endereco: data.endereco,
          link_online: data.link_online,
          vagas: data.vagas,
          ponto_contato: data.ponto_contato,
          municipio_id: data.municipio_id,
          criterio_conclusao: data.criterio_conclusao,
          status: 'PUBLICADA',
        },
      })

      return reply.status(201).send(opportunity)
    },
  )

  /**
   * GET /opportunities
   * Busca paginada com filtros por território, tipo, ODS, faixa etária e modalidade. RF07
   */
  app.get('/', async (request, reply) => {
    const query = listOpportunitiesSchema.safeParse(request.query)
    if (!query.success) {
      return reply.status(400).send({ error: query.error.flatten() })
    }

    const { municipio_id, tipo, ods, faixa_etaria, modalidade, page, limit } = query.data

    const odsFilter = ods
      ? ods.split(',').map(Number).filter((n) => n >= 1 && n <= 17)
      : undefined

    const where: any = {
      status: 'PUBLICADA',
      ...(municipio_id && { municipio_id }),
      ...(tipo && { tipo }),
      ...(faixa_etaria && { faixa_etaria_alvo: faixa_etaria }),
      ...(modalidade && { modalidade }),
      ...(odsFilter?.length && { ods: { hasSome: odsFilter } }),
    }

    const [opportunities, total] = await Promise.all([
      prisma.opportunity.findMany({
        where,
        include: {
          institution: { select: { id: true, nome: true, categoria: true } },
          municipio: { select: { nome: true, uf: true } },
        },
        orderBy: { criado_em: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.opportunity.count({ where }),
    ])

    return reply.send({ data: opportunities, total, page, limit })
  })

  /**
   * GET /opportunities/:id
   * Detalhe de uma oportunidade pública.
   */
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }

    const opportunity = await prisma.opportunity.findUnique({
      where: { id },
      include: {
        institution: {
          select: { id: true, nome: true, categoria: true, descricao: true, ods: true },
        },
        municipio: { select: { nome: true, uf: true } },
      },
    })

    if (!opportunity || opportunity.status !== 'PUBLICADA') {
      return reply.status(404).send({ error: 'Oportunidade não encontrada.' })
    }

    return reply.send(opportunity)
  })
}
