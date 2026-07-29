/**
 * Adaptador: Backend Opportunity → Frontend Opportunity (data/opportunities.ts)
 *
 * O backend retorna campos em português/snake_case.
 * O frontend consome campos em inglês/camelCase.
 */

import type { Opportunity, OpportunityVisualVariant } from '@/data/opportunities'

// ─── Tipos do backend ───────────────────────────────────────────────────────

export type BackendOpportunity = {
  id: string
  institution_id: string
  institution: {
    nome: string
    status_verificacao: string
  }
  titulo: string
  descricao: string
  tipo: string
  ods: number[]
  faixa_etaria_alvo: string
  frequencia: string
  data_inicio: string | null
  data_fim: string | null
  hora_inicio: string | null
  modalidade: string
  endereco: string | null
  link_online: string | null
  vagas: number | null
  ponto_contato: string
  municipio: {
    id: string
    nome: string
    uf: string
    regiao: string
  }
  criterio_conclusao: string | null
  status: string
  criado_em: string
  atualizado_em: string
}

// ─── Mapas de conversão ──────────────────────────────────────────────────────

const TIPO_MAP: Record<string, Opportunity['category']> = {
  OFICINA_TECNICA: 'Oficina técnica',
  CURSO_EDUCACIONAL: 'Curso educacional',
  CURSO_PROFISSIONALIZANTE: 'Curso profissionalizante',
  FORMACAO_COMPLEMENTAR: 'Formação complementar',
  VOLUNTARIADO: 'Voluntariado jovem',
  ACAO_PONTUAL: 'Ação pontual',
  GRUPO_DE_JOVENS: 'Grupo de jovens',
  PALESTRA: 'Palestra',
  OUTROS: 'Mentoria',
}

const MODALIDADE_MAP: Record<string, Opportunity['modality']> = {
  PRESENCIAL: 'Presencial',
  ONLINE: 'Online',
}

const FAIXA_ETARIA_MAP: Record<string, string> = {
  DE_12_A_14: '12 a 14 anos',
  DE_15_A_17: '15 a 17 anos',
  DE_18: '18 anos ou mais',
  TODAS: '12 a 18 anos',
}

const VISUAL_VARIANTS: OpportunityVisualVariant[] = ['blue', 'yellow', 'pink', 'plum']

function pickVariant(index: number): OpportunityVisualVariant {
  return VISUAL_VARIANTS[index % VISUAL_VARIANTS.length] as OpportunityVisualVariant
}

function buildSlug(titulo: string, id: string): string {
  return (
    titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') +
    '-' +
    id.slice(0, 8)
  )
}

function buildPeriod(inicio: string | null, fim: string | null): string {
  if (!inicio) return 'A definir'
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
  if (!fim) return `A partir de ${fmt(inicio)}`
  return `${fmt(inicio)} a ${fmt(fim)}`
}

// ─── Adaptador principal ─────────────────────────────────────────────────────

export function adaptOpportunity(item: BackendOpportunity, index: number): Opportunity {
  const slug = buildSlug(item.titulo, item.id)
  const modality = MODALIDADE_MAP[item.modalidade] ?? 'Presencial'
  const locationLabel =
    modality === 'Online'
      ? 'Online — todo o Brasil'
      : `${item.municipio.nome}, ${item.municipio.uf}`

  const base = {
    id: item.id,
    slug,
    title: item.titulo,
    summary: ((item.descricao ?? '').split('\n')[0] ?? '').slice(0, 220),
    organization: item.institution.nome,
    organizationVerified: item.institution.status_verificacao === 'APROVADA',
    category: (TIPO_MAP[item.tipo] ?? 'Oficina técnica') as Opportunity['category'],
    modality,
    city: item.municipio.nome,
    stateAbbreviation: item.municipio.uf,
    locationLabel,
    ageRange: FAIXA_ETARIA_MAP[item.faixa_etaria_alvo] ?? '12 a 18 anos',
    period: buildPeriod(item.data_inicio, item.data_fim),
    duration: item.criterio_conclusao ?? 'A definir',
    ods: item.ods,
    visualVariant: pickVariant(index),
    description: (item.descricao ?? '').split('\n').filter(Boolean),
    activities: [] as string[],
    requirements: [] as string[],
    accessibility: ['Participação gratuita'],
    applicationStatus: item.status === 'PUBLICADA' ? 'Inscrições abertas' : 'Encerrada',
    credentialAvailable: true,
  }

  // state é um enum restrito no frontend; do backend vem só a UF.
  // Não mapeamos para o enum pois o backend usa campos diferentes.
  return base as unknown as Opportunity
}

export function adaptOpportunities(items: BackendOpportunity[]): Opportunity[] {
  return items.map((item, i) => adaptOpportunity(item, i))
}
