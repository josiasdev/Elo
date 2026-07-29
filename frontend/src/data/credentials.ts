export type CredentialStatus = 'valid'
export type CredentialVisibility = 'visible' | 'private'
export type CredentialVisualVariant = 'blue' | 'yellow' | 'pink'

export type CivicCredential = {
  id: string
  slug: string
  status: CredentialStatus
  statusLabel: string
  visibility: CredentialVisibility
  visibilityLabel: string
  visualVariant: CredentialVisualVariant
  holder: {
    displayName: string
    initials: string
    did: string
    maskedDid: string
  }
  issuer: {
    name: string
    verified: boolean
    did: string
  }
  opportunity: {
    slug: string
    title: string
    category: string
    modality: string
    location: string
    period: string
    workload: string
    ageRange: string
    summary: string
  }
  issuedAt: string
  activityDate: string
  nonTransferable: boolean
  revoked: boolean
  lastCheckedAt: string
  skills: string[]
  primarySkills: string[]
  ods: Array<{
    id: number
    title: string
  }>
  proof: {
    format: string
    algorithm: string
    digest: string
    situation: string
    revocation: string
    environment: string
    network: string
  }
}

const sharedHolder = {
  displayName: 'Ana B. S.',
  initials: 'AS',
  did: 'did:example:elociv:holder:ana-bs-001',
  maskedDid: 'did:example:elociv:holder:ana-•••-001',
}

export const credentials: CivicCredential[] = [
  {
    id: 'ELOCIV-VC-2026-000184',
    slug: 'credencial-oficina-introducao-programacao',
    status: 'valid',
    statusLabel: 'Válida',
    visibility: 'visible',
    visibilityLabel: 'Visível na apresentação',
    visualVariant: 'blue',
    holder: sharedHolder,
    issuer: {
      name: 'Instituto Ponte Digital',
      verified: true,
      did: 'did:example:elociv:issuer:ponte-digital',
    },
    opportunity: {
      slug: 'oficina-introducao-programacao',
      title: 'Oficina de Introdução à Programação',
      category: 'Oficina técnica',
      modality: 'Presencial',
      location: 'Manaus, Amazonas',
      period: '15 e 16 de agosto de 2026',
      workload: '12 horas',
      ageRange: '14 a 18 anos',
      summary:
        'Participação em uma oficina prática sobre fundamentos de lógica, programação, resolução de problemas e criação colaborativa de um pequeno projeto digital.',
    },
    issuedAt: '18 de agosto de 2026',
    activityDate: '15 e 16 de agosto de 2026',
    nonTransferable: true,
    revoked: false,
    lastCheckedAt: '29 de julho de 2026, 09:05',
    skills: [
      'Lógica de programação',
      'Resolução de problemas',
      'Colaboração',
      'Criatividade digital',
      'Comunicação',
      'Desenvolvimento de projeto',
    ],
    primarySkills: [
      'Lógica de programação',
      'Resolução de problemas',
      'Colaboração',
    ],
    ods: [
      { id: 4, title: 'Educação de qualidade' },
      { id: 9, title: 'Indústria, inovação e infraestrutura' },
      { id: 10, title: 'Redução das desigualdades' },
    ],
    proof: {
      format: 'Credencial Verificável — demonstração',
      algorithm: 'SHA-256 — demonstrativo',
      digest: '7fa4c892...31b9c2e6',
      situation: 'Ativa',
      revocation: 'Não revogada',
      environment: 'Protótipo EloCiv',
      network: 'Rede de demonstração',
    },
  },
  {
    id: 'ELOCIV-VC-2026-000139',
    slug: 'credencial-formacao-liderancas-juvenis',
    status: 'valid',
    statusLabel: 'Válida',
    visibility: 'private',
    visibilityLabel: 'Privada',
    visualVariant: 'yellow',
    holder: sharedHolder,
    issuer: {
      name: 'Coletivo Participa',
      verified: true,
      did: 'did:example:elociv:issuer:coletivo-participa',
    },
    opportunity: {
      slug: 'formacao-liderancas-juvenis',
      title: 'Formação de Lideranças Juvenis',
      category: 'Formação complementar',
      modality: 'Online',
      location: 'Online - todo o Brasil',
      period: '1º a 29 de julho de 2026',
      workload: '15 horas',
      ageRange: '14 a 18 anos',
      summary:
        'Participação em uma formação demonstrativa sobre participação cidadã, escuta comunitária, organização coletiva e planejamento de projetos juvenis.',
    },
    issuedAt: '3 de agosto de 2026',
    activityDate: '1º a 29 de julho de 2026',
    nonTransferable: true,
    revoked: false,
    lastCheckedAt: '29 de julho de 2026, 09:05',
    skills: [
      'Liderança',
      'Participação cidadã',
      'Planejamento de projetos',
      'Escuta comunitária',
      'Organização coletiva',
    ],
    primarySkills: [
      'Liderança',
      'Participação cidadã',
      'Planejamento de projetos',
    ],
    ods: [
      { id: 10, title: 'Redução das desigualdades' },
      { id: 16, title: 'Paz, justiça e instituições eficazes' },
      { id: 17, title: 'Parcerias e meios de implementação' },
    ],
    proof: {
      format: 'Credencial Verificável — demonstração',
      algorithm: 'SHA-256 — demonstrativo',
      digest: '41b0e7ac...8d62f193',
      situation: 'Ativa',
      revocation: 'Não revogada',
      environment: 'Protótipo EloCiv',
      network: 'Rede de demonstração',
    },
  },
  {
    id: 'ELOCIV-VC-2026-000096',
    slug: 'credencial-comunicacao-comunitaria-jovens',
    status: 'valid',
    statusLabel: 'Válida',
    visibility: 'visible',
    visibilityLabel: 'Visível na apresentação',
    visualVariant: 'pink',
    holder: sharedHolder,
    issuer: {
      name: 'Rede Vozes Jovens',
      verified: true,
      did: 'did:example:elociv:issuer:vozes-jovens',
    },
    opportunity: {
      slug: 'comunicacao-comunitaria-jovens',
      title: 'Comunicação Comunitária para Jovens',
      category: 'Formação complementar',
      modality: 'Online',
      location: 'Online - todo o Brasil',
      period: '10 de junho a 8 de julho de 2026',
      workload: '9 horas',
      ageRange: '13 a 18 anos',
      summary:
        'Participação em uma formação demonstrativa sobre comunicação responsável, produção de conteúdo e mobilização de iniciativas juvenis no território.',
    },
    issuedAt: '12 de julho de 2026',
    activityDate: '10 de junho a 8 de julho de 2026',
    nonTransferable: true,
    revoked: false,
    lastCheckedAt: '29 de julho de 2026, 09:05',
    skills: [
      'Comunicação',
      'Produção de conteúdo',
      'Mobilização comunitária',
      'Comunicação responsável',
      'Planejamento editorial',
    ],
    primarySkills: [
      'Comunicação',
      'Produção de conteúdo',
      'Mobilização comunitária',
    ],
    ods: [
      { id: 4, title: 'Educação de qualidade' },
      { id: 10, title: 'Redução das desigualdades' },
      { id: 16, title: 'Paz, justiça e instituições eficazes' },
    ],
    proof: {
      format: 'Credencial Verificável — demonstração',
      algorithm: 'SHA-256 — demonstrativo',
      digest: 'c9a20375...54fb018c',
      situation: 'Ativa',
      revocation: 'Não revogada',
      environment: 'Protótipo EloCiv',
      network: 'Rede de demonstração',
    },
  },
]

export function findCredentialBySlug(slug: string) {
  return credentials.find((credential) => credential.slug === slug)
}
