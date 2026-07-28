import { BrandLogo, type BrandLogoVariant } from '@/components/brand/BrandLogo'
import { brandContent } from '@/content/brand-content'

interface BrandMarkProps {
  variant?: BrandLogoVariant
}

export function BrandMark({ variant = 'primary' }: BrandMarkProps) {
  return (
    <div className={`brand-mark brand-mark--${variant}`}>
      <BrandLogo variant={variant} />
      <span className="brand-mark__tagline">{brandContent.tagline.subtitle}</span>
    </div>
  )
}
