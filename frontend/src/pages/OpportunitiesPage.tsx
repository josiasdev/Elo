import { useMemo, useState, type ChangeEvent } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
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

export function OpportunityDetailPlaceholder({ slug }: { slug: string }) {
  const opportunity = opportunities.find((item) => item.slug === slug)
  const title = opportunity?.title ?? 'Oportunidade'

  return (
    <section className="py-12 sm:py-16 lg:py-20">
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
            <li aria-current="page" className="text-elociv-navy">
              Detalhes
            </li>
          </ol>
        </nav>

        <Card className="mx-auto max-w-3xl text-center">
          <Badge variant="yellow" showDot={false}>
            Próxima etapa
          </Badge>
          <h1 className="mt-5 text-4xl font-heading font-bold leading-tight text-elociv-navy sm:text-5xl">
            Detalhes em construção
          </h1>
          <p className="mt-4 text-lg font-bold text-elociv-plum">{title}</p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Esta rota já está preparada para receber a página completa de
            detalhes da oportunidade na próxima etapa.
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
