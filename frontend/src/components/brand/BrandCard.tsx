import type { PropsWithChildren } from 'react'

interface BrandCardProps extends PropsWithChildren {
  className?: string
  tone?: 'default' | 'blue' | 'yellow' | 'pink'
}

export function BrandCard({ children, className, tone = 'default' }: BrandCardProps) {
  return (
    <article className={`brand-card brand-card--${tone} ${className ?? ''}`}>
      {children}
    </article>
  )
}
