import { useEffect } from 'react'
import { SiteHeader } from '@/components/layout/site-header'
import { HeroSection } from '@/components/home/hero-section'
import { ProblemSection } from '@/components/home/problem-section'
import { SolutionSection } from '@/components/home/solution-section'
import { DifferentialsSection } from '@/components/home/differentials-section'
import { BlockchainSection } from '@/components/home/blockchain-section'
import { ImpactSection } from '@/components/home/impact-section'
import { PartnersSection } from '@/components/home/partners-section'
import { TeamStrip } from '@/components/home/team-strip'
import { FinalCtaSection } from '@/components/home/final-cta-section'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  OpportunitiesPage,
  OpportunityDetailPlaceholder,
} from '@/pages/OpportunitiesPage'

type AppRoute =
  | { kind: 'home' }
  | { kind: 'opportunities' }
  | { kind: 'opportunity-detail'; slug: string }

function getCurrentRoute(): AppRoute {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname === '/oportunidades') {
    return { kind: 'opportunities' }
  }

  if (pathname.startsWith('/oportunidades/')) {
    const slug = decodeURIComponent(pathname.replace('/oportunidades/', ''))
    return { kind: 'opportunity-detail', slug }
  }

  return { kind: 'home' }
}

function setMetaDescription(content: string) {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')

  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'description'
    document.head.appendChild(meta)
  }

  meta.content = content
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <DifferentialsSection />
      <BlockchainSection />
      <ImpactSection />
      <PartnersSection />
      <TeamStrip />
      <FinalCtaSection />
    </>
  )
}

export default function App() {
  const route = getCurrentRoute()

  useEffect(() => {
    if (route.kind === 'opportunities') {
      document.title = 'Oportunidades — EloCiv'
      setMetaDescription(
        'Explore cursos, oficinas, mentorias, voluntariado e ações comunitárias para jovens na plataforma EloCiv.',
      )
      return
    }

    if (route.kind === 'opportunity-detail') {
      document.title = 'Detalhes em construção — EloCiv'
      setMetaDescription(
        'Página temporária de detalhes de oportunidade da plataforma EloCiv.',
      )
      return
    }

    document.title = 'EloCiv — O elo da cidadania jovem'
    setMetaDescription(
      'Encontre oportunidades no seu território, registre sua participação e construa uma trajetória cívica segura, portátil e verificável.',
    )
  }, [route])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <SiteHeader />
      <main className="flex-1">
        {route.kind === 'home' && <HomePage />}
        {route.kind === 'opportunities' && <OpportunitiesPage />}
        {route.kind === 'opportunity-detail' && (
          <OpportunityDetailPlaceholder slug={route.slug} />
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
