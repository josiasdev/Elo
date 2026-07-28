import type {
  OpportunityFrequency,
  OpportunityModality,
  OpportunityStatus,
  OpportunityType,
} from '@/features/opportunities/types/opportunity'

export const opportunityTypeLabels: Record<OpportunityType, string> = {
  course: 'Curso',
  workshop: 'Oficina',
  volunteering: 'Voluntariado',
  mentoring: 'Mentoria',
  communityParticipation: 'Participação comunitária',
}

export const opportunityFrequencyLabels: Record<OpportunityFrequency, string> = {
  oneTime: 'Pontual',
  weekly: 'Semanal',
  biweekly: 'Quinzenal',
  monthly: 'Mensal',
}

export const opportunityModalityLabels: Record<OpportunityModality, string> = {
  inPerson: 'Presencial',
  online: 'Online',
  hybrid: 'Híbrida',
}

export const opportunityStatusLabels: Record<OpportunityStatus, string> = {
  draft: 'Rascunho',
  active: 'Ativa',
  closed: 'Encerrada',
  cancelled: 'Cancelada',
}
