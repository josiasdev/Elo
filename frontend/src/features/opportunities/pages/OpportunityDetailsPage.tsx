import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { LoadingState } from '@/components/feedback/LoadingState'
import { PageIntro } from '@/components/ui/PageIntro'
import { appRoutes } from '@/constants/routes'
import { opportunityService } from '@/features/opportunities/services/opportunityService'
import type { Opportunity } from '@/features/opportunities/types/opportunity'

export default function OpportunityDetailsPage() {
  const { opportunityId } = useParams<{ opportunityId?: string }>()
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    if (opportunityId === undefined) {
      setIsLoading(false)
      return undefined
    }

    void opportunityService.getOpportunityById(opportunityId).then((item) => {
      if (isMounted) {
        setOpportunity(item)
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [opportunityId])

  return (
    <section className="page-section" aria-labelledby="details-title">
      <PageIntro
        title="Detalhes da oportunidade"
        description="Aqui ficarão os detalhes completos, critérios e chamada para manifestação de interesse."
      />
      <div className="content-panel">
        {isLoading ? (
          <LoadingState label="Carregando oportunidade" />
        ) : (
          <>
            <h2 id="details-title">
              {opportunity?.title ?? 'Oportunidade não encontrada'}
            </h2>
            <p>
              Identificador demonstrativo:{' '}
              <code>{opportunityId ?? 'sem identificador'}</code>
            </p>
            <Link className="text-link" to={appRoutes.opportunities}>
              Voltar para oportunidades
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
