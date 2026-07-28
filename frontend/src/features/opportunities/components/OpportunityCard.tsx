import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { BrandBadge, BrandCard } from '@/components/brand'
import {
  opportunityFrequencyLabels,
  opportunityModalityLabels,
  opportunityStatusLabels,
  opportunityTypeLabels,
} from '@/constants/opportunityTypes'
import type { Opportunity } from '@/features/opportunities/types/opportunity'
import { formatDate, formatSdgs } from '@/lib/formatters'

interface OpportunityCardProps {
  opportunity: Opportunity
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <BrandCard className="data-card">
      <div className="data-card__header">
        <div>
          <BrandBadge tone="blue">{opportunityTypeLabels[opportunity.type]}</BrandBadge>
          <h2>{opportunity.title}</h2>
        </div>
        <span className={clsx('status-pill', `status-pill--${opportunity.status}`)}>
          {opportunityStatusLabels[opportunity.status]}
        </span>
      </div>
      <p>{opportunity.description}</p>
      <dl className="metadata-list">
        <div>
          <dt>Território</dt>
          <dd>
            {opportunity.city} ({opportunity.state})
          </dd>
        </div>
        <div>
          <dt>Modalidade</dt>
          <dd>{opportunityModalityLabels[opportunity.modality]}</dd>
        </div>
        <div>
          <dt>Frequência</dt>
          <dd>{opportunityFrequencyLabels[opportunity.frequency]}</dd>
        </div>
        <div>
          <dt>Período</dt>
          <dd>
            {formatDate(opportunity.startDate)} a {formatDate(opportunity.endDate)}
          </dd>
        </div>
        <div>
          <dt>Faixa etária</dt>
          <dd>
            {opportunity.targetAgeGroup.min} a {opportunity.targetAgeGroup.max} anos
          </dd>
        </div>
        <div>
          <dt>ODS relacionados</dt>
          <dd>{formatSdgs(opportunity.relatedSdgs)}</dd>
        </div>
      </dl>
      <Link className="text-link" to={`/oportunidades/${opportunity.id}`}>
        Ver detalhes
      </Link>
    </BrandCard>
  )
}
