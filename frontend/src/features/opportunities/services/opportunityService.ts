import { opportunityRepository } from '@/services/repositories/opportunityRepository'

export const opportunityService = {
  listOpportunities: () => opportunityRepository.listOpportunities(),
  getOpportunityById: (opportunityId: string) =>
    opportunityRepository.getOpportunityById(opportunityId),
}
