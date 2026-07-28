import { BrandLogo } from '@/components/brand'
import { AppNavigation } from '@/components/layout/AppNavigation'
import { brandContent } from '@/content/brand-content'

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__brand" aria-label="EloCiv">
        <BrandLogo variant="primary" />
        <span className="app-header__subtitle">{brandContent.tagline.subtitle}</span>
      </div>
      <AppNavigation />
    </header>
  )
}
