import { api } from '@/lib/api'
import type { BackendOpportunity } from '@/adapters/opportunity.adapter'

export type OpportunitiesFilters = {
  municipio_id?: string
  tipo?: string
  modalidade?: string
  faixa_etaria?: string
  ods?: number
  page?: number
  limit?: number
}

export type PaginatedOpportunities = {
  data: BackendOpportunity[]
  total: number
  page: number
  limit: number
}

export async function fetchOpportunities(
  filters: OpportunitiesFilters = {},
): Promise<BackendOpportunity[]> {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.set(key, String(value))
    }
  })

  const query = params.toString()
  const path = `/opportunities${query ? `?${query}` : ''}`

  const result = await api.get<PaginatedOpportunities | BackendOpportunity[]>(path)

  // O backend pode retornar array ou objeto paginado
  if (Array.isArray(result)) return result
  return (result as PaginatedOpportunities).data
}
