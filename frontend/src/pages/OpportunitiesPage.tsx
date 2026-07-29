import { useMemo, useState, type ChangeEvent, type ReactNode } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Lightbulb,
  MapPin,
  MessageCircle,
  Search,
  SearchX,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'
import {
  opportunities,
  opportunityAgeRanges,
  opportunityCategories,
  opportunityModalities,
  opportunityStates,
  type Opportunity,
  type OpportunityCategory,
  type OpportunityVisualVariant,
} from '@/data/opportunities'

const visualVariantClasses: Record<OpportunityVisualVariant, string> = {
  blue: 'bg-elociv-blue/35 text-elociv-navy',
  yellow: 'bg-elociv-yellow/45 text-elociv-navy',
  pink: 'bg-elociv-pink/40 text-elociv-navy',
  plum: 'bg-elociv-plum text-elociv-ivory',
}

const visualAccentClasses: Record<OpportunityVisualVariant, string> = {
  blue: 'bg-elociv-blue',
  yellow: 'bg-elociv-yellow',
  pink: 'bg-elociv-pink',
  plum: 'bg-elociv-pink',
}

const categoryIcons: Record<OpportunityCategory, LucideIcon> = {
  'Curso educacional': BookOpen,
  'Curso profissionalizante': GraduationCap,
  'Oficina técnica': Laptop,
  'Formação complementar': Sparkles,
  'Voluntariado jovem': HeartHandshake,
  'Ação pontual': Lightbulb,
  'Grupo de jovens': UsersRound,
  Palestra: MessageCircle,
  Mentoria: BadgeCheck,
}

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function parseAgeRange(value: string) {
  const matches = value.match(/\d+/g)?.map(Number) ?? []
  const min = matches[0]
  const max = matches[1]

  if (min === undefined || max === undefined) {
    return null
  }

  return { min, max }
}

function ageRangesOverlap(opportunityAgeRange: string, selectedAgeRange: string) {
  const opportunityRange = parseAgeRange(opportunityAgeRange)
  const selectedRange = parseAgeRange(selectedAgeRange)

  if (!opportunityRange || !selectedRange) {
    return false
  }

  return (
    opportunityRange.min <= selectedRange.max &&
    selectedRange.min <= opportunityRange.max
  )
}

