import type { EntityId } from '@/types/common'

export type ParticipationStatus =
  'interestRegistered' | 'confirmed' | 'completed' | 'cancelled'

export interface Participation {
  id: EntityId
  youthId: EntityId
  opportunityId: EntityId
  status: ParticipationStatus
  interestRegisteredAt: string
  confirmedAt: string | null
}
