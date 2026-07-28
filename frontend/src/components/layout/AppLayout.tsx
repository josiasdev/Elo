import type { PropsWithChildren } from 'react'

import { BrandMark, ConnectionPattern, HexagonCluster } from '@/components/brand'
import { AppHeader } from '@/components/layout/AppHeader'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main" id="conteudo-principal" tabIndex={-1}>
        <div className="brand-pattern-layer">
          <ConnectionPattern />
          <HexagonCluster />
        </div>
        <div className="demo-banner" role="note">
          Dados demonstrativos. Nenhuma informação real de adolescente é usada.
        </div>
        {children}
      </main>
      <footer className="app-footer">
        <BrandMark variant="negative" />
        <span>Frontend mockado para integração futura com backend REST.</span>
      </footer>
    </div>
  )
}
