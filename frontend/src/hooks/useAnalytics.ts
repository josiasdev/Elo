import { useEffect, useState } from 'react'
import {
  stateOpportunityData,
  remoteOpportunityCategories,
  mapTotals,
  type StateOpportunityData,
} from '@/data/opportunity-map-data'
import { fetchTerritorialAnalytics } from '@/services/analytics'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'

export type UseAnalyticsResult = {
  stateData: StateOpportunityData[]
  remoteCategories: { label: string; count: number }[]
  totals: { inPerson: number; remote: number; representedStates: string }
  loading: boolean
  error: string | null
}

export function useAnalytics(): UseAnalyticsResult {
  const [stateData, setStateData] = useState<StateOpportunityData[]>(stateOpportunityData)
  const [remoteCategories] = useState(remoteOpportunityCategories)
  const [totals, setTotals] = useState(mapTotals)
  const [loading, setLoading] = useState(!USE_MOCKS)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (USE_MOCKS) return

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchTerritorialAnalytics()
      .then((analytics) => {
        if (!cancelled) {
          // Agrupa por UF para o mapa de estados
          const byUf = new Map<string, StateOpportunityData>()

          analytics.territories.forEach((t) => {
            const existing = byUf.get(t.uf)
            const mockEntry = stateOpportunityData.find((s) => s.uf === t.uf)

            if (!mockEntry) return // Estado sem coordenadas no mock — ignora

            if (existing) {
              existing.count += t.total_oportunidades
            } else {
              byUf.set(t.uf, {
                ...mockEntry,
                count: t.total_oportunidades,
                ods: t.ods_cobertos,
              })
            }
          })

          // Mantém estados do mock que não têm dados reais
          const merged = stateOpportunityData.map(
            (s) => byUf.get(s.uf) ?? s,
          )

          setStateData(merged)
          setTotals({
            inPerson: analytics.totals.presencial,
            remote: analytics.totals.online,
            representedStates: `${analytics.totals.municipios_ativos} municípios`,
          })
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          // Mantém dados mock em caso de erro
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { stateData, remoteCategories, totals, loading, error }
}
