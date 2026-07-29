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
  description: string[]
  activities: string[]
  requirements: string[]
  accessibility: string[]
  applicationStatus: string
  credentialAvailable: boolean
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
    description: [
      'A Oficina de Introdução à Programação apresenta conceitos básicos de tecnologia e pensamento computacional por meio de atividades práticas e colaborativas.',
      'Durante dois dias, os participantes resolverão desafios, conhecerão fundamentos de lógica e desenvolverão um pequeno projeto digital em grupo.',
    ],
    activities: [
      'Explorar conceitos básicos de lógica de programação',
      'Resolver desafios práticos em equipe',
      'Criar um pequeno projeto digital',
      'Compartilhar ideias e aprendizados com outros jovens',
    ],
    requirements: [
      'Ter entre 14 e 18 anos',
      'Ter interesse por tecnologia e criação digital',
      'Ter disponibilidade nos dois dias da oficina',
      'Apresentar autorização do responsável quando necessária',
    ],
    accessibility: [
      'Participação gratuita',
      'Computadores e materiais fornecidos durante a oficina',
      'Possibilidade de informar necessidades de acessibilidade antes da atividade',
    ],
    applicationStatus: 'Inscrições abertas',
    credentialAvailable: true,
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
    description: [
      'A formação apresenta práticas de comunicação comunitária para jovens interessados em produzir conteúdo com responsabilidade e vínculo territorial.',
      'Ao longo dos encontros online, os participantes irão planejar mensagens, refletir sobre circulação de informação e pensar formas de mobilizar iniciativas juvenis.',
    ],
    activities: [
      'Conhecer princípios de comunicação responsável',
      'Planejar conteúdos para iniciativas juvenis',
      'Discutir mobilização comunitária em ambientes digitais',
      'Trocar referências com jovens de diferentes territórios',
    ],
    requirements: [
      'Ter entre 13 e 18 anos',
      'Ter acesso à internet durante os encontros',
      'Demonstrar interesse por comunicação e participação cidadã',
      'Apresentar autorização do responsável quando necessária',
    ],
    accessibility: [
      'Participação gratuita',
      'Materiais digitais disponibilizados em formato acessível',
      'Possibilidade de informar necessidades de acessibilidade antes dos encontros',
    ],
    applicationStatus: 'Inscrições abertas',
    credentialAvailable: true,
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
    description: [
      'A mentoria apoia jovens na preparação para oportunidades de trabalho, com orientação sobre currículo, entrevista e escolhas de carreira.',
      'A experiência combina encontros online e presenciais demonstrativos, criando espaço para dúvidas, simulações e conversas sobre trajetórias profissionais.',
    ],
    activities: [
      'Organizar informações para um currículo inicial',
      'Praticar respostas para entrevistas',
      'Conhecer possibilidades de formação e trabalho',
      'Receber orientações em pequenos grupos',
    ],
    requirements: [
      'Ter entre 16 e 18 anos',
      'Ter disponibilidade para os encontros previstos',
      'Demonstrar interesse em preparação profissional',
      'Apresentar autorização do responsável quando necessária',
    ],
    accessibility: [
      'Participação gratuita',
      'Atividades com apoio de materiais digitais',
      'Possibilidade de informar necessidades de acessibilidade antes da mentoria',
    ],
    applicationStatus: 'Inscrições abertas',
    credentialAvailable: true,
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
    description: [
      'O laboratório propõe uma jornada de inovação social para que jovens observem desafios da comunidade e transformem ideias em protótipos simples.',
      'A atividade valoriza escuta, colaboração e experimentação, aproximando participação cidadã de práticas de criação de soluções.',
    ],
    activities: [
      'Mapear desafios vividos no território',
      'Criar ideias em grupo a partir de problemas reais',
      'Desenvolver protótipos de baixa complexidade',
      'Apresentar propostas para outros participantes',
    ],
    requirements: [
      'Ter entre 15 e 18 anos',
      'Ter disponibilidade para a jornada completa',
      'Demonstrar interesse por inovação e impacto social',
      'Apresentar autorização do responsável quando necessária',
    ],
    accessibility: [
      'Participação gratuita',
      'Espaço demonstrativo com acesso para pessoas com mobilidade reduzida',
      'Materiais básicos fornecidos pela organização',
    ],
    applicationStatus: 'Inscrições abertas',
    credentialAvailable: true,
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
    description: [
      'A formação reúne jovens interessados em participação cidadã, escuta comunitária e organização de projetos coletivos.',
      'Os encontros online propõem atividades de reflexão e prática para fortalecer a atuação juvenil em iniciativas locais e espaços de representação.',
    ],
    activities: [
      'Discutir formas de participação cidadã',
      'Planejar ações juvenis em grupo',
      'Praticar escuta comunitária',
      'Construir propostas de representação juvenil',
    ],
    requirements: [
      'Ter entre 14 e 18 anos',
      'Ter acesso à internet durante os encontros',
      'Ter interesse por participação social',
      'Apresentar autorização do responsável quando necessária',
    ],
    accessibility: [
      'Participação gratuita',
      'Materiais digitais compartilhados com antecedência',
      'Possibilidade de informar necessidades de acessibilidade antes da formação',
    ],
    applicationStatus: 'Inscrições abertas',
    credentialAvailable: true,
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
    description: [
      'A oficina apresenta noções iniciais de produção cultural para jovens que desejam criar, organizar e divulgar ações em seus territórios.',
      'A experiência combina planejamento, colaboração e exercícios práticos para transformar ideias culturais em atividades realizáveis.',
    ],
    activities: [
      'Conhecer etapas de planejamento cultural',
      'Organizar ideias de ação em grupo',
      'Definir recursos básicos para uma atividade',
      'Apresentar uma proposta cultural simples',
    ],
    requirements: [
      'Ter entre 15 e 18 anos',
      'Ter disponibilidade nos dois dias da oficina',
      'Demonstrar interesse por cultura e organização comunitária',
      'Apresentar autorização do responsável quando necessária',
    ],
    accessibility: [
      'Participação gratuita',
      'Materiais de apoio fornecidos durante a oficina',
      'Possibilidade de informar necessidades de acessibilidade antes da atividade',
    ],
    applicationStatus: 'Inscrições abertas',
    credentialAvailable: true,
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
    description: [
      'O voluntariado conecta jovens a atividades de apoio escolar em leitura, matemática e acompanhamento de crianças em idade escolar.',
      'A participação demonstrativa valoriza responsabilidade, convivência e contribuição comunitária, com orientação básica antes das atividades.',
    ],
    activities: [
      'Apoiar atividades de leitura e matemática',
      'Participar de encontros semanais de acompanhamento',
      'Planejar dinâmicas simples com orientação da equipe',
      'Refletir sobre voluntariado e responsabilidade comunitária',
    ],
    requirements: [
      'Ter entre 16 e 18 anos',
      'Ter disponibilidade semanal no período indicado',
      'Demonstrar interesse por educação e voluntariado',
      'Apresentar autorização do responsável quando necessária',
    ],
    accessibility: [
      'Participação gratuita',
      'Orientação inicial fornecida pela organização',
      'Possibilidade de informar necessidades de acessibilidade antes do início',
    ],
    applicationStatus: 'Inscrições abertas',
    credentialAvailable: true,
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
    description: [
      'O grupo reúne jovens para investigar desafios ambientais locais e pensar ações comunitárias relacionadas ao território.',
      'A experiência combina encontros presenciais e online, com conversas, registro de percepções e construção colaborativa de pequenas iniciativas.',
    ],
    activities: [
      'Investigar desafios ambientais do território',
      'Participar de rodas de conversa com outros jovens',
      'Planejar ações comunitárias simples',
      'Compartilhar registros e aprendizados do grupo',
    ],
    requirements: [
      'Ter entre 12 e 18 anos',
      'Ter disponibilidade para encontros quinzenais',
      'Demonstrar interesse por clima, território e participação',
      'Apresentar autorização do responsável quando necessária',
    ],
    accessibility: [
      'Participação gratuita',
      'Atividades presenciais e online em formato demonstrativo',
      'Possibilidade de informar necessidades de acessibilidade antes dos encontros',
    ],
    applicationStatus: 'Inscrições abertas',
    credentialAvailable: true,
  },
]
