import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma.js'
import { generateOtp, validateOtp } from '../../services/otp.js'

const requestCodeSchema = z.object({
  email: z.string().email('E-mail inválido'),
  role: z.enum(['young', 'institution_user', 'admin']),
})

const verifyCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, 'O código deve ter 6 dígitos'),
  role: z.enum(['young', 'institution_user', 'admin']),
})

export async function authRoutes(app: FastifyInstance) {
  /**
   * POST /auth/request-code
   * Solicita um OTP. No MVP, o código aparece no log do servidor.
   */
  app.post('/request-code', async (request, reply) => {
    const body = requestCodeSchema.safeParse(request.body)
    if (!body.success) {
      return reply.status(400).send({ error: body.error.flatten() })
    }

    await generateOtp(body.data.email)

    // Nunca confirmar se o e-mail existe ou não — evita enumeração
    return reply.status(200).send({
      message: 'Se este e-mail estiver cadastrado, um código foi enviado.',
    })
  })

  /**
   * POST /auth/verify-code
   * Valida o OTP e retorna um JWT com o papel (role) do usuário.
   */
  app.post('/verify-code', async (request, reply) => {
    const body = verifyCodeSchema.safeParse(request.body)
    if (!body.success) {
      return reply.status(400).send({ error: body.error.flatten() })
    }

    const { email, code, role } = body.data

    const result = await validateOtp(email, code)
    if (!result.valid) {
      return reply.status(401).send({ error: result.reason })
    }

    // Busca o ID do usuário conforme o papel
    let userId: string | null = null

    if (role === 'young') {
      const young = await prisma.young.findUnique({ where: { email } })
      userId = young?.id ?? null
    } else if (role === 'institution_user') {
      const user = await prisma.institutionUser.findUnique({ where: { email } })
      userId = user?.id ?? null
    } else if (role === 'admin') {
      const admin = await prisma.admin.findUnique({ where: { email } })
      userId = admin?.id ?? null
    }

    if (!userId) {
      return reply.status(404).send({ error: 'Usuário não encontrado para este e-mail.' })
    }

    const token = app.jwt.sign(
      { sub: userId, role },
      { expiresIn: '7d' },
    )

    return reply.status(200).send({ token })
  })
}
