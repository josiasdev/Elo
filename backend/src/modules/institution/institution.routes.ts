import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import path from 'path'
import { createWriteStream, mkdirSync } from 'fs'
import { pipeline } from 'stream/promises'
import { randomUUID } from 'crypto'
import { prisma } from '../../lib/prisma.js'
import { config } from '../../config.js'

const createInstitutionSchema = z.object({
  nome: z.string().min(3).max(200),
  cnpj: z
    .string()
    .regex(/^\d{14}$/, 'CNPJ deve ter 14 dígitos sem formatação')
    .optional(),
  categoria: z.enum([
    'ONG',
    'COLETIVO_INFORMAL',
    'ESCOLA',
    'PODER_PUBLICO',
    'INICIATIVA_EMPRESARIAL',
  ]),
  descricao: z.string().min(20).max(2000),
  ods: z.array(z.number().int().min(1).max(17)).min(1),
  responsavel_nome: z.string().min(3).max(200),
  responsavel_email: z.string().email(),
  responsavel_cargo: z.string().optional(),
  municipios_atuacao: z.array(z.string().length(7)).min(1),
})

export async function institutionRoutes(app: FastifyInstance) {
  /**
   * POST /institutions
   * Cadastro de instituição. RF03
   */
  app.post('/', async (request, reply) => {
    const body = createInstitutionSchema.safeParse(request.body)
    if (!body.success) {
      return reply.status(400).send({ error: body.error.flatten() })
    }

    const {
      nome,
      cnpj,
      categoria,
      descricao,
      ods,
      responsavel_nome,
      responsavel_email,
      responsavel_cargo,
      municipios_atuacao,
    } = body.data

    // Verifica CNPJ duplicado
    if (cnpj) {
      const existing = await prisma.institution.findUnique({ where: { cnpj } })
      if (existing) {
        return reply.status(409).send({ error: 'CNPJ já cadastrado.' })
      }
    }

    // Verifica se todos os municípios existem
    const municipios = await prisma.municipality.findMany({
      where: { id: { in: municipios_atuacao } },
    })
    if (municipios.length !== municipios_atuacao.length) {
      return reply.status(400).send({ error: 'Um ou mais códigos IBGE não foram encontrados.' })
    }

    const institution = await prisma.institution.create({
      data: {
        nome,
        cnpj,
        categoria,
        descricao,
        ods,
        responsavel_nome,
        responsavel_email,
        responsavel_cargo,
        status_verificacao: 'PENDENTE',
        regions: {
          create: municipios_atuacao.map((municipio_id) => ({ municipio_id })),
        },
      },
      include: {
        regions: { include: { municipio: { select: { nome: true, uf: true } } } },
      },
    })

    return reply.status(201).send(institution)
  })

  /**
   * POST /institutions/:id/documents
   * Upload de documento comprobatório. RF03 — armazenamento local MVP.
   */
  app.post(
    '/:id/documents',
    async (request, reply) => {
      const { id } = request.params as { id: string }

      const institution = await prisma.institution.findUnique({ where: { id } })
      if (!institution) {
        return reply.status(404).send({ error: 'Instituição não encontrada.' })
      }

      const data = await request.file()
      if (!data) {
        return reply.status(400).send({ error: 'Nenhum arquivo enviado.' })
      }

      const allowedMimeTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/webp',
      ]
      if (!allowedMimeTypes.includes(data.mimetype)) {
        return reply
          .status(400)
          .send({ error: 'Tipo de arquivo não permitido. Use PDF, JPEG, PNG ou WebP.' })
      }

      // Garante que o diretório de uploads existe
      const uploadDir = path.resolve(config.UPLOADS_DIR, 'institutions', id)
      mkdirSync(uploadDir, { recursive: true })

      const ext = path.extname(data.filename) || '.bin'
      const storedFilename = `${randomUUID()}${ext}`
      const storedPath = path.join(uploadDir, storedFilename)

      await pipeline(data.file, createWriteStream(storedPath))

      const doc = await prisma.institutionDocument.create({
        data: {
          institution_id: id,
          filename: data.filename,
          stored_path: storedPath,
          mime_type: data.mimetype,
        },
      })

      return reply.status(201).send({
        id: doc.id,
        filename: doc.filename,
        uploaded_em: doc.uploaded_em,
      })
    },
  )

  /**
   * GET /institutions/:id
   * Retorna dados públicos de uma instituição (para visualização no mapa/perfil).
   */
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string }

    const institution = await prisma.institution.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        categoria: true,
        descricao: true,
        ods: true,
        status_verificacao: true,
        regions: {
          include: { municipio: { select: { id: true, nome: true, uf: true } } },
        },
      },
    })

    if (!institution) {
      return reply.status(404).send({ error: 'Instituição não encontrada.' })
    }

    return reply.send(institution)
  })
}
