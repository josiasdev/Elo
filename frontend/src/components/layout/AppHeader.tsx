import { AppNavigation } from '@/components/layout/AppNavigation'

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__brand" aria-label="EloCiv">
        <span className="app-header__name">EloCiv</span>
        <span className="app-header__subtitle">O elo da cidadania jovem</span>
      </div>
      <AppNavigation />
    </header>
  )
}
