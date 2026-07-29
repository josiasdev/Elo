import { useEffect, useState } from 'react'
import { opportunities as mockOpportunities } from '@/data/opportunities'
import type { Opportunity } from '@/data/opportunities'
import { fetchOpportunities } from '@/services/opportunities'
import { adaptOpportunities } from '@/adapters/opportunity.adapter'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'

export type UseOpportunitiesResult = {
  data: Opportunity[]
  loading: boolean
  error: string | null
}

export function useOpportunities(): UseOpportunitiesResult {
  const [data, setData] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(!USE_MOCKS)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (USE_MOCKS) {
      setData(mockOpportunities)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchOpportunities({ limit: 100 })
      .then((raw) => {
        if (!cancelled) {
          setData(adaptOpportunities(raw))
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          // Em caso de erro, exibe os mocks como fallback
          setData(mockOpportunities)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
