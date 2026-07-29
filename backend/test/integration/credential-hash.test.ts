import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createHash } from 'crypto'
import { hashCredential, type CredentialData } from '../../src/services/credential.js'

/**
 * Testa o contrato de hashing canônico — a garantia mais crítica do sistema.
 * RNF08: hash deve ser calculado sobre representação canônica e reproduzível.
 */
describe('Credential Service — hash canônico SHA-256', () => {
  const dadosBase: CredentialData = {
    institution_id: 'inst-001',
    institution_nome: 'Instituto Filadélfia da Amazônia',
    opportunity_titulo: 'Curso de Tecnologia e Inovação Social',
    opportunity_tipo: 'CURSO_PROFISSIONALIZANTE',
    ods: [4, 10],
    faixa_etaria: '15-17',
    periodo_inicio: '2026-08-01T00:00:00.000Z',
    periodo_fim: '2026-10-31T00:00:00.000Z',
    municipio_id: '1302603',
    emitida_em: '2026-11-01T12:00:00.000Z',
    emissor: 'GADM1NADDRESSEXAMPLE',
  }

  it('gera o mesmo hash para os mesmos dados (reprodutibilidade)', () => {
    const hash1 = hashCredential(dadosBase)
    const hash2 = hashCredential({ ...dadosBase })
    expect(hash1).toBe(hash2)
  })

  it('gera hashes diferentes para dados diferentes', () => {
    const hash1 = hashCredential(dadosBase)
    const hash2 = hashCredential({ ...dadosBase, opportunity_titulo: 'Outro Curso' })
    expect(hash1).not.toBe(hash2)
  })

  it('o hash tem 64 caracteres hexadecimais (SHA-256 = 32 bytes)', () => {
    const hash = hashCredential(dadosBase)
    expect(hash).toHaveLength(64)
    expect(hash).toMatch(/^[a-f0-9]{64}$/)
  })

  it('a ordem dos campos no objeto de entrada não afeta o hash (canonicidade)', () => {
    // Reconstrói o objeto com campos em ordem diferente
    const dadosReordenados: CredentialData = {
      emissor: dadosBase.emissor,
      municipio_id: dadosBase.municipio_id,
      emitida_em: dadosBase.emitida_em,
      periodo_fim: dadosBase.periodo_fim,
      periodo_inicio: dadosBase.periodo_inicio,
      faixa_etaria: dadosBase.faixa_etaria,
      ods: dadosBase.ods,
      opportunity_tipo: dadosBase.opportunity_tipo,
      opportunity_titulo: dadosBase.opportunity_titulo,
      institution_nome: dadosBase.institution_nome,
      institution_id: dadosBase.institution_id,
    }

    const hash1 = hashCredential(dadosBase)
    const hash2 = hashCredential(dadosReordenados)
    expect(hash1).toBe(hash2)
  })

  it('alterar qualquer campo muda o hash (integridade)', () => {
    const campos: (keyof CredentialData)[] = [
      'institution_id',
      'institution_nome',
      'opportunity_titulo',
      'municipio_id',
      'emissor',
    ]
    const hashBase = hashCredential(dadosBase)

    for (const campo of campos) {
      const modificado = { ...dadosBase, [campo]: dadosBase[campo] + '_ALTERADO' }
      expect(hashCredential(modificado)).not.toBe(hashBase)
    }
  })
})
