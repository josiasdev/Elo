import { BrandButton } from '@/components/brand'
import { PageIntro } from '@/components/ui/PageIntro'

export default function AdminPage() {
  return (
    <section className="page-section">
      <PageIntro
        title="Administração"
        description="Área futura para gestão de oportunidades, instituições e emissão por fluxos do backend."
      />
      <div className="content-panel">
        <h2>Console administrativo</h2>
        <p>
          Este placeholder não executa operações de backend, smart contract ou
          assinatura de transações.
        </p>
        <BrandButton disabled variant="ghost">
          Aguardando integração segura
        </BrandButton>
      </div>
    </section>
  )
}
