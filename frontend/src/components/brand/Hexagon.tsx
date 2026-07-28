import type { OpportunityAvailability } from '@/theme'

interface HexagonProps {
  status?: OpportunityAvailability
  label?: string
  size?: 'sm' | 'md' | 'lg'
  decorative?: boolean
}

export function Hexagon({
  status = 'available',
  label,
  size = 'md',
  decorative = true,
}: HexagonProps) {
  return (
    <svg
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : label}
      className={`hexagon hexagon--${status} hexagon--${size}`}
      role={decorative ? undefined : 'img'}
      viewBox="0 0 100 88"
    >
      <polygon points="25 2 75 2 99 44 75 86 25 86 1 44" />
    </svg>
  )
}
