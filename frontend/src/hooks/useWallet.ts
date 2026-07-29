import { useEffect, useState } from 'react'
import { credentials as mockCredentials } from '@/data/credentials'
import type { CivicCredential } from '@/data/credentials'
import { fetchPublicWallet } from '@/services/wallet'
import { adaptCredentials } from '@/adapters/credential.adapter'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'

// Slug da jovem demo que a Carteira Cívica exibe por padrão
const DEMO_WALLET_SLUG = 'ana-bs'

export type UseWalletResult = {
  credentials: CivicCredential[]
  loading: boolean
  error: string | null
}

export function useWallet(slug: string = DEMO_WALLET_SLUG): UseWalletResult {
  const [credentials, setCredentials] = useState<CivicCredential[]>([])
  const [loading, setLoading] = useState(!USE_MOCKS)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (USE_MOCKS) {
      setCredentials(mockCredentials)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchPublicWallet(slug)
      .then((wallet) => {
        if (!cancelled) {
          setCredentials(adaptCredentials(wallet.credentials))
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          // Fallback para mocks em caso de erro
          setCredentials(mockCredentials)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { credentials, loading, error }
}
