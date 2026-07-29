import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma.js'

const createYoungSchema = z.object({
  email: z.string().email('E-mail inválido'),
  ano_nascimento: z
    .number()
    .int()
    .min(new Date().getFullYear() - 18, 'Máximo 18 anos')
    .max(new Date().getFullYear() - 12, 'Mínimo 12 anos'),
  municipio_id: z.string().length(7, 'Código IBGE deve ter 7 dígitos'),
  apelido: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_-]+$/, 'Apelido deve conter apenas letras minúsculas, números, _ ou -')
    .optional(),
  interesses: z.array(z.string()).default([]),
  consentimento_versao: z.string().default('1.0'),
})

const updateYoungSchema = z.object({
  apelido: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_-]+$/)
    .optional(),
  interesses: z.array(z.string()).optional(),
  opt_in_comunicacao: z.record(z.boolean()).optional(),
})

export async function youngRoutes(app: FastifyInstance) {
  /**
   * POST /young
   * Cadastro mínimo do jovem com consentimento. RF01
   */
  app.post('/', async (request, reply) => {
    const body = createYoungSchema.safeParse(request.body)
    if (!body.success) {
      return reply.status(400).send({ error: body.error.flatten() })
    }

    const { email, ano_nascimento, municipio_id, apelido, interesses, consentimento_versao } =
      body.data

    // Verifica se município existe
    const municipio = await prisma.municipality.findUnique({ where: { id: municipio_id } })
    if (!municipio) {
      return reply.status(400).send({ error: 'Município não encontrado.' })
    }

    // Verifica duplicidade de e-mail
    const existing = await prisma.young.findUnique({ where: { email } })
    if (existing) {
      return reply.status(409).send({ error: 'E-mail já cadastrado.' })
    }

    // Verifica disponibilidade do apelido
    if (apelido) {
      const apelidoTaken = await prisma.young.findUnique({ where: { apelido } })
      if (apelidoTaken) {
        return reply.status(409).send({ error: 'Este apelido já está em uso.' })
      }
    }

    const young = await prisma.young.create({
      data: {
        email,
        ano_nascimento,
        municipio_id,
        apelido,
        interesses,
        consentimento_em: new Date(),
        consentimento_versao,
        status: 'ATIVO',
      },
      select: {
        id: true,
        email: true,
        ano_nascimento: true,
        municipio_id: true,
        apelido: true,
        interesses: true,
        status: true,
        criado_em: true,
      },
    })

    return reply.status(201).send(young)
  })

  /**
   * GET /young/me
   * Retorna o perfil do jovem autenticado. RF — Seção 14.
   */
  app.get(
    '/me',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { sub: youngId, role } = request.user as { sub: string; role: string }

      if (role !== 'young') {
        return reply.status(403).send({ error: 'Acesso negado.' })
      }

      const young = await prisma.young.findUnique({
        where: { id: youngId },
        select: {
          id: true,
          email: true,
          ano_nascimento: true,
          municipio_id: true,
          municipio: { select: { nome: true, uf: true } },
          apelido: true,
          interesses: true,
          opt_in_comunicacao: true,
          status: true,
          consentimento_em: true,
          criado_em: true,
        },
      })

      if (!young) {
        return reply.status(404).send({ error: 'Jovem não encontrado.' })
      }

      return reply.send(young)
    },
  )

  /**
   * PATCH /young/me
   * Atualiza preferências do jovem (apelido, interesses, opt-in). Seção 14.
   */
  app.patch(
    '/me',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { sub: youngId, role } = request.user as { sub: string; role: string }

      if (role !== 'young') {
        return reply.status(403).send({ error: 'Acesso negado.' })
      }

      const body = updateYoungSchema.safeParse(request.body)
      if (!body.success) {
        return reply.status(400).send({ error: body.error.flatten() })
      }

      const { apelido, interesses, opt_in_comunicacao } = body.data

      if (apelido) {
        const taken = await prisma.young.findFirst({
          where: { apelido, NOT: { id: youngId } },
        })
        if (taken) {
          return reply.status(409).send({ error: 'Este apelido já está em uso.' })
        }
      }

      const updated = await prisma.young.update({
        where: { id: youngId },
        data: {
          ...(apelido !== undefined && { apelido }),
          ...(interesses !== undefined && { interesses }),
          ...(opt_in_comunicacao !== undefined && { opt_in_comunicacao }),
        },
        select: {
          id: true,
          apelido: true,
          interesses: true,
          opt_in_comunicacao: true,
        },
      })

      return reply.send(updated)
    },
  )
}
