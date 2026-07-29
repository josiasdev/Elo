import { api } from '@/lib/api'

export type TerritoryAnalytics = {
  municipio_id: string
  municipio_nome: string
  uf: string
  regiao: string
  total_oportunidades: number
  ods_cobertos: number[]
  ods_ausentes: number[]
}

export type AnalyticsResponse = {
  territories: TerritoryAnalytics[]
  totals: {
    presencial: number
    online: number
    municipios_ativos: number
  }
}

export async function fetchTerritorialAnalytics(): Promise<AnalyticsResponse> {
  return api.get<AnalyticsResponse>('/analytics/territories')
}
