import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Eye,
  Fingerprint,
  Link as LinkIcon,
  LockKeyhole,
  Printer,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { BrandLogo } from '@/components/brand/brand-logo'
import { ConnectionPattern } from '@/components/brand/connection-pattern'
import { Hexagon } from '@/components/brand/hexagon'
import { type CivicCredential } from '@/data/credentials'
import { useCredential } from '@/hooks/useCredential'
import { cn } from '@/lib/utils'

const validationItems = [
  'Assinatura do emissor reconhecida',
  'Instituição emissora verificada',
  'Integridade da credencial confirmada',
  'Credencial vinculada ao titular',
  'Credencial não transferível',
  'Status de revogação consultado',
  'Credencial ativa e não revogada',
]

const verifiableItems = [
  'identidade da instituição emissora',
  'assinatura da credencial',
  'integridade do registro',
  'estado ativo ou revogado',
  'vínculo criptográfico com o titular',
]

const privateItems = [
  'nome completo',
  'idade',
  'documentos',
  'endereço',
  'telefone',
  'e-mail',
  'informações sensíveis sobre a atividade',
]

const portabilityItems = [
  'controlada pelo jovem',
  'verificável por terceiros',
  'independente da continuidade de um único banco de dados',
]

function Breadcrumb({ credential }: { credential?: CivicCredential }) {
  return (
    <nav aria-label="Navegação estrutural" className="credential-print-hidden">
      <ol className="flex min-w-0 flex-wrap items-center gap-2 text-sm font-bold text-elociv-plum">
        <li>
          <a
            href="/"
            className="rounded-md transition-colors hover:text-elociv-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Início
          </a>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4" />
        </li>
        <li>
          <a
            href="/oportunidades"
            className="rounded-md transition-colors hover:text-elociv-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Oportunidades
          </a>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4" />
        </li>
        <li>
          <a
            href={`/oportunidades/${credential?.opportunity.slug ?? 'oficina-introducao-programacao'}`}
            className="rounded-md transition-colors hover:text-elociv-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {credential?.opportunity.title ?? 'Oficina de Introdução à Programação'}
          </a>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4" />
        </li>
        <li aria-current="page" className="text-elociv-navy">
          Credencial
        </li>
      </ol>
    </nav>
  )
}

function InfoPair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-heading font-bold uppercase tracking-wider text-elociv-ivory/60">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-bold leading-snug text-elociv-ivory sm:text-base">
        {value}
      </dd>
    </div>
  )
}

function DetailPair({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-elociv-navy/10 bg-elociv-ivory p-4">
      <dt className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-bold leading-relaxed text-elociv-navy">
        {value}
      </dd>
    </div>
  )
}

