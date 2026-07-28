import { ArrowRight, CheckCircle2 } from 'lucide-react'

import {
  BrandBadge,
  BrandButton,
  ConnectionPattern,
  HexagonCluster,
  OpportunityStatus,
} from '@/components/brand'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { landingContent } from '@/content/landing-content'

export function HeroSection() {
  const { hero } = landingContent

  return (
    <Section className="hero-section" id="hero" labelledBy="hero-title">
      <Container className="hero-section__grid" size="wide">
        <div className="hero-section__content">
          <BrandBadge tone="blue">{hero.eyebrow}</BrandBadge>
          <div className="hero-section__copy">
            <h1 id="hero-title">{hero.title}</h1>
            <p className="hero-section__subtitle">{hero.subtitle}</p>
            <p>{hero.description}</p>
          </div>
          <div className="hero-section__actions">
            <BrandButton href={hero.primaryAction.href} variant="primary">
              {hero.primaryAction.label}
              <ArrowRight aria-hidden="true" size={18} />
            </BrandButton>
            <BrandButton to={hero.secondaryAction.href} variant="ghost">
              {hero.secondaryAction.label}
            </BrandButton>
          </div>
        </div>

        <div className="hero-visual" aria-label="Resumo visual da plataforma EloCiv">
          <ConnectionPattern />
          <div className="hero-visual__panel hero-visual__panel--primary">
            <div>
              <span className="hero-visual__label">Território</span>
              <strong>Rede de oportunidades</strong>
            </div>
            <HexagonCluster />
          </div>

          <div className="hero-visual__panel hero-visual__panel--floating">
            <span className="hero-visual__label">Status</span>
            <OpportunityStatus status="available" />
            <OpportunityStatus status="scarce" />
          </div>

          <div className="hero-visual__card">
            <CheckCircle2 aria-hidden="true" size={22} />
            <div>
              <strong>Participação confirmada</strong>
              <span>Essa experiência agora faz parte da sua trajetória.</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
