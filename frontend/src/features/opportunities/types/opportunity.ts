import type { BrazilianState, EntityId, SdgNumber } from '@/types/common'

export type OpportunityType =
  'course' | 'workshop' | 'volunteering' | 'mentoring' | 'communityParticipation'

export type OpportunityFrequency = 'oneTime' | 'weekly' | 'biweekly' | 'monthly'

export type OpportunityModality = 'inPerson' | 'online' | 'hybrid'

export type OpportunityStatus = 'draft' | 'active' | 'closed' | 'cancelled'

export interface AgeGroup {
  min: number
  max: number
}

export interface Opportunity {
  id: EntityId
  institutionId: EntityId
  title: string
  description: string
  type: OpportunityType
  targetAgeGroup: AgeGroup
  frequency: OpportunityFrequency
  modality: OpportunityModality
  city: string
  state: BrazilianState
  startDate: string
  endDate: string
  status: OpportunityStatus
  relatedSdgs: SdgNumber[]
}
