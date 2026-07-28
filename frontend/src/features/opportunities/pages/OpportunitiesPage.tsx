import { useEffect, useState } from 'react'

import { LoadingState } from '@/components/feedback/LoadingState'
import { PageIntro } from '@/components/ui/PageIntro'
import { OpportunityCard } from '@/features/opportunities/components/OpportunityCard'
import { opportunityService } from '@/features/opportunities/services/opportunityService'
import type { Opportunity } from '@/features/opportunities/types/opportunity'

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void opportunityService.listOpportunities().then((items) => {
      if (isMounted) {
        setOpportunities(items)
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="page-section" aria-labelledby="opportunities-title">
      <PageIntro
        title="Oportunidades"
        description="Descubra cursos, oficinas, voluntariado, mentorias e espaços de participação comunitária."
      />
      <h2 className="section-title" id="opportunities-title">
        Oportunidades demonstrativas
      </h2>
      {isLoading ? (
        <LoadingState label="Carregando oportunidades" />
      ) : (
        <div className="card-grid">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}
    </section>
  )
}
