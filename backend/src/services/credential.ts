import { createHash } from 'crypto'

/**
 * Dados mínimos incluídos na credencial verificável.
 * Nenhum dado pessoal identificável é incluído aqui.
 * O nome completo do jovem NUNCA deve estar neste objeto.
 */
export interface CredentialData {
  institution_id: string
  institution_nome: string
  opportunity_titulo: string
  opportunity_tipo: string
  ods: number[]
  faixa_etaria: string
  periodo_inicio: string | null // ISO 8601
  periodo_fim: string | null   // ISO 8601
  municipio_id: string         // Código IBGE
  emitida_em: string           // ISO 8601
  emissor: string              // Endereço público do custodiante Stellar
}

/**
 * Serializa os dados de forma canônica (chaves ordenadas alfabeticamente)
 * e calcula o SHA-256. A reprodutibilidade é garantida por:
 * 1. Ordem das chaves sempre igual (Object.keys().sort())
 * 2. Sem espaços extras no JSON.stringify
 * 3. Codificação UTF-8 padrão do Node.js
 */
export function hashCredential(dados: CredentialData): string {
  const sortedKeys = Object.keys(dados).sort() as (keyof CredentialData)[]
  const ordered: Record<string, unknown> = {}
  for (const key of sortedKeys) {
    ordered[key] = dados[key]
  }
  const canonical = JSON.stringify(ordered)
  return createHash('sha256').update(canonical, 'utf8').digest('hex')
}

/**
 * Monta o envelope Verifiable Credential (W3C-inspired) para o MVP.
 * A estrutura é simplificada — não inclui prova criptográfica de chave privada
 * nesta versão, pois a âncora de integridade é o hash on-chain no contrato Soroban.
 */
export function buildVerifiableCredential(
  dados: CredentialData,
  hash: string,
): object {
  return {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://elociv.org/credentials/v1',
    ],
    type: ['VerifiableCredential', 'EloCivParticipationCredential'],
    issuer: {
      id: `did:stellar:${dados.emissor}`,
      name: 'EloCiv — Sistema de Credenciais Cívicas',
    },
    issuanceDate: dados.emitida_em,
    credentialSubject: {
      // Não há 'id' de sujeito identificável — privacidade do jovem
      tipo: dados.opportunity_tipo,
      atividade: dados.opportunity_titulo,
      instituicao: dados.institution_nome,
      ods: dados.ods,
      municipio_ibge: dados.municipio_id,
      faixa_etaria: dados.faixa_etaria,
      periodo: {
        inicio: dados.periodo_inicio,
        fim: dados.periodo_fim,
      },
    },
    proof: {
      type: 'StellarSorobanAnchor',
      contractId: process.env.ELOCIV_CONTRACT_ID,
      hashAlgorithm: 'SHA-256',
      hash,
    },
  }
}
