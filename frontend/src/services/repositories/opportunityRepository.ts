import { env } from '@/config/env'
import type { Opportunity } from '@/features/opportunities/types/opportunity'
import { delay } from '@/lib/delay'
import { mockOpportunities } from '@/mocks'
import { apiRequest } from '@/services/api/apiClient'

export interface OpportunityRepository {
  listOpportunities(): Promise<Opportunity[]>
  getOpportunityById(opportunityId: string): Promise<Opportunity | null>
}

const mockOpportunityRepository: OpportunityRepository = {
  async listOpportunities() {
    await delay()
    return [...mockOpportunities]
  },
  async getOpportunityById(opportunityId) {
    await delay()
    return (
      mockOpportunities.find((opportunity) => opportunity.id === opportunityId) ?? null
    )
  },
}

const httpOpportunityRepository: OpportunityRepository = {
  listOpportunities() {
    return apiRequest<Opportunity[]>('/opportunities')
  },
  getOpportunityById(opportunityId) {
    return apiRequest<Opportunity | null>(`/opportunities/${opportunityId}`)
  },
}

export const opportunityRepository = env.useMocks
  ? mockOpportunityRepository
  : httpOpportunityRepository
