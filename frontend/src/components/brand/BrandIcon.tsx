import type { ImgHTMLAttributes } from 'react'

export type BrandIconVariant = 'primary' | 'negative'

interface BrandIconProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt'
> {
  variant?: BrandIconVariant
  alt?: string
  showDevelopmentPlaceholder?: boolean
}

const iconPaths: Record<BrandIconVariant, string> = {
  primary: '/brand/icons/elociv-icon-primary.svg',
  negative: '/brand/icons/elociv-icon-negative.svg',
}

export function BrandIcon({
  variant = 'primary',
  alt = 'Ícone oficial da EloCiv',
  className,
  showDevelopmentPlaceholder = true,
  ...imageProps
}: BrandIconProps) {
  if (import.meta.env.DEV && showDevelopmentPlaceholder) {
    return (
      <span
        aria-label="Ícone oficial da EloCiv pendente"
        className={`brand-icon brand-icon--placeholder brand-icon--${variant} ${
          className ?? ''
        }`}
        role="img"
      >
        <span aria-hidden="true" />
      </span>
    )
  }

  return (
    <img
      alt={alt}
      className={`brand-icon brand-icon--${variant} ${className ?? ''}`}
      src={iconPaths[variant]}
      {...imageProps}
    />
  )
}