function FilterSelect({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  id: string
  label: string
  value: string
  placeholder: string
  options: readonly string[]
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-heading font-bold uppercase tracking-wider text-elociv-plum"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onChange(event.target.value)
        }
        className="h-12 w-full rounded-xl border border-elociv-navy/15 bg-elociv-ivory px-4 text-sm font-semibold text-elociv-navy outline-none transition-colors focus:border-elociv-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const Icon = categoryIcons[opportunity.category]

  return (
    <article className="h-full" aria-labelledby={`${opportunity.id}-title`}>
      <Card className="flex h-full flex-col p-0 md:p-0 bg-elociv-ivory">
        <div
          className={cn(
            'relative min-h-40 overflow-hidden p-5',
            visualVariantClasses[opportunity.visualVariant],
          )}
        >
          <div className="absolute right-[-1rem] top-[-1rem] h-28 w-28 rotate-12 rounded-[2rem] border-2 border-current/20" />
          <div className="absolute bottom-4 left-5 h-8 w-8 rotate-45 rounded-lg border-2 border-current/25" />
          <div
            className={cn(
              'absolute bottom-7 right-8 h-4 w-4 rounded-full',
              visualAccentClasses[opportunity.visualVariant],
            )}
          />
          <div className="relative flex h-full min-h-30 items-center justify-between gap-4">
            <div>
              <p className="text-xs font-heading font-bold uppercase tracking-wider opacity-80">
                Oportunidade
              </p>
              <p className="mt-2 max-w-[13rem] text-2xl font-heading font-bold leading-tight">
                {opportunity.category}
              </p>
            </div>
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-elociv-ivory/85 text-elociv-navy shadow-sm">
              <Icon className="h-8 w-8" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="blue" showDot={false} className="text-[0.68rem]">
              {opportunity.category}
            </Badge>
            <Badge variant="outline" showDot={false} className="text-[0.68rem]">
              {opportunity.modality}
            </Badge>
            {opportunity.organizationVerified && (
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-elociv-yellow/55 px-3 py-1.5 text-[0.68rem] font-heading font-bold uppercase tracking-wider text-elociv-navy"
                aria-label="Instituição verificada"
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Instituição verificada
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <h2
              id={`${opportunity.id}-title`}
              className="text-2xl font-heading font-bold leading-tight text-elociv-navy"
            >
              {opportunity.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {opportunity.summary}
            </p>
            <p className="text-sm font-bold text-elociv-plum">
              {opportunity.organization}
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-3 border-t border-elociv-navy/10 pt-4 text-sm text-elociv-navy sm:grid-cols-2">
            <div className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-elociv-plum" aria-hidden="true" />
              <div>
                <dt className="sr-only">Local</dt>
                <dd>{opportunity.locationLabel}</dd>
              </div>
            </div>
            <div className="flex gap-2">
              <UsersRound className="mt-0.5 h-4 w-4 shrink-0 text-elociv-plum" aria-hidden="true" />
              <div>
                <dt className="sr-only">Faixa etária</dt>
                <dd>{opportunity.ageRange}</dd>
              </div>
            </div>
            <div className="flex gap-2 sm:col-span-2">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-elociv-plum" aria-hidden="true" />
              <div>
                <dt className="sr-only">Período</dt>
                <dd>{opportunity.period}</dd>
              </div>
            </div>
            <div className="flex gap-2 sm:col-span-2">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-elociv-plum" aria-hidden="true" />
              <div>
                <dt className="sr-only">Duração</dt>
                <dd>{opportunity.duration}</dd>
              </div>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2" aria-label="ODS relacionados">
            {opportunity.ods.slice(0, 3).map((ods) => (
              <Badge
                key={ods}
                variant="pink"
                showDot={false}
                className="px-3 py-1 text-[0.68rem]"
              >
                ODS {ods}
              </Badge>
            ))}
          </div>

          <a
            href={`/oportunidades/${opportunity.slug}`}
            className="mt-auto inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-elociv-navy px-5 text-sm font-heading font-bold text-elociv-ivory shadow-md transition-all hover:bg-elociv-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
          >
            Ver detalhes
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Card>
    </article>
  )
}

export function OpportunitiesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [modality, setModality] = useState('')
  const [state, setState] = useState('')
  const [ageRange, setAgeRange] = useState('')

  const hasActiveFilters =
    search.trim().length > 0 || Boolean(category || modality || state || ageRange)

  const activeFilterLabels = useMemo(() => {
    const labels: string[] = []
    if (search.trim()) labels.push('busca')
    if (category) labels.push(category)
    if (modality) labels.push(modality)
    if (state) labels.push(state)
    if (ageRange) labels.push(ageRange)
    return labels
  }, [ageRange, category, modality, search, state])

  const filteredOpportunities = useMemo(() => {
    const normalizedSearch = normalizeText(search.trim())

    return opportunities.filter((opportunity) => {
      const searchableText = normalizeText(
        [
          opportunity.title,
          opportunity.summary,
          opportunity.organization,
          opportunity.category,
          opportunity.city ?? '',
          opportunity.state ?? '',
          opportunity.stateAbbreviation ?? '',
        ].join(' '),
      )

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch)
      const matchesCategory = category === '' || opportunity.category === category
      const matchesModality = modality === '' || opportunity.modality === modality
      const matchesState = state === '' || opportunity.state === state
      const matchesAgeRange =
        ageRange === '' || ageRangesOverlap(opportunity.ageRange, ageRange)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesModality &&
        matchesState &&
        matchesAgeRange
      )
    })
  }, [ageRange, category, modality, search, state])

  const resultCountLabel = `${filteredOpportunities.length} ${
    filteredOpportunities.length === 1
      ? 'oportunidade encontrada'
      : 'oportunidades encontradas'
  }`

  const clearFilters = () => {
    setSearch('')
    setCategory('')
    setModality('')
    setState('')
    setAgeRange('')
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-elociv-navy/10 bg-elociv-blue/15 py-12 sm:py-16 lg:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-bold text-elociv-plum">
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
                Oportunidades
              </li>
            </ol>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-3xl">
              <Badge variant="yellow" dotColor="navy">
                Oportunidades
              </Badge>
              <h1 className="mt-5 text-4xl font-heading font-bold leading-tight text-elociv-navy sm:text-5xl lg:text-6xl">
                Encontre oportunidades para construir sua trajetória
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Explore cursos, oficinas, mentorias, voluntariado e ações
                comunitárias para jovens. Use os filtros para encontrar
                experiências alinhadas ao seu território e aos seus interesses.
              </p>
            </div>

            <Card variant="surface" className="p-5">
              <Badge variant="plum" showDot={false} className="w-fit">
                Dados demonstrativos do protótipo
              </Badge>
              <p className="mt-3 text-sm leading-relaxed text-elociv-navy">
                As oportunidades apresentadas nesta versão são fictícias e servem
                exclusivamente para demonstrar a experiência da plataforma.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <Container className="flex flex-col gap-8">
          <Card className="p-5 sm:p-6">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 text-elociv-plum">
                <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
                <h2 className="text-xl font-heading font-bold text-elociv-navy">
                  Busca e filtros
                </h2>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="opportunity-search"
                    className="text-xs font-heading font-bold uppercase tracking-wider text-elociv-plum"
                  >
                    Buscar
                  </label>
                  <div className="relative">
                    <Search
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-elociv-plum"
                      aria-hidden="true"
                    />
                    <input
                      id="opportunity-search"
                      type="search"
                      value={search}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setSearch(event.target.value)
                      }
                      placeholder="Buscar por oportunidade, tema ou instituição"
                      className="h-12 w-full rounded-xl border border-elociv-navy/15 bg-elociv-ivory px-4 pl-11 text-sm font-semibold text-elociv-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-elociv-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    />
                  </div>
                </div>

                <FilterSelect
                  id="opportunity-category"
                  label="Categoria"
                  value={category}
                  placeholder="Todas"
                  options={opportunityCategories}
                  onChange={setCategory}
                />
                <FilterSelect
                  id="opportunity-modality"
                  label="Modalidade"
                  value={modality}
                  placeholder="Todas"
                  options={opportunityModalities}
                  onChange={setModality}
                />
                <FilterSelect
                  id="opportunity-state"
                  label="Estado"
                  value={state}
                  placeholder="Todos"
                  options={opportunityStates}
                  onChange={setState}
                />
                <FilterSelect
                  id="opportunity-age-range"
                  label="Faixa etária"
                  value={ageRange}
                  placeholder="Todas"
                  options={opportunityAgeRanges}
                  onChange={setAgeRange}
                />
              </div>

              {hasActiveFilters && (
                <div className="flex flex-col gap-3 border-t border-elociv-navy/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-muted-foreground">
                    Filtros ativos: {activeFilterLabels.join(', ')}
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-elociv-navy/20 px-4 text-sm font-heading font-bold text-elociv-navy transition-colors hover:bg-elociv-navy hover:text-elociv-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
                  >
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>
          </Card>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-lg font-heading font-bold text-elociv-navy"
              aria-live="polite"
            >
              {resultCountLabel}
            </p>
            {hasActiveFilters && (
              <p className="text-sm font-semibold text-muted-foreground">
                Resultado filtrado por critérios demonstrativos.
              </p>
            )}
          </div>

          {filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center gap-4 px-5 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-elociv-pink/35 text-elociv-plum">
                <SearchX className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-elociv-navy">
                  Nenhuma oportunidade encontrada
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Não encontramos oportunidades com esses critérios. Tente
                  remover alguns filtros ou fazer uma nova busca.
                </p>
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-elociv-navy px-5 text-sm font-heading font-bold text-elociv-ivory shadow-md transition-colors hover:bg-elociv-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Limpar filtros
              </button>
            </Card>
          )}
        </Container>
      </section>
    </>
  )
}

