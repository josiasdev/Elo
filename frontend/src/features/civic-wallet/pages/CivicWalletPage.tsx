import { useEffect, useState } from 'react'

import { LoadingState } from '@/components/feedback/LoadingState'
import { PageIntro } from '@/components/ui/PageIntro'
import { credentialService } from '@/features/civic-wallet/services/credentialService'
import type { Credential } from '@/features/civic-wallet/types/credential'
import { formatDate } from '@/lib/formatters'

export default function CivicWalletPage() {
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void credentialService.listCredentials().then((items) => {
      if (isMounted) {
        setCredentials(items)
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
        title="Carteira cívica"
        description="Visualize credenciais verificáveis emitidas por instituições participantes."
      />
      {isLoading ? (
        <LoadingState label="Carregando credenciais" />
      ) : (
        <div className="card-grid">
          {credentials.map((credential) => (
            <article className="data-card" key={credential.id}>
              <p className="eyebrow">{credential.verificationStatus}</p>
              <h2>{credential.activityTitle}</h2>
              <p>Emitida por {credential.issuerName}</p>
              <p>Emissão prevista: {formatDate(credential.issuedAt)}</p>
              <p className="muted-text">
                Hash demonstrativo: {credential.credentialHash}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
