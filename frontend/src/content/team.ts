export interface TeamMember {
  id: string
  name: string
  role: string
  description?: string
  imageSrc?: string
  socialUrl?: string
}

export const teamMembers: TeamMember[] = []
