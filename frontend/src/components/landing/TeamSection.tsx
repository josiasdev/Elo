import { BrandSectionHeading, HexagonCluster } from '@/components/brand'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { landingContent } from '@/content/landing-content'
import { teamMembers } from '@/content/team'
import { TeamMemberCard } from '@/components/landing/TeamMemberCard'

export function TeamSection() {
  const { team } = landingContent
  const hasMembers = teamMembers.length > 0

  return (
    <Section id="time" labelledBy="team-title" tone="accent">
      <Container className="team-section" size="wide">
        <div className="team-section__heading">
          <BrandSectionHeading
            description={team.description}
            eyebrow={team.eyebrow}
            level={2}
            title={team.title}
          />
          <HexagonCluster />
        </div>

        {hasMembers ? (
          <div className="team-section__grid">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="landing-empty-state landing-empty-state--light">
            <strong>Conteúdo pendente</strong>
            <p>{team.emptyState}</p>
          </div>
        )}
      </Container>
    </Section>
  )
}
