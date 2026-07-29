export const opportunityCategories = [
  'Curso educacional',
  'Curso profissionalizante',
  'Oficina técnica',
  'Formação complementar',
  'Voluntariado jovem',
  'Ação pontual',
  'Grupo de jovens',
  'Palestra',
  'Mentoria',
] as const

export const opportunityModalities = ['Presencial', 'Online', 'Híbrida'] as const

export const opportunityStates = [
  'Amazonas',
  'Pará',
  'Pernambuco',
  'Bahia',
  'Distrito Federal',
  'São Paulo',
] as const

export const opportunityAgeRanges = [
  '12 a 14 anos',
  '15 a 16 anos',
  '17 a 18 anos',
  '12 a 18 anos',
] as const

export type OpportunityCategory = (typeof opportunityCategories)[number]
export type OpportunityModality = (typeof opportunityModalities)[number]
export type OpportunityState = (typeof opportunityStates)[number]
export type OpportunityVisualVariant = 'blue' | 'yellow' | 'pink' | 'plum'

export type Opportunity = {
  id: string
  slug: string
  title: string
  summary: string
  organization: string
  organizationVerified: boolean
  category: OpportunityCategory
  modality: OpportunityModality
  city?: string
  state?: OpportunityState
  stateAbbreviation?: string
  locationLabel: string
  ageRange: string
  period: string
  duration: string
  ods: number[]
  visualVariant: OpportunityVisualVariant
}

export const opportunities: Opportunity[] = [
  {
    id: 'opp-001',
    slug: 'oficina-introducao-programacao',
    title: 'Oficina de introdução à programação',
    summary:
      'Aprenda os fundamentos da programação por meio de atividades práticas, desafios em grupo e criação de um pequeno projeto digital.',
    organization: 'Instituto Ponte Digital',
    organizationVerified: true,
    category: 'Oficina técnica',
    modality: 'Presencial',
    city: 'Manaus',
    state: 'Amazonas',
    stateAbbreviation: 'AM',
    locationLabel: 'Manaus, AM',
    ageRange: '14 a 18 anos',
    period: '15 e 16 de agosto de 2026',
    duration: '12 horas',
    ods: [4, 9, 10],
    visualVariant: 'blue',
  },
  {
    id: 'opp-002',
    slug: 'comunicacao-comunitaria-jovens',
    title: 'Comunicação comunitária para jovens',
    summary:
      'Formação sobre produção de conteúdo, comunicação responsável e mobilização de iniciativas juvenis no território.',
    organization: 'Rede Vozes Jovens',
    organizationVerified: true,
    category: 'Formação complementar',
    modality: 'Online',
    locationLabel: 'Online - todo o Brasil',
    ageRange: '13 a 18 anos',
    period: '18 de agosto a 12 de setembro de 2026',
    duration: '4 semanas',
    ods: [4, 10, 16],
    visualVariant: 'yellow',
  },
  {
    id: 'opp-003',
    slug: 'mentoria-primeiro-emprego',
    title: 'Mentoria para o primeiro emprego',
    summary:
      'Encontros de orientação profissional para apoiar jovens na preparação de currículo, entrevistas e escolhas de carreira.',
    organization: 'Instituto Caminhos Abertos',
    organizationVerified: true,
    category: 'Mentoria',
    modality: 'Híbrida',
    city: 'São Paulo',
    state: 'São Paulo',
    stateAbbreviation: 'SP',
    locationLabel: 'São Paulo, SP',
    ageRange: '16 a 18 anos',
    period: '20 de agosto a 30 de setembro de 2026',
    duration: '6 encontros',
    ods: [4, 8, 10],
    visualVariant: 'pink',
  },
  {
    id: 'opp-004',
    slug: 'laboratorio-inovacao-social',
    title: 'Laboratório de inovação social',
    summary:
      'Uma jornada para transformar desafios da comunidade em ideias, protótipos e soluções de impacto social.',
    organization: 'Hub Juventude Cidadã',
    organizationVerified: true,
    category: 'Curso educacional',
    modality: 'Presencial',
    city: 'Recife',
    state: 'Pernambuco',
    stateAbbreviation: 'PE',
    locationLabel: 'Recife, PE',
    ageRange: '15 a 18 anos',
    period: '22 de agosto a 19 de setembro de 2026',
    duration: '20 horas',
    ods: [9, 10, 17],
    visualVariant: 'plum',
  },
  {
    id: 'opp-005',
    slug: 'formacao-liderancas-juvenis',
    title: 'Formação de lideranças juvenis',
    summary:
      'Formação sobre participação cidadã, escuta comunitária, organização de projetos e representação juvenil.',
    organization: 'Coletivo Participa',
    organizationVerified: true,
    category: 'Formação complementar',
    modality: 'Online',
    locationLabel: 'Online - todo o Brasil',
    ageRange: '14 a 18 anos',
    period: '1º a 29 de setembro de 2026',
    duration: '5 encontros',
    ods: [10, 16, 17],
    visualVariant: 'blue',
  },
  {
    id: 'opp-006',
    slug: 'oficina-producao-cultural',
    title: 'Oficina de produção cultural',
    summary:
      'Introdução à criação, planejamento e realização de ações culturais construídas por jovens em seus territórios.',
    organization: 'Casa Criativa Jovem',
    organizationVerified: true,
    category: 'Oficina técnica',
    modality: 'Presencial',
    city: 'Belém',
    state: 'Pará',
    stateAbbreviation: 'PA',
    locationLabel: 'Belém, PA',
    ageRange: '15 a 18 anos',
    period: '5 e 6 de setembro de 2026',
    duration: '10 horas',
    ods: [4, 8, 10],
    visualVariant: 'yellow',
  },
  {
    id: 'opp-007',
    slug: 'voluntariado-reforco-escolar',
    title: 'Voluntariado em reforço escolar',
    summary:
      'Programa de voluntariado para apoiar atividades de leitura, matemática e acompanhamento escolar de crianças.',
    organization: 'Projeto Aprender Juntos',
    organizationVerified: true,
    category: 'Voluntariado jovem',
    modality: 'Presencial',
    city: 'Brasília',
    state: 'Distrito Federal',
    stateAbbreviation: 'DF',
    locationLabel: 'Brasília, DF',
    ageRange: '16 a 18 anos',
    period: 'Setembro a novembro de 2026',
    duration: '2 horas por semana',
    ods: [4, 10, 17],
    visualVariant: 'pink',
  },
  {
    id: 'opp-008',
    slug: 'jovens-clima-territorio',
    title: 'Jovens pelo clima e pelo território',
    summary:
      'Grupo de participação juvenil para investigar desafios ambientais locais e construir ações comunitárias.',
    organization: 'Rede Raízes do Futuro',
    organizationVerified: true,
    category: 'Grupo de jovens',
    modality: 'Híbrida',
    city: 'Salvador',
    state: 'Bahia',
    stateAbbreviation: 'BA',
    locationLabel: 'Salvador, BA',
    ageRange: '12 a 18 anos',
    period: 'Encontros quinzenais',
    duration: 'Atividade contínua',
    ods: [10, 16, 17],
    visualVariant: 'plum',
  },
]
