import { territorialAnalyticsRepository } from '@/services/repositories/territorialAnalyticsRepository'

export const territorialAnalyticsService = {
  listTerritoryMetrics: () => territorialAnalyticsRepository.listTerritoryMetrics(),
}
