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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <DifferentialsSection />
        <BlockchainSection />
        <ImpactSection />
        <PartnersSection />
        <TeamStrip />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
