import type { BrazilianState, EntityId } from '@/types/common'
import type { OpportunityType } from '@/features/opportunities/types/opportunity'

export type YouthProfileStatus = 'active' | 'inactive' | 'pendingConsent'

export interface YouthProfile {
  id: EntityId
  nickname: string
  birthYear: number
  city: string
  state: BrazilianState
  interests: OpportunityType[]
  status: YouthProfileStatus
}
