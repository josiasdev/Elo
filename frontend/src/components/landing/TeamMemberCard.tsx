import { UserRound } from 'lucide-react'

import type { TeamMember } from '@/content/team'

interface TeamMemberCardProps {
  member: TeamMember
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className="team-member-card">
      <div className="team-member-card__media">
        {member.imageSrc ? (
          <img alt={`Foto de ${member.name}`} loading="lazy" src={member.imageSrc} />
        ) : (
          <UserRound aria-hidden="true" size={32} />
        )}
      </div>
      <div>
        <h3>{member.name}</h3>
        <p className="team-member-card__role">{member.role}</p>
        {member.description ? <p>{member.description}</p> : null}
        {member.socialUrl ? (
          <a href={member.socialUrl} rel="noreferrer" target="_blank">
            Perfil público
          </a>
        ) : null}
      </div>
    </article>
  )
}
