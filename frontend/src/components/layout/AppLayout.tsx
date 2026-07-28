import type { PropsWithChildren } from 'react'

import { AppHeader } from '@/components/layout/AppHeader'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main" id="conteudo-principal" tabIndex={-1}>
        <div className="demo-banner" role="note">
          Dados demonstrativos. Nenhuma informação real de adolescente é usada.
        </div>
        {children}
      </main>
      <footer className="app-footer">
        <span>EloCiv</span>
        <span>Frontend mockado para integração futura com backend REST.</span>
      </footer>
    </div>
  )
}
