import { useEffect, useState } from 'react'
import { findCredentialBySlug } from '@/data/credentials'
import type { CivicCredential } from '@/data/credentials'
import { fetchCredentialVerification } from '@/services/credentials'
import { adaptCredential } from '@/adapters/credential.adapter'
import type { OnChainStatus } from '@/adapters/credential.adapter'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'

export type UseCredentialResult = {
  credential: CivicCredential | null
  onChainStatus: OnChainStatus | null
  loading: boolean
  error: string | null
}

export function useCredential(slug: string): UseCredentialResult {
  const [credential, setCredential] = useState<CivicCredential | null>(null)
  const [onChainStatus, setOnChainStatus] = useState<OnChainStatus | null>(null)
  const [loading, setLoading] = useState(!USE_MOCKS)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (USE_MOCKS) {
      const found = findCredentialBySlug(slug) ?? null
      setCredential(found)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    // O slug no frontend pode conter o ID embutido (últimos 8 chars)
    // Tenta extrair o ID da credencial a partir do slug
    const idFromSlug = slug.split('-').pop() ?? slug

    fetchCredentialVerification(idFromSlug)
      .then(({ credential: raw, on_chain }) => {
        if (!cancelled) {
          setCredential(adaptCredential(raw, 0))
          setOnChainStatus(on_chain)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          // Fallback para mock local
          const found = findCredentialBySlug(slug) ?? null
          setCredential(found)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { credential, onChainStatus, loading, error }
}
