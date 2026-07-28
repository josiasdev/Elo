import type { LucideIcon } from 'lucide-react'

import { BrandSectionHeading, ConnectionPattern } from '@/components/brand'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { landingContent } from '@/content/landing-content'

interface SolutionStepCardProps {
  index: number
  title: string
  description: string
  icon: LucideIcon
}

function SolutionStepCard({
  description,
  icon: Icon,
  index,
  title,
}: SolutionStepCardProps) {
  return (
    <article className="solution-step">
      <div className="solution-step__icon">
        <Icon aria-hidden="true" size={24} />
      </div>
      <span className="solution-step__number">{String(index).padStart(2, '0')}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}

export function SolutionSection() {
  const { solution } = landingContent

  return (
    <Section id="solucao" labelledBy="solution-title" tone="inverse">
      <Container className="solution-section" size="wide">
        <div className="solution-section__heading">
          <BrandSectionHeading
            description={solution.description}
            eyebrow={solution.eyebrow}
            level={2}
            title={solution.title}
          />
          <ConnectionPattern />
        </div>

        <div className="solution-section__grid">
          {solution.steps.map((step, index) => (
            <SolutionStepCard
              description={step.description}
              icon={step.icon}
              index={index + 1}
              key={step.title}
              title={step.title}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
