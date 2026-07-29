import { PrismaClient } from '@prisma/client'
import { logger } from '../src/lib/logger.js'

const prisma = new PrismaClient()

/**
 * Seed de municípios brasileiros via API do IBGE.
 * Importa a tabela completa (5.570 municípios) na primeira execução.
 */
async function seedMunicipalities() {
  const count = await prisma.municipality.count()
  if (count >= 5500) {
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

  const data = (await response.json()) as Array<any>

  logger.info(`${data.length} municípios recebidos da API do IBGE.`)

  // Insere em lotes de 500 para não sobrecarregar o banco
  const batchSize = 500
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize).map((m) => {
      const uf =
        m.microrregiao?.mesorregiao?.UF?.sigla ??
        m['regiao-imediata']?.['regiao-intermediaria']?.UF?.sigla ??
        'DF'
      const regiao =
        m.microrregiao?.mesorregiao?.UF?.regiao?.nome ??
        m['regiao-imediata']?.['regiao-intermediaria']?.UF?.regiao?.nome ??
        'Centro-Oeste'

      return {
        id: String(m.id),
        nome: m.nome,
        uf,
        regiao,
      }
    })

    await prisma.municipality.createMany({ data: batch, skipDuplicates: true })
    logger.info(`Municípios inseridos: ${Math.min(i + batchSize, data.length)} / ${data.length}`)
  }

  logger.info('Tabela de municípios IBGE importada com sucesso.')
}

/**
 * Definição das 6 instituições apoiadoras do EloCiv e suas oportunidades demonstrativas.
 */
const SUPPORTING_INSTITUTIONS = [
  {
    nome: 'Shanti Brasil',
    cnpj: '12345678000101',
    categoria: 'ONG' as const,
    descricao:
      'Organização voltada para o desenvolvimento humano, cultura de paz, meditação, valores humanos e ações sociais integradas para crianças, jovens e comunidades vulneráveis.',
    ods: [3, 4, 10, 16, 17],
    responsavel_nome: 'Responsável Shanti Brasil',
    responsavel_email: 'contato@shantibrasil.org.br',
    municipios: ['3550308'], // São Paulo/SP
    oportunidade: {
      titulo: 'Oficina de Cultura de Paz e Meditação para Jovens',
      descricao:
        'Encontros semanais práticos sobre inteligência emocional, atenção plena e cultura de paz no ambiente escolar e comunitário.',
      tipo: 'OFICINA_TECNICA' as const,
      ods: [3, 4, 16],
      faixa_etaria_alvo: 'TODAS' as const,
      frequencia: 'CONTINUA' as const,
      modalidade: 'PRESENCIAL' as const,
      municipio_id: '3550308',
      ponto_contato: 'contato@shantibrasil.org.br',
    },
  },
  {
    nome: 'TETO Brasil',
    cnpj: '08304244000180',
    categoria: 'ONG' as const,
    descricao:
      'Organização internacional que atua em favelas precárias e comunidades vulneráveis, engajando jovens voluntários para a construção de moradias de emergência e projetos comunitários.',
    ods: [1, 10, 11, 17],
    responsavel_nome: 'Responsável TETO Brasil',
    responsavel_email: 'contato@teto.org.br',
    municipios: ['3550308', '3304557', '2927408'], // SP, RJ, Salvador
    oportunidade: {
      titulo: 'Voluntariado de Construção Comunitária de Moradias',
      descricao:
        'Imersão de final de semana para voluntários participarem da construção de habitações de emergência e diagnóstico comunitário.',
      tipo: 'VOLUNTARIADO' as const,
      ods: [1, 11, 17],
      faixa_etaria_alvo: 'DE_15_A_17' as const,
      frequencia: 'PONTUAL' as const,
      modalidade: 'PRESENCIAL' as const,
      municipio_id: '3550308',
      ponto_contato: 'voluntariado@teto.org.br',
    },
  },
  {
    nome: 'IIRes da Amazônia — Instituto de Inovação e Pesquisa Social',
    cnpj: '40123987000155',
    categoria: 'ONG' as const,
    descricao:
      'Organização dedicada à pesquisa social, inovação tecnológica comunitária, preservação ambiental e empoderamento de jovens nas comunidades tradicionais e urbanas da Amazônia.',
    ods: [4, 8, 10, 13, 15, 17],
    responsavel_nome: 'Responsável IIRes',
    responsavel_email: 'contato@iiresamazonia.org.br',
    municipios: ['1302603', '1501402'], // Manaus, Belém
    oportunidade: {
      titulo: 'Formação em Inovação Social e Bioeconomia Jovem',
      descricao:
        'Curso prático sobre empreendedorismo sustentável, soluções baseadas na natureza e bioeconomia para adolescentes da Amazônia.',
      tipo: 'FORMACAO_COMPLEMENTAR' as const,
      ods: [4, 8, 13, 15],
      faixa_etaria_alvo: 'TODAS' as const,
      frequencia: 'CONTINUA' as const,
      modalidade: 'PRESENCIAL' as const,
      municipio_id: '1302603',
      ponto_contato: 'projetos@iiresamazonia.org.br',
    },
  },
  {
    nome: 'Instituto Povo do Mar (IPOM)',
    cnpj: '12987654000199',
    categoria: 'ONG' as const,
    descricao:
      'O IPOM promove e desenvolve competências, inova na forma de educar, cria conexões, compartilha conhecimento e amplifica impacto nas comunidades e famílias da Grande Vicente Pinzón, em Fortaleza/CE.',
    ods: [1, 4, 10, 11, 17],
    responsavel_nome: 'Responsável IPOM',
    responsavel_email: 'contato@institutopovodomar.org.br',
    municipios: ['2304400'], // Fortaleza/CE
    oportunidade: {
      titulo: 'Oficina de Surf, Esporte e Cidadania Ativa',
      descricao:
        'Prática esportiva aliada a oficinas de cidadania, preservação do ecossistema marinho e desenvolvimento interpessoal para adolescentes.',
      tipo: 'OFICINA_TECNICA' as const,
      ods: [3, 4, 10, 14],
      faixa_etaria_alvo: 'DE_12_A_14' as const,
      frequencia: 'CONTINUA' as const,
      modalidade: 'PRESENCIAL' as const,
      municipio_id: '2304400',
      ponto_contato: 'esporte@institutopovodomar.org.br',
    },
  },
  {
    nome: 'Instituto Filadélfia da Amazônia',
    cnpj: '31767100000171',
    categoria: 'ONG' as const,
    descricao:
      'Associação civil sem fins lucrativos fundada em 2018, sediada na Colônia Terra Nova, Manaus/AM. Desperta o senso crítico participativo de crianças, jovens e adultos, sendo referência na promoção da assistência social por meio de inovação, cursos e ação comunitária. Certificação CEBAS válida até 2029.',
    ods: [1, 3, 4, 10, 13, 15, 17],
    responsavel_nome: 'Responsável Instituto Filadélfia',
    responsavel_email: 'contato@institutofiladelfia.org.br',
    municipios: ['1302603'], // Manaus/AM
    oportunidade: {
      titulo: 'Curso de Inclusão Digital e Programação Inicial',
      descricao:
        'Formação prática de introdução à lógica de programação, pacote de ferramentas digitais e preparação para o primeiro emprego.',
      tipo: 'CURSO_PROFISSIONALIZANTE' as const,
      ods: [4, 8, 10],
      faixa_etaria_alvo: 'DE_15_A_17' as const,
      frequencia: 'CONTINUA' as const,
      modalidade: 'PRESENCIAL' as const,
      municipio_id: '1302603',
      ponto_contato: 'cursos@institutofiladelfia.org.br',
    },
  },
  {
    nome: 'Interact Brasil (Rotary International)',
    cnpj: '99887766000122',
    categoria: 'COLETIVO_INFORMAL' as const,
    descricao:
      'Programa de clubes de serviço patrocinado pelo Rotary International para jovens de 12 a 18 anos, promovendo liderança, projetos de impacto social comunitário e cidadania global.',
    ods: [3, 4, 10, 16, 17],
    responsavel_nome: 'Responsável Interact Brasil',
    responsavel_email: 'contato@interactbrasil.org.br',
    municipios: ['3550308', '5300108'], // SP, Brasília
    oportunidade: {
      titulo: 'Clube de Liderança e Projetos Comunitários Juvenis',
      descricao:
        'Encontros quinzenais para planejamento e execução de campanhas sociais, arrecadações e ações ambientais protagonizadas por adolescentes.',
      tipo: 'GRUPO_DE_JOVENS' as const,
      ods: [4, 10, 16, 17],
      faixa_etaria_alvo: 'TODAS' as const,
      frequencia: 'CONTINUA' as const,
      modalidade: 'PRESENCIAL' as const,
      municipio_id: '5300108',
      ponto_contato: 'lideranca@interactbrasil.org.br',
    },
  },
]

