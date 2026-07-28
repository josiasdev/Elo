import type { BrazilianState, SdgNumber } from '@/types/common'

export interface TerritoryMetric {
  city: string
  state: BrazilianState
  activeOpportunities: number
  registeredYouth: number
  opportunityDensity: number
  coveredSdgs: SdgNumber[]
}
