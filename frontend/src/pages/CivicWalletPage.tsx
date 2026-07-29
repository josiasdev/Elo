import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  EyeOff,
  Laptop,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import {
  credentials,
  type CivicCredential,
  type CredentialVisualVariant,
  type CredentialVisibility,
} from '@/data/credentials'
import { cn } from '@/lib/utils'

const visualClasses: Record<CredentialVisualVariant, string> = {
  blue: 'bg-elociv-blue/32 text-elociv-navy',
  yellow: 'bg-elociv-yellow/45 text-elociv-navy',
  pink: 'bg-elociv-pink/42 text-elociv-navy',
}

const visualAccentClasses: Record<CredentialVisualVariant, string> = {
  blue: 'bg-elociv-blue',
  yellow: 'bg-elociv-yellow',
  pink: 'bg-elociv-pink',
}

const credentialIcons: Record<CredentialVisualVariant, LucideIcon> = {
  blue: Laptop,
  yellow: UsersRound,
  pink: MessageCircle,
}

const privacyPoints = [
  {
    title: 'Visibilidade por credencial',
    description:
      'Cada experiência pode ser apresentada ou mantida privada conforme a decisão do jovem.',
    icon: Eye,
  },
  {
    title: 'Dados pessoais protegidos',
    description:
      'Nomes completos, contatos, documentos e informações sensíveis permanecem fora da blockchain.',
    icon: LockKeyhole,
  },
  {
    title: 'Verificação independente',
    description:
      'Uma credencial apresentada pode ter sua origem, integridade e situação verificadas sem expor informações desnecessárias.',
    icon: ShieldCheck,
  },
]

const portabilityBenefits = [
  'credenciais reunidas em uma mesma trajetória',
  'verificabilidade por diferentes instituições',
  'continuidade mesmo após o encerramento de uma atividade',
]

function Breadcrumb() {
  return (
    <nav aria-label="Navegação estrutural">
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
        <li aria-current="page" className="text-elociv-navy">
          Carteira cívica
        </li>
      </ol>
    </nav>
  )
}

function SummaryMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-elociv-navy/10 bg-elociv-ivory p-5">
      <dt className="text-4xl font-heading font-bold leading-none text-elociv-navy">
        {value}
      </dt>
      <dd className="mt-2 text-sm font-bold leading-snug text-muted-foreground">
        {label}
      </dd>
    </div>
  )
}

function VisibilityControl({
  credential,
  visibility,
  onToggle,
}: {
  credential: CivicCredential
  visibility: CredentialVisibility
  onToggle: () => void
}) {
  const isVisible = visibility === 'visible'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isVisible}
      aria-label={`Alterar visibilidade da credencial ${credential.opportunity.title}`}
      onClick={onToggle}
      className={cn(
        'inline-flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-heading font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        isVisible
          ? 'border-elociv-blue/60 bg-elociv-blue/22 text-elociv-navy'
          : 'border-elociv-navy/15 bg-elociv-ivory text-elociv-navy',
      )}
    >
      <span className="inline-flex items-center gap-2">
        {isVisible ? (
          <Eye className="h-4 w-4 text-elociv-plum" aria-hidden="true" />
        ) : (
          <EyeOff className="h-4 w-4 text-elociv-plum" aria-hidden="true" />
        )}
        {isVisible ? 'Visível na apresentação' : 'Privada'}
      </span>
      <span
        className={cn(
          'relative h-6 w-11 rounded-full border transition-colors',
          isVisible
            ? 'border-elociv-navy/15 bg-elociv-navy'
            : 'border-elociv-navy/20 bg-elociv-ivory',
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            'absolute top-1 h-4 w-4 rounded-full bg-elociv-yellow transition-transform',
            isVisible ? 'left-6' : 'left-1',
          )}
        />
      </span>
    </button>
  )
}

