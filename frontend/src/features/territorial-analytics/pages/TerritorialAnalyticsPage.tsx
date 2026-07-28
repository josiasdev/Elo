import { useEffect, useState } from 'react'

import { LoadingState } from '@/components/feedback/LoadingState'
import { PageIntro } from '@/components/ui/PageIntro'
import { territorialAnalyticsService } from '@/features/territorial-analytics/services/territorialAnalyticsService'
import type { TerritoryMetric } from '@/features/territorial-analytics/types/territoryMetric'
import { formatSdgs } from '@/lib/formatters'

export default function TerritorialAnalyticsPage() {
  const [metrics, setMetrics] = useState<TerritoryMetric[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    void territorialAnalyticsService.listTerritoryMetrics().then((items) => {
      if (isMounted) {
        setMetrics(items)
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
        title="Painel territorial"
        description="Acompanhe indicadores agregados de oportunidades por cidade e estado."
      />
      {isLoading ? (
        <LoadingState label="Carregando indicadores" />
      ) : (
        <div className="table-wrapper">
          <table>
            <caption>Indicadores demonstrativos por território</caption>
            <thead>
              <tr>
                <th scope="col">Território</th>
                <th scope="col">Oportunidades ativas</th>
                <th scope="col">Jovens registrados</th>
                <th scope="col">Densidade</th>
                <th scope="col">ODS cobertos</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={`${metric.city}-${metric.state}`}>
                  <th scope="row">
                    {metric.city} ({metric.state})
                  </th>
                  <td>{metric.activeOpportunities}</td>
                  <td>{metric.registeredYouth}</td>
                  <td>{metric.opportunityDensity.toFixed(1)}</td>
                  <td>{formatSdgs(metric.coveredSdgs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
