import { env } from '@/config/env'
import type { TerritoryMetric } from '@/features/territorial-analytics/types/territoryMetric'
import { delay } from '@/lib/delay'
import { mockTerritories } from '@/mocks'
import { apiRequest } from '@/services/api/apiClient'

export interface TerritorialAnalyticsRepository {
  listTerritoryMetrics(): Promise<TerritoryMetric[]>
}

const mockTerritorialAnalyticsRepository: TerritorialAnalyticsRepository = {
  async listTerritoryMetrics() {
    await delay()
    return [...mockTerritories]
  },
}

const httpTerritorialAnalyticsRepository: TerritorialAnalyticsRepository = {
  listTerritoryMetrics() {
    return apiRequest<TerritoryMetric[]>('/territories/metrics')
  },
}

export const territorialAnalyticsRepository = env.useMocks
  ? mockTerritorialAnalyticsRepository
  : httpTerritorialAnalyticsRepository
