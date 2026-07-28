import { AboutSection } from '@/components/landing/AboutSection'
import { HeroSection } from '@/components/landing/HeroSection'
import { PartnersSection } from '@/components/landing/PartnersSection'
import { SolutionSection } from '@/components/landing/SolutionSection'
import { TeamSection } from '@/components/landing/TeamSection'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <SolutionSection />
        <PartnersSection />
        <TeamSection />
      </main>
      <SiteFooter />
    </div>
  )
}
