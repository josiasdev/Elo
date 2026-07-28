import { useEffect, useState } from 'react'

import { LoadingState } from '@/components/feedback/LoadingState'
import { PageIntro } from '@/components/ui/PageIntro'
import { institutionService } from '@/features/institutions/services/institutionService'
import type { Institution } from '@/features/institutions/types/institution'
import { formatSdgs } from '@/lib/formatters'

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void institutionService.listInstitutions().then((items) => {
      if (isMounted) {
        setInstitutions(items)
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="page-section">
      <PageIntro
        title="Instituições"
        description="Instituições fictícias que poderão cadastrar oportunidades e emitir credenciais pelo backend."
      />
      {isLoading ? (
        <LoadingState label="Carregando instituições" />
      ) : (
        <div className="card-grid">
          {institutions.map((institution) => (
            <article className="data-card" key={institution.id}>
              <p className="eyebrow">{institution.verificationStatus}</p>
              <h2>{institution.name}</h2>
              <p>{institution.description}</p>
              <p>
                {institution.city} ({institution.state})
              </p>
              <p className="muted-text">{formatSdgs(institution.relatedSdgs)}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
