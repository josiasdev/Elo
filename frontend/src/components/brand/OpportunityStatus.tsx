import type { OpportunityAvailability } from '@/theme'

import { Hexagon } from '@/components/brand/Hexagon'

interface OpportunityStatusProps {
  status: OpportunityAvailability
}

const statusContent: Record<
  OpportunityAvailability,
  { label: string; detail: string; pattern: string }
> = {
  none: {
    label: 'Nenhuma oportunidade',
    detail: 'Sem preenchimento',
    pattern: '0',
  },
  scarce: {
    label: 'Oportunidades escassas',
    detail: 'Poucas conexões ativas',
    pattern: '1-2',
  },
  available: {
    label: 'Oportunidades disponíveis',
    detail: 'Rede ativa',
    pattern: '3+',
  },
}

export function OpportunityStatus({ status }: OpportunityStatusProps) {
  const content = statusContent[status]

  return (
    <span
      aria-label={`${content.label}: ${content.detail}`}
      className={`opportunity-status opportunity-status--${status}`}
      role="img"
    >
      <Hexagon decorative status={status} />
      <span className="opportunity-status__content">
        <span className="opportunity-status__label">{content.label}</span>
        <span className="opportunity-status__detail">{content.pattern}</span>
      </span>
    </span>
  )
}