const opportunityFaqs = [
  {
    question: 'Como faço para participar?',
    answer:
      'Clique em "Demonstrar interesse". Na versão final, o EloCiv direcionará você ao canal oficial da instituição responsável pela inscrição.',
  },
  {
    question: 'O EloCiv realiza a seleção dos participantes?',
    answer:
      'Não. Cada organização define seus próprios critérios, prazos e processo de seleção. O EloCiv facilita a descoberta da oportunidade e o encaminhamento.',
  },
  {
    question: 'Receberei uma credencial após participar?',
    answer:
      'A credencial poderá ser emitida depois que a instituição confirmar a conclusão da atividade e o atendimento aos critérios definidos.',
  },
  {
    question: 'Meus dados pessoais serão publicados na blockchain?',
    answer:
      'Não. Dados pessoais e informações sensíveis permanecem fora da blockchain. Apenas provas criptográficas mínimas poderão ser utilizadas para verificar a origem e a integridade da credencial.',
  },
]

const credentialPoints = [
  {
    title: 'Emitida por instituição verificada',
    description: 'Somente uma organização autorizada pode confirmar a participação.',
  },
  {
    title: 'Vinculada ao jovem',
    description:
      'A credencial pertence à trajetória do participante e não pode ser transferida para outra pessoa.',
  },
  {
    title: 'Verificável e portátil',
    description:
      'A origem e a integridade do reconhecimento poderão ser verificadas mesmo fora da plataforma EloCiv.',
  },
]

