import { BrandCard, BrandSectionHeading, HexagonCluster } from '@/components/brand'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { landingContent } from '@/content/landing-content'

export function AboutSection() {
  const { about } = landingContent

  return (
    <Section id="sobre" labelledBy="about-title" tone="surface">
      <Container className="landing-split" size="wide">
        <div className="landing-split__intro">
          <BrandSectionHeading
            description={about.description}
            eyebrow={about.eyebrow}
            level={2}
            title={about.title}
          />
          <p>
            Muitas experiências juvenis acontecem nos territórios, mas não viram
            histórico reconhecido. Ao mesmo tempo, oportunidades não chegam de forma
            igual e a falta de dados dificulta a priorização.
          </p>
        </div>

        <div className="about-section__cards">
          {about.highlights.map((highlight) => (
            <BrandCard className="about-section__card" key={highlight.title}>
              <HexagonCluster />
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </BrandCard>
          ))}
        </div>
      </Container>
    </Section>
  )
}
