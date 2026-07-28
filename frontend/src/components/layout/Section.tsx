import type { PropsWithChildren } from 'react'

import clsx from 'clsx'

type SectionTone = 'canvas' | 'surface' | 'inverse' | 'accent'

interface SectionProps extends PropsWithChildren {
  id?: string
  className?: string
  tone?: SectionTone
  labelledBy?: string
}

export function Section({
  children,
  className,
  id,
  labelledBy,
  tone = 'canvas',
}: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={clsx('landing-section', `landing-section--${tone}`, className)}
      id={id}
    >
      {children}
    </section>
  )
}
