/**
 * Adaptador: Backend Credential → Frontend CivicCredential (data/credentials.ts)
 */

import type { CivicCredential, CredentialVisualVariant } from '@/data/credentials'

// ─── Tipos do backend ───────────────────────────────────────────────────────

export type BackendCredential = {
  id: string
  participation_id: string
  young_id: string
  dados_credencial: {
    titulo?: string
    categoria?: string
    modalidade?: string
    local?: string
    periodo?: string
    carga_horaria?: string
    faixa_etaria?: string
    resumo?: string
    habilidades?: string[]
  }
  hash_ancorado: string
  tx_id: string | null
  block_number: number | null
  emissor: string
  visibilidade: string
  status: string
  revogada_em: string | null
  motivo_revogacao: string | null
  emitida_em: string
  atualizado_em: string
  participation?: {
    opportunity?: {
      titulo: string
      tipo: string
      modalidade: string
      municipio?: { nome: string; uf: string }
      data_inicio: string | null
      data_fim: string | null
      institution?: { nome: string; status_verificacao: string }
    }
  }
  young?: {
    apelido: string | null
    ano_nascimento: number
  }
}

// ─── Tipos para verificação on-chain ────────────────────────────────────────

export type OnChainStatus = {
  found: boolean
  is_revoked?: boolean
  timestamp?: number
  issuer?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const VISUAL_VARIANTS: CredentialVisualVariant[] = ['blue', 'yellow', 'pink']

function pickVariant(index: number): CredentialVisualVariant {
  return VISUAL_VARIANTS[index % VISUAL_VARIANTS.length] as CredentialVisualVariant
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function buildSlug(title: string, id: string): string {
  return (
    'credencial-' +
    title
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

function maskAddress(address: string): string {
  if (address.length <= 12) return address
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}

// ─── Adaptador principal ─────────────────────────────────────────────────────

export function adaptCredential(item: BackendCredential, index: number): CivicCredential {
  const opp = item.participation?.opportunity
  const institution = opp?.institution
  const young = item.young
  const vc = item.dados_credencial ?? {}

  const title = vc.titulo ?? opp?.titulo ?? 'Credencial Cívica'
  const slug = buildSlug(title, item.id)

  const displayName = young?.apelido
    ? young.apelido.slice(0, 8) + '.'
    : 'Jovem EloCiv'

  const issuerAddress = item.emissor

  return {
    id: `ELOCIV-VC-${item.emitida_em.slice(0, 4)}-${item.id.slice(0, 6).toUpperCase()}`,
    slug,
    status: item.revogada_em ? ('revoked' as any) : 'valid',
    statusLabel: item.revogada_em ? 'Revogada' : 'Válida',
    visibility: item.visibilidade === 'PUBLICA' ? 'visible' : 'private',
    visibilityLabel:
      item.visibilidade === 'PUBLICA' ? 'Visível na apresentação' : 'Privada',
    visualVariant: pickVariant(index),
    holder: {
      displayName,
      initials: displayName.slice(0, 2).toUpperCase(),
      did: `did:elociv:holder:${item.young_id.slice(0, 12)}`,
      maskedDid: `did:elociv:holder:•••-${item.young_id.slice(-6)}`,
    },
    issuer: {
      name: institution?.nome ?? 'EloCiv Custodiante',
      verified: institution?.status_verificacao === 'APROVADA',
      did: `did:stellar:${issuerAddress}`,
    },
    opportunity: {
      slug: title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-'),
      title,
      category: vc.categoria ?? opp?.tipo ?? 'Atividade',
      modality: vc.modalidade ?? opp?.modalidade ?? 'Presencial',
      location: vc.local ?? (opp?.municipio ? `${opp.municipio.nome}, ${opp.municipio.uf}` : 'Brasil'),
      period: vc.periodo ?? 'A definir',
      workload: vc.carga_horaria ?? 'A definir',
      ageRange: vc.faixa_etaria ?? '12 a 18 anos',
      summary: vc.resumo ?? title,
    },
    issuedAt: formatDate(item.emitida_em),
    activityDate: vc.periodo ?? formatDate(item.emitida_em),
    nonTransferable: true,
    revoked: !!item.revogada_em,
    lastCheckedAt: formatDate(item.atualizado_em),
    skills: vc.habilidades ?? [],
    primarySkills: (vc.habilidades ?? []).slice(0, 3),
    ods: [],
    proof: {
      format: 'Credencial Verificável EloCiv',
      algorithm: 'SHA-256',
      digest: item.hash_ancorado
        ? `${item.hash_ancorado.slice(0, 8)}...${item.hash_ancorado.slice(-8)}`
        : '—',
      situation: item.status === 'ATIVA' ? 'Ativa' : item.status,
      revocation: item.revogada_em ? `Revogada em ${formatDate(item.revogada_em)}` : 'Não revogada',
      environment: 'Stellar Testnet',
      network: `Ledger #${item.block_number ?? '—'}  ·  Tx: ${item.tx_id ? maskAddress(item.tx_id) : '—'}`,
    },
  }
}

export function adaptCredentials(items: BackendCredential[]): CivicCredential[] {
  return items.map((item, i) => adaptCredential(item, i))
}
