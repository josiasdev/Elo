import type { Participation } from '@/features/youth-profile/types/participation'

export const mockParticipations: Participation[] = [
  {
    id: 'part-demo-001',
    youthId: 'youth-demo-001',
    opportunityId: 'opp-cidadania-digital-manaus',
    status: 'completed',
    interestRegisteredAt: '2026-07-12T14:20:00.000Z',
    confirmedAt: '2026-07-14T10:00:00.000Z',
  },
  {
    id: 'part-demo-002',
    youthId: 'youth-demo-001',
    opportunityId: 'opp-oficina-radio-recife',
    status: 'confirmed',
    interestRegisteredAt: '2026-07-15T19:10:00.000Z',
    confirmedAt: '2026-07-18T12:30:00.000Z',
  },
  {
    id: 'part-demo-003',
    youthId: 'youth-demo-001',
    opportunityId: 'opp-mentoria-dados-curitiba',
    status: 'interestRegistered',
    interestRegisteredAt: '2026-07-19T16:40:00.000Z',
    confirmedAt: null,
  },
]