function CredentialCard({
  credential,
  visibility,
  onToggleVisibility,
}: {
  credential: CivicCredential
  visibility: CredentialVisibility
  onToggleVisibility: () => void
}) {
  const Icon = credentialIcons[credential.visualVariant]

  return (
    <article className="h-full" aria-labelledby={`${credential.id}-title`}>
      <Card className="flex h-full flex-col p-0 md:p-0">
        <div
          className={cn(
            'relative min-h-40 overflow-hidden p-5',
            visualClasses[credential.visualVariant],
          )}
        >
          <div className="absolute inset-0 opacity-80" aria-hidden="true">
            <div className="absolute left-5 top-5 h-10 w-10 rotate-45 rounded-xl border-2 border-current/20" />
            <div className="absolute right-[-1.25rem] top-[-1.25rem] h-28 w-28 rounded-[2rem] border-2 border-current/20" />
            <div className="absolute bottom-8 left-16 h-px w-28 bg-current/30" />
            <div className="absolute bottom-7 left-10 h-5 w-5 rounded-full border-2 border-current/30" />
            <div
              className={cn(
                'absolute bottom-7 right-8 h-4 w-4 rounded-full',
                visualAccentClasses[credential.visualVariant],
              )}
            />
          </div>
          <div className="relative flex h-full min-h-30 items-center justify-between gap-4">
            <div>
              <p className="text-xs font-heading font-bold uppercase tracking-wider opacity-80">
                Credencial cívica
              </p>
              <p className="mt-2 max-w-[14rem] text-2xl font-heading font-bold leading-tight">
                {credential.opportunity.category}
              </p>
            </div>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-elociv-ivory/88 text-elociv-navy shadow-sm">
              <Icon className="h-8 w-8" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="blue" showDot={false}>
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {credential.statusLabel}
            </Badge>
            <Badge variant="yellow" showDot={false}>
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Instituição verificada
            </Badge>
          </div>

          <div>
            <h3
              id={`${credential.id}-title`}
              className="text-2xl font-heading font-bold leading-tight text-elociv-navy"
            >
              {credential.opportunity.title}
            </h3>
            <p className="mt-2 text-sm font-bold text-elociv-plum">
              {credential.issuer.name}
            </p>
          </div>

          <dl className="grid gap-3 text-sm text-elociv-navy">
            <div className="flex gap-2">
              <Clock3
                className="mt-0.5 h-4 w-4 shrink-0 text-elociv-plum"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Período e carga horária</dt>
                <dd className="font-semibold leading-relaxed">
                  {credential.opportunity.period} · {credential.opportunity.workload}
                </dd>
              </div>
            </div>
          </dl>

          <div>
            <p className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
              Competências principais
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {credential.primarySkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  showDot={false}
                  className="normal-case tracking-normal"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="ODS relacionados">
            {credential.ods.map((ods) => (
              <Badge
                key={ods.id}
                variant="pink"
                showDot={false}
                className="px-3 py-1"
              >
                ODS {ods.id}
              </Badge>
            ))}
          </div>

          <div className="mt-auto border-t border-elociv-navy/10 pt-5">
            <VisibilityControl
              credential={credential}
              visibility={visibility}
              onToggle={onToggleVisibility}
            />
            <a
              href={`/credenciais/${credential.slug}`}
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-elociv-navy px-5 text-sm font-heading font-bold text-elociv-ivory shadow-md transition-colors hover:bg-elociv-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Visualizar credencial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Card>
    </article>
  )
}

export function CivicWalletPage() {
  const [visibilityById, setVisibilityById] = useState<
    Record<string, CredentialVisibility>
  >(() =>
    Object.fromEntries(
      credentials.map((credential) => [credential.id, credential.visibility]),
    ),
  )
  const [visibilityMessage, setVisibilityMessage] = useState('')

  const summary = useMemo(() => {
    const validCredentials = credentials.filter(
      (credential) => credential.status === 'valid',
    )
    const workload = credentials.reduce((total, credential) => {
      const hours = Number.parseInt(credential.opportunity.workload, 10)
      return Number.isNaN(hours) ? total : total + hours
    }, 0)
    const issuers = new Set(credentials.map((credential) => credential.issuer.name))
    const ods = new Set(
      credentials.flatMap((credential) => credential.ods.map((item) => item.id)),
    )

    return {
      validCredentials: validCredentials.length.toString(),
      workload: `${workload}h`,
      issuers: issuers.size.toString(),
      ods: ods.size.toString(),
    }
  }, [])

  const toggleVisibility = (credential: CivicCredential) => {
    setVisibilityById((current) => {
      const currentVisibility = current[credential.id] ?? credential.visibility
      const nextVisibility =
        currentVisibility === 'visible' ? 'private' : 'visible'

      setVisibilityMessage(
        nextVisibility === 'visible'
          ? 'Esta credencial poderá aparecer quando você apresentar sua trajetória.'
          : 'Esta credencial ficará visível somente para você.',
      )

      return {
        ...current,
        [credential.id]: nextVisibility,
      }
    })
  }

  return (
    <>
      <section className="border-b border-elociv-navy/10 bg-elociv-blue/12 py-6">
        <Container>
          <Breadcrumb />
        </Container>
      </section>

      <section className="relative overflow-hidden bg-elociv-ivory py-10 sm:py-12 lg:py-14">
        <Container className="grid gap-8">
          <div className="inline-flex max-w-3xl flex-col gap-3 rounded-2xl border border-elociv-navy/10 bg-elociv-blue/18 p-4 sm:flex-row sm:items-center">
            <Badge variant="yellow" showDot={false} className="w-fit shrink-0">
              Carteira demonstrativa
            </Badge>
            <p className="text-sm leading-relaxed text-elociv-navy">
              Esta carteira utiliza dados e instituições fictícias para demonstrar
              como o EloCiv organiza e apresenta uma trajetória cívica.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-stretch">
            <Card variant="navy" className="relative overflow-hidden p-6 sm:p-8">
              <div className="absolute right-[-3rem] top-8 h-32 w-32 rounded-full border border-elociv-blue/25" aria-hidden="true" />
              <div className="absolute bottom-8 right-16 h-16 w-16 rotate-45 rounded-2xl border-2 border-elociv-yellow/35" aria-hidden="true" />
              <div className="relative">
                <p className="text-xs font-heading font-bold uppercase tracking-wider text-elociv-blue">
                  CARTEIRA CÍVICA ELOCIV
                </p>
                <h1 className="mt-3 max-w-3xl text-4xl font-heading font-bold leading-tight text-elociv-ivory sm:text-5xl lg:text-6xl">
                  Minha trajetória reconhecida
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-elociv-ivory/78 sm:text-lg">
                  Experiências, aprendizados e contribuições reunidos em uma
                  carteira segura, portátil e controlada pelo jovem.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/credenciais/credencial-oficina-introducao-programacao"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-elociv-yellow px-5 text-sm font-heading font-bold text-elociv-navy shadow-sm transition-colors hover:bg-elociv-yellow/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
                  >
                    Visualizar credencial mais recente
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="/oportunidades"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-elociv-ivory/30 px-5 text-sm font-heading font-bold text-elociv-ivory transition-colors hover:bg-elociv-ivory hover:text-elociv-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
                  >
                    Explorar oportunidades
                  </a>
                </div>
              </div>
            </Card>

            <Card className="flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-elociv-pink/55 text-2xl font-heading font-bold text-elociv-navy">
                  AS
                </div>
                <div>
                  <Badge variant="blue" showDot={false}>
                    Carteira ativa
                  </Badge>
                  <h2 className="mt-3 text-3xl font-heading font-bold text-elociv-navy">
                    Ana B. S.
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Identidade fictícia utilizada no protótipo
                  </p>
                </div>
              </div>
              <Separator variant="dashed" className="my-6" />
              <div>
                <p className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
                  Identificador descentralizado
                </p>
                <p className="mt-2 break-all rounded-2xl bg-elociv-blue/16 p-4 font-mono text-sm font-bold text-elociv-navy">
                  did:example:elociv:holder:ana-•••-001
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <Container className="grid gap-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="plum" showDot={false}>
                Dados demonstrativos
              </Badge>
              <h2 className="mt-4 text-3xl font-heading font-bold text-elociv-navy sm:text-4xl">
                Resumo da trajetória
              </h2>
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
              Dados demonstrativos
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <SummaryMetric
              value={summary.validCredentials}
              label="Credenciais válidas"
            />
            <SummaryMetric
              value={summary.workload}
              label="Experiências reconhecidas"
            />
            <SummaryMetric
              value={summary.issuers}
              label="Instituições emissoras"
            />
            <SummaryMetric value={summary.ods} label="ODS relacionados" />
          </dl>
        </Container>
      </section>

      <section className="pb-10 sm:pb-12 lg:pb-14">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-heading font-bold leading-tight text-elociv-navy sm:text-4xl">
              Credenciais da minha trajetória
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Cada credencial representa uma experiência confirmada por uma
              instituição verificada.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Você controla quais credenciais deseja apresentar. Alterar a
              visibilidade não remove nem invalida o reconhecimento.
            </p>
          </div>

          <div aria-live="polite" className="mt-5 min-h-6">
            {visibilityMessage && (
              <p className="rounded-2xl border border-elociv-blue/45 bg-elociv-blue/18 p-4 text-sm font-semibold text-elociv-navy">
                {visibilityMessage}
              </p>
            )}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {credentials.map((credential) => (
              <CredentialCard
                key={credential.id}
                credential={credential}
                visibility={visibilityById[credential.id] ?? credential.visibility}
                onToggleVisibility={() => toggleVisibility(credential)}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-elociv-navy/10 bg-elociv-blue/12 py-10 sm:py-12 lg:py-14">
        <Container className="grid gap-10">
          <section>
            <h2 className="text-3xl font-heading font-bold text-elociv-navy sm:text-4xl">
              Você controla sua trajetória
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              A Carteira Cívica reúne os reconhecimentos do jovem, mas não torna
              tudo público automaticamente.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {privacyPoints.map((point) => {
                const Icon = point.icon

                return (
                  <Card key={point.title} className="p-5 sm:p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-elociv-yellow/55 text-elociv-navy">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-xl font-heading font-bold text-elociv-navy">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </Card>
                )
              })}
            </div>
          </section>

          <section>
            <Card variant="plum" className="p-5 sm:p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)] lg:items-start">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-elociv-ivory/12 px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider text-elociv-yellow">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Portabilidade da trajetória
                  </div>
                  <h2 className="mt-5 text-3xl font-heading font-bold leading-tight text-elociv-ivory sm:text-4xl">
                    Uma trajetória que acompanha o jovem
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-elociv-ivory/78">
                    A Carteira Cívica foi desenhada para que o reconhecimento não
                    fique preso a uma única escola, organização ou plataforma.
                  </p>
                  <div className="mt-6 rounded-2xl border border-elociv-yellow/40 bg-elociv-yellow/18 p-4">
                    <p className="text-sm font-bold leading-relaxed text-elociv-ivory">
                      O reconhecimento pertence à trajetória do jovem, não ao banco
                      de dados de uma única organização.
                    </p>
                  </div>
                </div>
                <ul className="grid gap-3">
                  {portabilityBenefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex gap-3 rounded-2xl border border-elociv-ivory/15 bg-elociv-ivory/8 p-4 text-sm font-semibold text-elociv-ivory"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-elociv-yellow"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </section>
        </Container>
      </section>
    </>
  )
}
