import type { BrazilianState, EntityId, SdgNumber } from '@/types/common'

export type InstitutionCategory =
  'ngo' | 'school' | 'publicAgency' | 'collective' | 'socialBusiness'

export type InstitutionVerificationStatus = 'pending' | 'verified' | 'rejected'

export interface Institution {
  id: EntityId
  name: string
  category: InstitutionCategory
  description: string
  city: string
  state: BrazilianState
  verificationStatus: InstitutionVerificationStatus
  relatedSdgs: SdgNumber[]
}