/**
 * Seed das 6 instituições apoiadoras e suas oportunidades demonstrativas.
 */
async function seedInstitutionsAndOpportunities() {
  logger.info('Iniciando cadastro das 6 instituições apoiadoras do EloCiv...')

  for (const item of SUPPORTING_INSTITUTIONS) {
    // Busca ou cria instituição
    let institution = await prisma.institution.findFirst({
      where: { nome: { contains: item.nome.split(' ')[0] } },
    })

    if (!institution) {
      institution = await prisma.institution.create({
        data: {
          nome: item.nome,
          cnpj: item.cnpj,
          categoria: item.categoria,
          descricao: item.descricao,
          ods: item.ods,
          responsavel_nome: item.responsavel_nome,
          responsavel_email: item.responsavel_email,
          status_verificacao: 'APROVADA',
          aprovada_em: new Date(),
          regions: {
            create: item.municipios.map((mId) => ({ municipio_id: mId })),
          },
        },
      })
      logger.info({ id: institution.id, nome: institution.nome }, 'Instituição criada e APROVADA.')
    } else {
      logger.info({ id: institution.id, nome: institution.nome }, 'Instituição já existe no banco.')
    }

    // Cria oportunidade demonstrativa se não existir
    const existingOpp = await prisma.opportunity.findFirst({
      where: { institution_id: institution.id, titulo: item.oportunidade.titulo },
    })

    if (!existingOpp) {
      const opp = await prisma.opportunity.create({
        data: {
          institution_id: institution.id,
          titulo: item.oportunidade.titulo,
          descricao: item.oportunidade.descricao,
          tipo: item.oportunidade.tipo,
          ods: item.oportunidade.ods,
          faixa_etaria_alvo: item.oportunidade.faixa_etaria_alvo,
          frequencia: item.oportunidade.frequencia,
          modalidade: item.oportunidade.modalidade,
          municipio_id: item.oportunidade.municipio_id,
          ponto_contato: item.oportunidade.ponto_contato,
          status: 'PUBLICADA',
        },
      })
      logger.info({ id: opp.id, titulo: opp.titulo }, 'Oportunidade demonstrativa cadastrada e PUBLICADA.')
    } else {
      logger.info({ id: existingOpp.id, titulo: existingOpp.titulo }, 'Oportunidade já existe no banco.')
    }
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
  await seedInstitutionsAndOpportunities()
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
