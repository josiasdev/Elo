import { PrismaClient } from '@prisma/client'
import { logger } from '../src/lib/logger.js'

const prisma = new PrismaClient()

/**
 * Seed de municípios brasileiros via API do IBGE.
 * Importa a tabela completa (5.570 municípios) na primeira execução.
 */
async function seedMunicipalities() {
  const count = await prisma.municipality.count()
  if (count > 0) {
    logger.info(`Municípios já carregados (${count} registros). Pulando seed IBGE.`)
    return
  }

  logger.info('Importando tabela completa de municípios do IBGE...')

  const response = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome',
  )

  if (!response.ok) {
    throw new Error(`Falha ao buscar municípios do IBGE: HTTP ${response.status}`)
  }

  const data = (await response.json()) as Array<{
    id: number
    nome: string
    microrregiao: {
      mesorregiao: {
        UF: {
          sigla: string
          regiao: { nome: string }
        }
      }
    }
  }>

  logger.info(`${data.length} municípios recebidos da API do IBGE.`)

  // Insere em lotes de 500 para não sobrecarregar o banco
  const batchSize = 500
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize).map((m) => ({
      id: String(m.id),
      nome: m.nome,
      uf: m.microrregiao.mesorregiao.UF.sigla,
      regiao: m.microrregiao.mesorregiao.UF.regiao.nome,
    }))

    await prisma.municipality.createMany({ data: batch, skipDuplicates: true })
    logger.info(`Municípios inseridos: ${Math.min(i + batchSize, data.length)} / ${data.length}`)
  }

  logger.info('Tabela de municípios IBGE importada com sucesso.')
}

/**
 * Seed dos dois institutos piloto já aprovados.
 * Dispensam o fluxo de verificação manual durante a demonstração.
 */
async function seedPilotInstitutions() {
  const existing = await prisma.institution.count({
    where: {
      OR: [
        { nome: { contains: 'Povo do Mar' } },
        { nome: { contains: 'Filadélfia' } },
      ],
    },
  })

  if (existing > 0) {
    logger.info('Institutos piloto já cadastrados. Pulando seed.')
    return
  }

  // Instituto Povo do Mar (IPOM) — Grande Vicente Pinzón, Fortaleza/CE
  // Código IBGE de Fortaleza: 2304400
  const ipomMunicipio = await prisma.municipality.findUnique({
    where: { id: '2304400' },
  })

  if (!ipomMunicipio) {
    logger.warn('Município de Fortaleza (2304400) não encontrado. Execute o seed IBGE primeiro.')
  } else {
    const ipom = await prisma.institution.create({
      data: {
        nome: 'Instituto Povo do Mar (IPOM)',
        cnpj: null, // CNPJ não disponível publicamente — trilha manual
        categoria: 'ONG',
        descricao:
          'O IPOM promove e desenvolve competências, inova na forma de educar, cria conexões, compartilha conhecimento e amplica impacto nas comunidades e famílias da Grande Vicente Pinzón, em Fortaleza/CE. Agentes de mudanças sociais que buscam desenvolver e inspirar pessoas.',
        ods: [1, 4, 10, 11, 17], // Pobreza, Educação, Desigualdades, Cidades, Parcerias
        responsavel_nome: 'Responsável IPOM',
        responsavel_email: 'contato@institutopovodomar.org.br',
        status_verificacao: 'APROVADA',
        aprovada_em: new Date(),
        regions: {
          create: [{ municipio_id: '2304400' }],
        },
      },
    })
    logger.info({ id: ipom.id }, 'Instituto Povo do Mar cadastrado e aprovado.')
  }

  // Instituto Filadélfia da Amazônia — Colônia Terra Nova, Manaus/AM
  // Código IBGE de Manaus: 1302603
  const manausMunicipio = await prisma.municipality.findUnique({
    where: { id: '1302603' },
  })

  if (!manausMunicipio) {
    logger.warn('Município de Manaus (1302603) não encontrado. Execute o seed IBGE primeiro.')
  } else {
    const filadelfia = await prisma.institution.create({
      data: {
        nome: 'Instituto Filadélfia da Amazônia',
        cnpj: '31767100000171',
        categoria: 'ONG',
        descricao:
          'Associação civil sem fins lucrativos fundada em 2018, sediada na Colônia Terra Nova, Manaus/AM. Desperta o senso crítico participativo de crianças, jovens e adultos, sendo referência na promoção da assistência social por meio de inovação, cursos e ação comunitária. Certificação CEBAS válida até 2029.',
        ods: [1, 3, 4, 10, 13, 15, 17],
        responsavel_nome: 'Responsável Instituto Filadélfia',
        responsavel_email: 'contato@institutofiladelfia.org.br',
        status_verificacao: 'APROVADA',
        aprovada_em: new Date(),
        regions: {
          create: [{ municipio_id: '1302603' }],
        },
      },
    })
    logger.info({ id: filadelfia.id }, 'Instituto Filadélfia da Amazônia cadastrado e aprovado.')
  }
}

/**
 * Seed do administrador master inicial.
 */
async function seedAdminMaster() {
  const existing = await prisma.admin.findFirst({ where: { papel: 'ADMIN_MASTER' } })
  if (existing) {
    logger.info('Admin master já existe. Pulando seed.')
    return
  }

  const admin = await prisma.admin.create({
    data: {
      email: 'admin@elociv.org',
      nome: 'Admin EloCiv',
      papel: 'ADMIN_MASTER',
    },
  })

  logger.info(
    { id: admin.id, email: admin.email },
    'Admin master criado. Use POST /auth/request-code com este e-mail para obter o OTP.',
  )
}

async function main() {
  logger.info('Iniciando seed do banco de dados EloCiv...')

  await seedMunicipalities()
  await seedPilotInstitutions()
  await seedAdminMaster()

  logger.info('Seed concluído com sucesso.')
}

main()
  .catch((err) => {
    logger.error(err, 'Erro durante o seed')
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
