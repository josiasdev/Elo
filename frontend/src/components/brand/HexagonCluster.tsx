import type { OpportunityAvailability } from '@/theme'

import { Hexagon } from '@/components/brand/Hexagon'

interface HexagonClusterProps {
  status?: OpportunityAvailability
  decorative?: boolean
  label?: string
}

export function HexagonCluster({
  status = 'available',
  decorative = true,
  label = 'Rede de oportunidades representada por hexágonos',
}: HexagonClusterProps) {
  return (
    <div
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : label}
      className={`hexagon-cluster hexagon-cluster--${status}`}
      role={decorative ? undefined : 'img'}
    >
      <Hexagon size="md" status={status} />
      <Hexagon size="sm" status="scarce" />
      <Hexagon size="sm" status="none" />
      <Hexagon size="lg" status="available" />
      <Hexagon size="sm" status={status} />
    </div>
  )
}