function CredentialVisual({ credential }: { credential: CivicCredential }) {
  return (
    <article
      aria-labelledby="credential-card-title"
      className="credential-print-surface relative overflow-hidden rounded-[1.75rem] bg-elociv-navy p-5 text-elociv-ivory shadow-md sm:p-6 lg:p-7"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <ConnectionPattern
          variant="combined"
          align="right"
          className="right-[-3rem] top-8 opacity-45"
        />
        <div className="absolute left-[-3rem] top-10 h-28 w-28 rounded-full border border-elociv-blue/25" />
        <div className="absolute bottom-8 right-10 h-16 w-16 rounded-full border-2 border-elociv-yellow/35" />
        <div className="absolute bottom-[-5rem] left-1/3 h-40 w-40 rounded-full bg-elociv-plum/45" />
      </div>

      <div className="relative flex min-h-[34rem] flex-col justify-between gap-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <BrandLogo variant="negative" size="md" className="shrink-0" />
          <span className="inline-flex items-center gap-2 rounded-full border border-elociv-yellow/50 bg-elociv-yellow px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wider text-elociv-navy">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {credential.statusLabel}
          </span>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3" aria-hidden="true">
            <Hexagon variant="yellow" size="sm" />
            <span className="h-px w-16 bg-elociv-blue/50" />
            <span className="h-3 w-3 rounded-full border-2 border-elociv-pink" />
            <span className="h-px w-10 bg-elociv-yellow/40" />
            <Hexagon variant="outline-ivory" size="sm" />
          </div>
          <p className="text-xs font-heading font-bold uppercase tracking-wider text-elociv-blue">
            Credencial Cívica Verificável
          </p>
          <h2
            id="credential-card-title"
            className="mt-3 max-w-lg text-4xl font-heading font-bold leading-none text-elociv-ivory sm:text-5xl"
          >
            {credential.opportunity.title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-elociv-ivory/72">
            Reconhecimento demonstrativo emitido por uma instituição verificada
            após a conclusão da experiência.
          </p>
        </div>

        <div className="grid gap-5 rounded-2xl border border-elociv-ivory/15 bg-elociv-ivory/6 p-4 sm:grid-cols-2 sm:p-5">
          <InfoPair label="Titular" value={credential.holder.displayName} />
          <InfoPair label="Emissora" value={credential.issuer.name} />
          <InfoPair label="Data da atividade" value={credential.activityDate} />
          <InfoPair label="Carga horária" value={credential.opportunity.workload} />
        </div>

        <div className="flex flex-col gap-5 border-t border-elociv-ivory/15 pt-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="yellow" showDot={false} className="normal-case tracking-normal">
              Instituição verificada
            </Badge>
            <Badge variant="blue" showDot={false} className="normal-case tracking-normal">
              Credencial não transferível
            </Badge>
            {credential.ods.map((ods) => (
              <Badge
                key={ods.id}
                variant="pink"
                showDot={false}
                className="px-3 py-1 normal-case tracking-normal"
              >
                ODS {ods.id}
              </Badge>
            ))}
          </div>

          <dl className="grid gap-3 text-sm sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <dt className="text-xs font-heading font-bold uppercase tracking-wider text-elociv-ivory/55">
                Emissão
              </dt>
              <dd className="mt-1 font-bold text-elociv-ivory">
                {credential.issuedAt}
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-xs font-heading font-bold uppercase tracking-wider text-elociv-ivory/55">
                Identificador
              </dt>
              <dd className="mt-1 break-words font-mono text-xs font-bold text-elociv-yellow">
                {credential.id}
              </dd>
            </div>
          </dl>
          <p className="text-xs leading-relaxed text-elociv-ivory/58">
            Nome fictício utilizado para demonstração.
          </p>
        </div>
      </div>
    </article>
  )
}

function ValidationPanel({
  credential,
  isVerifying,
  onVerify,
}: {
  credential: CivicCredential
  isVerifying: boolean
  onVerify: () => void
}) {
  return (
    <Card className="credential-print-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Badge variant="plum" showDot={false}>
            Ambiente demonstrativo
          </Badge>
          <h2 className="mt-4 text-3xl font-heading font-bold leading-tight text-elociv-navy">
            Validação da credencial
          </h2>
        </div>
        <div
          className="inline-flex items-center gap-2 rounded-full bg-elociv-blue/35 px-4 py-2 text-sm font-heading font-bold text-elociv-navy"
          aria-label="Credencial válida"
        >
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          Credencial válida
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        A origem, a integridade e a situação desta credencial foram verificadas
        no ambiente demonstrativo do EloCiv.
      </p>

      <ul className="mt-6 space-y-3">
        {validationItems.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-elociv-navy">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elociv-yellow/60">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-semibold leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      <Separator variant="dashed" className="my-6" />

      <div className="flex items-start gap-3 rounded-2xl bg-elociv-blue/18 p-4">
        <CalendarDays
          className="mt-0.5 h-5 w-5 shrink-0 text-elociv-plum"
          aria-hidden="true"
        />
        <div>
          <p className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
            Última verificação
          </p>
          <p className="mt-1 text-sm font-bold text-elociv-navy">
            {credential.lastCheckedAt}
          </p>
        </div>
      </div>

      <Button
        type="button"
        aria-label="Verificar novamente"
        onClick={onVerify}
        disabled={isVerifying}
        className="mt-6 w-full gap-2"
      >
        <RefreshCw
          className={cn('h-4 w-4', isVerifying && 'motion-safe:animate-spin')}
          aria-hidden="true"
        />
        {isVerifying ? 'Verificando...' : 'Verificar novamente'}
      </Button>
    </Card>
  )
}

function Section({
  id,
  title,
  children,
  className,
}: {
  id?: string
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-28', className)}>
      <h2 className="text-3xl font-heading font-bold leading-tight text-elociv-navy sm:text-4xl">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function CredentialNotFound() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Breadcrumb />
        <Card className="mt-8 max-w-3xl">
          <Badge variant="yellow" showDot={false}>
            Credencial demonstrativa
          </Badge>
          <h1 className="mt-5 text-4xl font-heading font-bold leading-tight text-elociv-navy">
            Credencial não encontrada
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Esta demonstração possui apenas as credenciais vinculadas à Carteira
            Cívica do protótipo.
          </p>
          <a
            href="/oportunidades/oficina-introducao-programacao"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-elociv-navy px-5 text-sm font-heading font-bold text-elociv-ivory shadow-md transition-colors hover:bg-elociv-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
          >
            Voltar para a oportunidade
          </a>
        </Card>
      </Container>
    </section>
  )
}

export function CredentialPage({ slug }: { slug: string }) {
  const { credential, onChainStatus, loading: credentialLoading } = useCredential(slug)
  const [isVerifying, setIsVerifying] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [isDidVisible, setIsDidVisible] = useState(false)
  const [copyMessage, setCopyMessage] = useState('')
  const [didCopyMessage, setDidCopyMessage] = useState('')
  const verificationTimeout = useRef<number | null>(null)

  const verificationUrl = useMemo(() => window.location.href, [])

  useEffect(() => {
    return () => {
      if (verificationTimeout.current !== null) {
        window.clearTimeout(verificationTimeout.current)
      }
    }
  }, [])

  if (credentialLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-elociv-navy/20 border-t-elociv-navy" />
          <p className="text-sm font-semibold text-muted-foreground">
            Verificando credencial…
          </p>
        </div>
      </section>
    )
  }

  if (!credential) {
    return <CredentialNotFound />
  }

  const copyText = async (value: string) => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value)
        return
      } catch {
        // Fallback local para ambientes sem permissão de clipboard.
      }
    }

    const input = document.createElement('textarea')
    input.value = value
    input.setAttribute('readonly', '')
    input.style.position = 'fixed'
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(input)

    if (!copied) {
      throw new Error('Clipboard fallback failed')
    }
  }

  const handleVerify = () => {
    setIsVerifying(true)
    setStatusMessage('')
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const delay = prefersReducedMotion ? 120 : 850

    if (verificationTimeout.current !== null) {
      window.clearTimeout(verificationTimeout.current)
    }

    verificationTimeout.current = window.setTimeout(() => {
      setIsVerifying(false)
      setStatusMessage(
        'Validação concluída. A credencial permanece íntegra, ativa e vinculada ao emissor reconhecido.',
      )
      verificationTimeout.current = null
    }, delay)
  }

  const handleCopyLink = async () => {
    try {
      await copyText(verificationUrl)
      setCopyMessage('Link de verificação copiado.')
    } catch {
      setCopyMessage('Não foi possível copiar automaticamente. Selecione a URL na barra do navegador.')
    }
  }

  const handleCopyDid = async () => {
    try {
      await copyText(credential.holder.did)
      setDidCopyMessage('Identificador demonstrativo copiado.')
    } catch {
      setDidCopyMessage('Não foi possível copiar automaticamente.')
    }
  }

  return (
    <>
      <section className="credential-print-hidden border-b border-elociv-navy/10 bg-elociv-blue/12 py-6">
        <Container>
          <Breadcrumb credential={credential} />
        </Container>
      </section>

      <section className="credential-print-surface relative overflow-hidden bg-elociv-ivory py-10 sm:py-12 lg:py-14">
        <Container className="flex flex-col gap-8">
          <div className="max-w-4xl">
            <div className="inline-flex max-w-3xl flex-col gap-3 rounded-2xl border border-elociv-navy/10 bg-elociv-blue/18 p-4 sm:flex-row sm:items-center">
              <Badge variant="yellow" showDot={false} className="w-fit shrink-0">
                Credencial demonstrativa
              </Badge>
              <p className="text-sm leading-relaxed text-elociv-navy">
                Esta credencial utiliza informações fictícias e foi criada
                exclusivamente para demonstrar a experiência de reconhecimento e
                validação do EloCiv.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-heading font-bold uppercase tracking-wider text-elociv-plum">
                CARTEIRA CÍVICA ELOCIV
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-heading font-bold leading-tight text-elociv-navy sm:text-5xl lg:text-6xl">
                Uma experiência reconhecida. Uma trajetória que permanece.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Esta credencial demonstra como uma instituição verificada pode
                reconhecer a participação de um jovem e emitir um registro
                portátil, íntegro e verificável.
              </p>
              <a
                href={`/oportunidades/${credential.opportunity.slug}`}
                className="credential-print-hidden mt-5 inline-flex items-center gap-2 rounded-md text-sm font-heading font-bold text-elociv-plum transition-colors hover:text-elociv-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar para a oportunidade
              </a>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(20rem,0.74fr)] lg:items-start">
            <CredentialVisual credential={credential} />
            <ValidationPanel
              credential={credential}
              isVerifying={isVerifying}
              onVerify={handleVerify}
            />
          </div>

          <div aria-live="polite" className="min-h-6">
            {statusMessage && (
              <div
                role="status"
                className="rounded-2xl border border-elociv-blue/45 bg-elociv-blue/18 p-4 text-sm font-semibold leading-relaxed text-elociv-navy"
              >
                {statusMessage}
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="credential-print-surface py-10 sm:py-12 lg:py-14">
        <Container className="grid gap-10">
          <Section title="Experiência reconhecida">
            <Card className="p-5 sm:p-6">
              <div className="max-w-3xl">
                <p className="text-xs font-heading font-bold uppercase tracking-wider text-elociv-plum">
                  Atividade
                </p>
                <h3 className="mt-2 text-2xl font-heading font-bold text-elociv-navy">
                  {credential.opportunity.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {credential.opportunity.summary}
                </p>
              </div>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <DetailPair label="Modalidade" value={credential.opportunity.modality} />
                <DetailPair label="Local" value={credential.opportunity.location} />
                <DetailPair label="Período" value={credential.opportunity.period} />
                <DetailPair label="Carga horária" value={credential.opportunity.workload} />
                <DetailPair label="Categoria" value={credential.opportunity.category} />
                <DetailPair
                  label="Faixa etária da oportunidade"
                  value={credential.opportunity.ageRange}
                />
              </dl>
            </Card>
          </Section>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)]">
            <Section title="Competências e experiências reconhecidas">
              <Card className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  {credential.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="blue"
                      showDot={false}
                      className="normal-case tracking-normal"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  As competências apresentadas refletem a experiência demonstrativa
                  e foram atribuídas pela instituição emissora.
                </p>
              </Card>
            </Section>

            <Section title="Objetivos de Desenvolvimento Sustentável relacionados">
              <Card className="p-5 sm:p-6">
                <div className="grid gap-3">
                  {credential.ods.map((ods) => (
                    <div
                      key={ods.id}
                      className="flex items-start gap-3 rounded-2xl border border-elociv-navy/10 bg-elociv-ivory p-4"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-elociv-pink/55 text-sm font-heading font-bold text-elociv-navy">
                        {ods.id}
                      </span>
                      <div>
                        <h3 className="text-lg font-heading font-bold text-elociv-navy">
                          ODS {ods.id}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {ods.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Section>
          </div>
        </Container>
      </section>

      <section className="credential-print-surface border-y border-elociv-navy/10 bg-elociv-blue/12 py-10 sm:py-12 lg:py-14">
        <Container className="grid gap-10">
          <Section title="O que a blockchain protege - e o que permanece privado">
            <div className="grid gap-5 lg:grid-cols-2">
              <Card className="p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-elociv-plum" aria-hidden="true" />
                  <h3 className="text-2xl font-heading font-bold text-elociv-navy">
                    Pode ser verificado
                  </h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {verifiableItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-elociv-navy">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-elociv-plum"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <LockKeyhole className="h-6 w-6 text-elociv-plum" aria-hidden="true" />
                  <h3 className="text-2xl font-heading font-bold text-elociv-navy">
                    Permanece fora da blockchain
                  </h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {privateItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-elociv-navy">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-elociv-plum" aria-hidden="true" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="mt-6 rounded-2xl border border-elociv-yellow/70 bg-elociv-yellow/35 p-5">
              <p className="text-base leading-relaxed text-elociv-navy">
                A blockchain é utilizada como camada de confiança para verificar a
                origem, a integridade e a situação da credencial. Ela não funciona
                como banco público de dados pessoais.
              </p>
              <p className="mt-3 text-sm font-bold leading-relaxed text-elociv-navy">
                O EloCiv registra apenas provas criptográficas mínimas. Os dados
                pessoais continuam protegidos fora da rede pública.
              </p>
            </div>
          </Section>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
            <Section title="Identidade vinculada">
              <Card className="p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <Fingerprint
                    className="mt-1 h-6 w-6 shrink-0 text-elociv-plum"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A credencial está vinculada à identidade descentralizada
                      demonstrativa da titular. O identificador permite comprovar a
                      titularidade sem publicar seus dados pessoais na blockchain.
                    </p>
                    <Badge variant="outline" showDot={false} className="mt-4">
                      Identificador demonstrativo
                    </Badge>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-elociv-navy/10 bg-elociv-blue/16 p-4">
                  <p className="break-all font-mono text-sm font-bold text-elociv-navy">
                    {isDidVisible ? credential.holder.did : credential.holder.maskedDid}
                  </p>
                </div>

                <div className="credential-print-hidden mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    aria-label="Exibir identificador"
                    onClick={() => {
                      setIsDidVisible(true)
                      setDidCopyMessage('')
                    }}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    Exibir identificador
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    aria-label="Copiar identificador"
                    onClick={handleCopyDid}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    Copiar identificador
                  </Button>
                </div>
                <div aria-live="polite" className="mt-3 min-h-5">
                  {didCopyMessage && (
                    <p className="text-sm font-semibold text-elociv-plum">
                      {didCopyMessage}
                    </p>
                  )}
                </div>
              </Card>
            </Section>

            <Section title="Detalhes técnicos de validação">
              <Card className="p-5 sm:p-6">
                <details className="group">
                  <summary className="credential-print-hidden cursor-pointer rounded-lg text-base font-heading font-bold text-elociv-navy marker:text-elociv-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    Ver detalhes técnicos
                  </summary>
                  <div className="mt-5">
                    <dl className="grid gap-3 sm:grid-cols-2">
                      <DetailPair label="Identificador da credencial" value={credential.id} />
                      <DetailPair label="Formato" value={credential.proof.format} />
                      <DetailPair
                        label="Algoritmo de resumo"
                        value={credential.proof.algorithm}
                      />
                      <DetailPair
                        label="Resumo criptográfico demonstrativo"
                        value={credential.proof.digest}
                      />
                      <DetailPair
                        label="Identificador do emissor"
                        value={credential.issuer.did}
                      />
                      <DetailPair
                        label="Identificador da titular"
                        value={credential.holder.did}
                      />
                      <DetailPair label="Situação" value={credential.proof.situation} />
                      <DetailPair label="Revogação" value={credential.proof.revocation} />
                      <DetailPair label="Ambiente" value={credential.proof.environment} />
                      <DetailPair label="Rede" value={credential.proof.network} />
                    </dl>
                    {onChainStatus?.found ? (
                      <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-950 dark:text-emerald-200">
                        <p className="font-bold flex items-center gap-2 text-emerald-700">
                          <ShieldCheck className="h-5 w-5" />
                          Prova On-Chain Confirmada no Smart Contract Soroban
                        </p>
                        <p className="mt-1 text-xs text-emerald-800/80">
                          Status: {onChainStatus.is_revoked ? 'REVOGADA' : 'ATIVA'}  ·  Emissor On-Chain: {onChainStatus.issuer ? `${onChainStatus.issuer.slice(0, 8)}...${onChainStatus.issuer.slice(-8)}` : 'Custodiante EloCiv'}
                        </p>
                      </div>
                    ) : (
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {import.meta.env.VITE_USE_MOCKS !== 'false'
                          ? 'Os valores técnicos apresentados acima são demonstrativos do protótipo EloCiv.'
                          : 'Credencial registrada no backend e vinculada ao contrato Soroban na Stellar Testnet.'}
                      </p>
                    )}
                  </div>
                </details>
              </Card>
            </Section>
          </div>

          <Section title="Uma trajetória que não depende de uma única plataforma">
            <Card className="p-5 sm:p-6">
              <p className="max-w-4xl text-base leading-relaxed text-muted-foreground">
                A arquitetura do EloCiv foi desenhada para que a credencial possa
                continuar sendo apresentada e verificada mesmo que a atividade
                termine ou a instituição deixe de utilizar o EloCiv. O modelo
                permite que o reconhecimento acompanhe o jovem.
              </p>
              <ul className="mt-5 grid gap-3 md:grid-cols-3">
                {portabilityItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-2xl border border-elociv-navy/10 bg-elociv-ivory p-4 text-sm font-semibold text-elociv-navy"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-elociv-plum"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Section>
        </Container>
      </section>

      <section className="credential-print-surface py-10 sm:py-12 lg:py-14">
        <Container className="grid gap-10">
          <Section title="Instituição emissora">
            <Card className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-heading font-bold text-elociv-navy">
                      {credential.issuer.name}
                    </h3>
                    <Badge variant="yellow" showDot={false}>
                      Instituição verificada
                    </Badge>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    Organização fictícia cadastrada no protótipo do EloCiv para
                    demonstrar a publicação de oportunidades e a emissão de
                    credenciais juvenis.
                  </p>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-elociv-navy">
                    A instituição assinou esta credencial utilizando sua identidade
                    emissora demonstrativa.
                  </p>
                </div>
                <div className="rounded-2xl bg-elociv-plum p-5 text-elociv-ivory md:w-80">
                  <Badge variant="blue" showDot={false} className="mb-4">
                    Emissora
                  </Badge>
                  <dl className="grid gap-4">
                    <InfoPair label="DID demonstrativo" value={credential.issuer.did} />
                    <InfoPair label="Data de emissão" value={credential.issuedAt} />
                  </dl>
                </div>
              </div>
            </Card>
          </Section>

          <Section title="Ações da credencial" className="credential-print-hidden">
            <Card className="p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Button
                  type="button"
                  aria-label="Verificar novamente"
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="h-auto min-h-12 gap-2 py-3"
                >
                  <RefreshCw
                    className={cn('h-4 w-4', isVerifying && 'motion-safe:animate-spin')}
                    aria-hidden="true"
                  />
                  {isVerifying ? 'Verificando...' : 'Verificar novamente'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  aria-label="Copiar link de verificação"
                  onClick={handleCopyLink}
                  className="h-auto min-h-12 gap-2 py-3"
                >
                  <LinkIcon className="h-4 w-4" aria-hidden="true" />
                  Copiar link de verificação
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  aria-label="Imprimir ou salvar como PDF"
                  onClick={() => window.print()}
                  className="h-auto min-h-12 gap-2 py-3"
                >
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  Imprimir ou salvar como PDF
                </Button>
                <a
                  href={`/oportunidades/${credential.opportunity.slug}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-elociv-navy px-5 py-3 text-sm font-heading font-semibold text-elociv-navy transition-all hover:bg-elociv-navy hover:text-elociv-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Voltar para a oportunidade
                </a>
                <a
                  href="/carteira-civica"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-elociv-navy px-5 py-3 text-sm font-heading font-semibold text-elociv-navy transition-all hover:bg-elociv-navy hover:text-elociv-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:col-span-4"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Voltar para a carteira cívica
                </a>
              </div>
              <div aria-live="polite" className="mt-4 min-h-5">
                {copyMessage && (
                  <p className="text-sm font-semibold text-elociv-plum">
                    {copyMessage}
                  </p>
                )}
              </div>
            </Card>
          </Section>
        </Container>
      </section>
    </>
  )
}
