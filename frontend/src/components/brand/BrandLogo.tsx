import type { ImgHTMLAttributes } from 'react'

export type BrandLogoVariant = 'primary' | 'negative'

interface BrandLogoProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt'
> {
  variant?: BrandLogoVariant
  alt?: string
  showDevelopmentPlaceholder?: boolean
}

const logoPaths: Record<BrandLogoVariant, string> = {
  primary: '/brand/logos/elociv-logo-primary.svg',
  negative: '/brand/logos/elociv-logo-negative.svg',
}

export function BrandLogo({
  variant = 'primary',
  alt = 'Logotipo oficial da EloCiv',
  className,
  showDevelopmentPlaceholder = true,
  ...imageProps
}: BrandLogoProps) {
  if (import.meta.env.DEV && showDevelopmentPlaceholder) {
    return (
      <span
        aria-label="Logotipo oficial da EloCiv pendente"
        className={`brand-logo brand-logo--placeholder brand-logo--${variant} ${
          className ?? ''
        }`}
        role="img"
      >
        <span className="brand-logo__placeholder-mark" aria-hidden="true" />
        <span>
          <strong>EloCiv</strong>
          <small>logo oficial pendente</small>
        </span>
      </span>
    )
  }

  return (
    <img
      alt={alt}
      className={`brand-logo brand-logo--${variant} ${className ?? ''}`}
      src={logoPaths[variant]}
      {...imageProps}
    />
  )
}
