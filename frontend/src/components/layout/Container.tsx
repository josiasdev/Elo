import type { PropsWithChildren } from 'react'

import clsx from 'clsx'

interface ContainerProps extends PropsWithChildren {
  className?: string
  size?: 'default' | 'wide'
}

export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div className={clsx('site-container', `site-container--${size}`, className)}>
      {children}
    </div>
  )
}
