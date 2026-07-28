import type { TerritoryMetric } from '@/features/territorial-analytics/types/territoryMetric'

export const mockTerritories: TerritoryMetric[] = [
  {
    city: 'Manaus',
    state: 'AM',
    activeOpportunities: 7,
    registeredYouth: 128,
    opportunityDensity: 5.5,
    coveredSdgs: [4, 10, 11, 16],
  },
  {
    city: 'Recife',
    state: 'PE',
    activeOpportunities: 11,
    registeredYouth: 210,
    opportunityDensity: 5.2,
    coveredSdgs: [4, 5, 11, 16],
  },
  {
    city: 'Curitiba',
    state: 'PR',
    activeOpportunities: 9,
    registeredYouth: 176,
    opportunityDensity: 5.1,
    coveredSdgs: [8, 9, 11, 17],
  },
  {
    city: 'Goiânia',
    state: 'GO',
    activeOpportunities: 4,
    registeredYouth: 95,
    opportunityDensity: 4.2,
    coveredSdgs: [10, 11, 16],
  },
  {
    city: 'Belém',
    state: 'PA',
    activeOpportunities: 5,
    registeredYouth: 112,
    opportunityDensity: 4.5,
    coveredSdgs: [4, 13, 15],
  },
]