function DetailBreadcrumb({ currentLabel }: { currentLabel: string }) {
  return (
    <nav aria-label="Navegação estrutural" className="mb-8">
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
        <li
          aria-current="page"
          className="min-w-0 max-w-full truncate text-elociv-navy sm:max-w-sm"
          title={currentLabel}
        >
          {currentLabel}
        </li>
      </ol>
    </nav>
  )
}

function OpportunityVisual({ opportunity }: { opportunity: Opportunity }) {
  const Icon = categoryIcons[opportunity.category]

  return (
    <div
      className={cn(
        'relative min-h-72 overflow-hidden rounded-3xl border-2 border-elociv-navy/15 p-6 shadow-sm',
        visualVariantClasses[opportunity.visualVariant],
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-8 top-8 h-16 w-16 rotate-45 rounded-xl border-2 border-current/20" />
        <div className="absolute right-10 top-10 h-24 w-24 rounded-[2rem] border-2 border-current/20" />
        <div className="absolute bottom-10 left-16 h-2 w-40 rotate-[-18deg] rounded-full bg-current/15" />
        <div className="absolute bottom-14 right-16 h-12 w-12 rotate-45 rounded-xl bg-elociv-ivory/25" />
      </div>
      <div className="relative flex h-full min-h-60 flex-col justify-between">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-elociv-ivory/85 px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider text-elociv-navy">
            EloCiv
          </span>
          <span
            className={cn(
              'h-4 w-4 rounded-full',
              visualAccentClasses[opportunity.visualVariant],
            )}
          />
        </div>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-heading font-bold uppercase tracking-wider opacity-80">
              Área da oportunidade
            </p>
            <p className="mt-2 max-w-xs text-4xl font-heading font-bold leading-none">
              {opportunity.category}
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-elociv-ivory/90 text-elociv-navy shadow-md">
            <Icon className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="scroll-mt-28">
      <Card className="p-5 sm:p-6 md:p-8">
        <h2 className="text-3xl font-heading font-bold leading-tight text-elociv-navy">
          {title}
        </h2>
        <div className="mt-5">{children}</div>
      </Card>
    </section>
  )
}

function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: LucideIcon
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-elociv-plum" aria-hidden="true" />
      <div>
        <dt className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-0.5 text-sm font-bold text-elociv-navy">{value}</dd>
      </div>
    </div>
  )
}

function getRelatedOpportunities(currentOpportunity: Opportunity) {
  return opportunities
    .filter((opportunity) => opportunity.id !== currentOpportunity.id)
    .sort((first, second) => {
      const firstScore =
        (first.category === currentOpportunity.category ? 2 : 0) +
        (first.modality === currentOpportunity.modality ? 1 : 0)
      const secondScore =
        (second.category === currentOpportunity.category ? 2 : 0) +
        (second.modality === currentOpportunity.modality ? 1 : 0)

      return secondScore - firstScore
    })
    .slice(0, 3)
}

function OpportunityNotFound() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <DetailBreadcrumb currentLabel="Oportunidade não encontrada" />
        <Card className="mx-auto max-w-3xl text-center">
          <Badge variant="yellow" showDot={false}>
            Oportunidades
          </Badge>
          <h1 className="mt-5 text-4xl font-heading font-bold leading-tight text-elociv-navy sm:text-5xl">
            Oportunidade não encontrada
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A oportunidade que você procura não está disponível ou o endereço
            informado está incorreto.
          </p>
          <a
            href="/oportunidades"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-elociv-navy px-5 text-sm font-heading font-bold text-elociv-ivory shadow-md transition-colors hover:bg-elociv-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Voltar para oportunidades
          </a>
        </Card>
      </Container>
    </section>
  )
}

