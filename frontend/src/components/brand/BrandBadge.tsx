import type { PropsWithChildren } from 'react'

interface BrandBadgeProps extends PropsWithChildren {
  tone?: 'blue' | 'yellow' | 'pink' | 'plum'
}

export function BrandBadge({ children, tone = 'blue' }: BrandBadgeProps) {
  return <span className={`brand-badge brand-badge--${tone}`}>{children}</span>
}
