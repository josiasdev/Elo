import { BrandSectionHeading } from '@/components/brand'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { landingContent } from '@/content/landing-content'
import { partners } from '@/content/partners'
import { PartnerLogo } from '@/components/landing/PartnerLogo'

export function PartnersSection() {
  const { partners: partnersContent } = landingContent
  const hasPartners = partners.length > 0

  return (
    <Section id="parceiros" labelledBy="partners-title" tone="canvas">
      <Container className="partners-section" size="wide">
        <BrandSectionHeading
          description={partnersContent.description}
          eyebrow={partnersContent.eyebrow}
          level={2}
          title={partnersContent.title}
        />

        {hasPartners ? (
          <div className="partners-section__grid">
            {partners.map((partner) => (
              <PartnerLogo key={partner.id} partner={partner} />
            ))}
          </div>
        ) : (
          <div className="landing-empty-state">
            <strong>Assets pendentes</strong>
            <p>{partnersContent.emptyState}</p>
          </div>
        )}
      </Container>
    </Section>
  )
}