export function OpportunityDetailPage({ slug }: { slug: string }) {
  const opportunity = opportunities.find((item) => item.slug === slug)
  const [interestShown, setInterestShown] = useState(false)

  if (!opportunity) {
    return <OpportunityNotFound />
  }

  const relatedOpportunities = getRelatedOpportunities(opportunity)

  return (
    <>
      <section className="relative overflow-hidden border-b border-elociv-navy/10 bg-elociv-blue/15 py-10 sm:py-14 lg:py-16">
        <Container>
          <DetailBreadcrumb currentLabel={opportunity.title} />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <Badge variant="blue" showDot={false}>
                  {opportunity.category}
                </Badge>
                <Badge variant="outline" showDot={false}>
                  {opportunity.modality}
                </Badge>
                {opportunity.organizationVerified && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-elociv-yellow px-4 py-1.5 text-xs font-heading font-bold uppercase tracking-wider text-elociv-navy">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    Instituição verificada
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-4xl font-heading font-bold leading-tight text-elociv-navy sm:text-5xl lg:text-6xl">
                {opportunity.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {opportunity.summary}
              </p>
              <p className="mt-5 text-sm font-bold text-elociv-plum sm:text-base">
                Oferecida por: {opportunity.organization}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm font-bold text-elociv-navy">
                <span className="inline-flex items-center gap-2 rounded-full border border-elociv-navy/15 bg-elociv-ivory px-4 py-2">
                  <MapPin className="h-4 w-4 text-elociv-plum" aria-hidden="true" />
                  {opportunity.locationLabel}
                </span>
                {opportunity.ods.map((ods) => (
                  <Badge
                    key={ods}
                    variant="pink"
                    showDot={false}
                    className="px-3 py-2"
                  >
                    ODS {ods}
                  </Badge>
                ))}
              </div>
            </div>

            <OpportunityVisual opportunity={opportunity} />
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
            <div className="flex flex-col gap-8">
              <DetailSection title="Sobre a oportunidade">
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                  {opportunity.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </DetailSection>

              <DetailSection title="O que você vai vivenciar">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {opportunity.activities.map((activity) => (
                    <li key={activity} className="flex gap-3 text-sm text-elociv-navy">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elociv-blue/45">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="font-semibold leading-relaxed">{activity}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection title="Requisitos para participar">
                <ul className="space-y-3">
                  {opportunity.requirements.map((requirement) => (
                    <li key={requirement} className="flex gap-3 text-sm text-elociv-navy">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-elociv-plum" aria-hidden="true" />
                      <span className="leading-relaxed">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection title="Acessibilidade e inclusão">
                <ul className="space-y-3">
                  {opportunity.accessibility.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-elociv-navy">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-elociv-plum" aria-hidden="true" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Informações demonstrativas do protótipo. Na versão final, a
                  instituição responsável deverá confirmar os recursos disponíveis.
                </p>
              </DetailSection>

              <section className="scroll-mt-28">
                <Card variant="navy" className="p-5 sm:p-6 md:p-8">
                  {opportunity.credentialAvailable && (
                    <Badge variant="yellow" showDot={false}>
                      Credencial disponível após confirmação
                    </Badge>
                  )}
                  <h2 className="mt-5 text-3xl font-heading font-bold leading-tight text-elociv-ivory">
                    Sua participação pode fazer parte da sua trajetória cívica
                  </h2>
                  <div className="mt-4 space-y-3 text-base leading-relaxed text-elociv-ivory/80">
                    <p>
                      Depois da conclusão da atividade, a instituição responsável
                      poderá confirmar sua participação e emitir uma credencial
                      verificável para a sua carteira cívica EloCiv.
                    </p>
                    <p>
                      A credencial registra o reconhecimento da experiência sem
                      publicar dados pessoais ou informações sensíveis na
                      blockchain.
                    </p>
                  </div>
                  {opportunity.slug === 'oficina-introducao-programacao' && (
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
                      <a
                        href="/credenciais/credencial-oficina-introducao-programacao"
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-elociv-blue px-5 py-3 text-sm font-heading font-bold text-elociv-navy shadow-sm transition-colors hover:bg-elociv-blue/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
                      >
                        Visualizar exemplo de credencial
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <span className="text-xs font-semibold leading-relaxed text-elociv-ivory/65">
                        Demonstração com dados fictícios.
                      </span>
                    </div>
                  )}
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {credentialPoints.map((point) => (
                      <div
                        key={point.title}
                        className="rounded-2xl border border-elociv-ivory/15 bg-elociv-ivory/5 p-4"
                      >
                        <h3 className="text-lg font-heading font-bold text-elociv-yellow">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-elociv-ivory/75">
                          {point.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              <DetailSection title="Perguntas frequentes">
                <div className="divide-y divide-elociv-navy/10">
                  {opportunityFaqs.map((faq) => (
                    <details key={faq.question} className="group py-4">
                      <summary className="cursor-pointer rounded-lg text-base font-heading font-bold text-elociv-navy marker:text-elociv-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        {faq.question}
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </DetailSection>
            </div>

            <aside className="order-first flex flex-col gap-5 lg:order-last lg:sticky lg:top-28">
              <Card className="p-5 sm:p-6">
                <Badge variant="plum" showDot={false}>
                  {opportunity.applicationStatus}
                </Badge>
                <button
                  type="button"
                  onClick={() => setInterestShown(true)}
                  className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-elociv-navy px-5 text-sm font-heading font-bold text-elociv-ivory shadow-md transition-colors hover:bg-elociv-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {interestShown ? 'Interesse demonstrado' : 'Demonstrar interesse'}
                </button>

                {interestShown && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-4 rounded-2xl border border-elociv-blue/50 bg-elociv-blue/20 p-4 text-sm text-elociv-navy"
                  >
                    <p className="font-heading font-bold">
                      Interesse demonstrado no protótipo
                    </p>
                    <p className="mt-2 leading-relaxed">
                      Na versão final do EloCiv, você será direcionado ao canal
                      oficial da instituição responsável para continuar o processo
                      de inscrição.
                    </p>
                    <p className="mt-2 leading-relaxed">
                      O EloCiv conecta você à oportunidade, mas a seleção e a
                      inscrição continuam sob responsabilidade da organização.
                    </p>
                  </div>
                )}

                <dl className="mt-6 grid gap-4 border-t border-elociv-navy/10 pt-5">
                  <InfoRow label="Modalidade" value={opportunity.modality} icon={Laptop} />
                  <InfoRow label="Localização" value={opportunity.locationLabel} icon={MapPin} />
                  <InfoRow label="Faixa etária" value={opportunity.ageRange} icon={UsersRound} />
                  <InfoRow label="Período" value={opportunity.period} icon={CalendarDays} />
                  <InfoRow label="Duração" value={opportunity.duration} icon={Clock3} />
                  <InfoRow label="Categoria" value={opportunity.category} icon={BookOpen} />
                  <InfoRow label="Instituição" value={opportunity.organization} icon={BadgeCheck} />
                </dl>

                <div className="mt-5 border-t border-elociv-navy/10 pt-5">
                  <p className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
                    ODS relacionados
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {opportunity.ods.map((ods) => (
                      <Badge
                        key={ods}
                        variant="pink"
                        showDot={false}
                        className="px-3 py-1"
                      >
                        ODS {ods}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-elociv-yellow/45 px-4 py-3 text-sm font-bold text-elociv-navy">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Instituição verificada
                </div>
              </Card>

              <Card variant="surface" className="p-5">
                <Badge variant="plum" showDot={false}>
                  Dados demonstrativos
                </Badge>
                <p className="mt-3 text-sm leading-relaxed text-elociv-navy">
                  Esta oportunidade e a instituição apresentada são fictícias e
                  foram criadas exclusivamente para demonstrar a experiência da
                  plataforma EloCiv.
                </p>
              </Card>

              <Card className="p-5">
                <h2 className="text-2xl font-heading font-bold text-elociv-navy">
                  Sobre a instituição
                </h2>
                <div className="mt-4 flex items-center gap-2 text-sm font-bold text-elociv-plum">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span>{opportunity.organization}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Organização demonstrativa cadastrada no EloCiv para publicar
                  oportunidades e reconhecer participações juvenis.
                </p>
                <p className="mt-3 text-xs font-semibold leading-relaxed text-muted-foreground">
                  Dados institucionais fictícios usados apenas no protótipo.
                </p>
              </Card>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-elociv-navy/10 bg-elociv-blue/10 py-10 sm:py-12 lg:py-14">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="yellow" showDot={false}>
                Oportunidades
              </Badge>
              <h2 className="mt-4 text-3xl font-heading font-bold text-elociv-navy sm:text-4xl">
                Outras oportunidades para você explorar
              </h2>
            </div>
            <a
              href="/oportunidades"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-elociv-navy/20 px-5 text-sm font-heading font-bold text-elociv-navy transition-colors hover:bg-elociv-navy hover:text-elociv-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
            >
              Ver todas as oportunidades
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {relatedOpportunities.map((relatedOpportunity) => (
              <OpportunityCard
                key={relatedOpportunity.id}
                opportunity={relatedOpportunity}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
