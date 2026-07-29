import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type BrandLogoVariant = 'primary' | 'negative'

export interface BrandLogoProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BrandLogoVariant
  size?: 'sm' | 'md' | 'lg'
}

export function BrandLogo({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: BrandLogoProps) {
  const isNegative = variant === 'negative'
  const logoSrc = isNegative
    ? '/brand/logos/logo-negativa.png'
    : '/brand/logos/logo-principal.png'

  return (
    <div
      className={cn('inline-flex items-center select-none', className)}
      {...props}
    >
      <img
        src={logoSrc}
        alt="EloCiv — O elo da cidadania jovem"
        className={cn(
          'w-auto object-contain transition-transform duration-200',
          size === 'sm' && 'h-7 sm:h-8',
          size === 'md' && 'h-10 sm:h-12',
          size === 'lg' && 'h-14 sm:h-16',
        )}
      />
    </div>
  )
}
