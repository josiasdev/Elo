import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma.js'

export async function analyticsRoutes(app: FastifyInstance) {
  /**
   * GET /analytics/territories
   * Indicadores agregados por território. RF08 / Seção 11.
   * Nenhum resultado permite navegar até um jovem individual.
   */
  app.get('/territories', async (request, reply) => {
    const query = z
      .object({
        uf: z.string().length(2).optional(),
        municipio_id: z.string().length(7).optional(),
      })
      .safeParse(request.query)

    if (!query.success) {
      return reply.status(400).send({ error: query.error.flatten() })
    }

    const { uf, municipio_id } = query.data

    // Oportunidades publicadas por município
    const oportunidadesPorMunicipio = await prisma.opportunity.groupBy({
      by: ['municipio_id'],
      where: {
        status: 'PUBLICADA',
        ...(municipio_id && { municipio_id }),
        ...(uf && { municipio: { uf } }),
      },
      _count: { id: true },
    })

    // Funil: interesse → confirmação → credencial por município
    const participacoesPorStatus = await prisma.participation.groupBy({
      by: ['status'],
      _count: { id: true },
    })

    // Municípios com pelo menos uma oportunidade publicada
    const municipiosComOferta = new Set(oportunidadesPorMunicipio.map((o) => o.municipio_id))

    // Municípios sem oferta (apenas dos que estão na base)
    const todosMunicipios = await prisma.municipality.findMany({
      where: {
        ...(uf && { uf }),
        ...(municipio_id && { id: municipio_id }),
      },
      select: { id: true, nome: true, uf: true },
    })

    const municipiosSemOferta = todosMunicipios.filter((m) => !municipiosComOferta.has(m.id))

    // Cobertura de ODS por oportunidades publicadas
    const odsRaw = await prisma.opportunity.findMany({
      where: { status: 'PUBLICADA' },
      select: { ods: true },
    })
    const odsCobertos = new Set(odsRaw.flatMap((o) => o.ods))

    const funil = {
      interesse_registrado: 0,
      confirmada: 0,
      certificado_emitido: 0,
    }
    for (const p of participacoesPorStatus) {
      if (p.status === 'INTERESSE_REGISTRADO') funil.interesse_registrado = p._count.id
      if (p.status === 'CONFIRMADA_PELA_INSTITUICAO') funil.confirmada = p._count.id
      if (p.status === 'CERTIFICADO_EMITIDO') funil.certificado_emitido = p._count.id
    }

    return reply.send({
      atualizado_em: new Date().toISOString(),
      oportunidades_por_municipio: oportunidadesPorMunicipio.map((o) => ({
        municipio_id: o.municipio_id,
        total: o._count.id,
      })),
      municipios_sem_oferta: municipiosSemOferta,
      funil_de_participacao: funil,
      ods_cobertos: Array.from(odsCobertos).sort((a, b) => a - b),
      ods_ausentes: Array.from({ length: 17 }, (_, i) => i + 1).filter(
        (n) => !odsCobertos.has(n),
      ),
    })
  })
}
