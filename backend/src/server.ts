import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'
import staticFiles from '@fastify/static'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from './config.js'
import { logger } from './lib/logger.js'
import { prisma } from './lib/prisma.js'

// Rotas
import { authRoutes } from './modules/auth/auth.routes.js'
import { youngRoutes } from './modules/young/young.routes.js'
import { institutionRoutes } from './modules/institution/institution.routes.js'
import { adminRoutes } from './modules/admin/admin.routes.js'
import { opportunityRoutes } from './modules/opportunity/opportunity.routes.js'
import { participationRoutes } from './modules/participation/participation.routes.js'
import { credentialRoutes } from './modules/credential/credential.routes.js'
import { walletRoutes } from './modules/wallet/wallet.routes.js'
import { analyticsRoutes } from './modules/analytics/analytics.routes.js'
import { reportRoutes } from './modules/report/report.routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function buildServer() {
  const app = Fastify({
    logger: {
      level: config.LOG_LEVEL,
    },
  })

  // Plugins globais
  await app.register(cors, {
    origin: true,
    credentials: true,
  })

  await app.register(jwt, {
    secret: config.JWT_SECRET,
  })

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  })

  await app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB por arquivo
    },
  })

  await app.register(staticFiles, {
    root: path.resolve(config.UPLOADS_DIR),
    prefix: '/uploads/',
    // Uploads são privados: não servir diretamente em produção
    serve: config.NODE_ENV === 'development',
  })

  // Decorator de autenticação
  app.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.status(401).send({ error: 'Não autenticado' })
    }
  })

  // Rotas da API
  await app.register(authRoutes, { prefix: '/auth' })
  await app.register(youngRoutes, { prefix: '/young' })
  await app.register(institutionRoutes, { prefix: '/institutions' })
  await app.register(adminRoutes, { prefix: '/admin' })
  await app.register(opportunityRoutes, { prefix: '/opportunities' })
  await app.register(participationRoutes, { prefix: '/participations' })
  await app.register(credentialRoutes, { prefix: '/credentials' })
  await app.register(walletRoutes, { prefix: '/wallet' })
  await app.register(analyticsRoutes, { prefix: '/analytics' })
  await app.register(reportRoutes, { prefix: '/reports' })

  // Health check
  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: config.NODE_ENV,
  }))

  return app
}

async function main() {
  const app = await buildServer()

  try {
    await app.listen({ port: config.PORT, host: config.HOST })
    logger.info(`EloCiv backend rodando em http://${config.HOST}:${config.PORT}`)
  } catch (err) {
    logger.error(err)
    await prisma.$disconnect()
    process.exit(1)
  }

  const gracefulShutdown = async (signal: string) => {
    logger.info(`Sinal ${signal} recebido. Encerrando...`)
    await app.close()
    await prisma.$disconnect()
    process.exit(0)
  }

  process.on('SIGINT', () => gracefulShutdown('SIGINT'))
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
}

main()
