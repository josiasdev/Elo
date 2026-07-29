import type { ReactNode } from 'react'
import { useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Eye,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import {
  mapTotals,
  remoteOpportunityCategories,
  stateOpportunityData,
  type MapOpportunityCategory,
  type MapOpportunityFrequency,
  type StateOpportunityData,
} from '@/data/opportunity-map-data'
import { cn } from '@/lib/utils'

type FilterState = {
  category: MapOpportunityCategory | ''
  ods: number | ''
  modality: 'Presencial' | 'Remoto'
  frequency: MapOpportunityFrequency | ''
}

const categories: Array<MapOpportunityCategory | 'Todas'> = [
  'Todas',
  'Ativismo',
  'Curso',
  'Mentoria',
  'Voluntariado',
  'Projeto cultural',
  'Oficina',
]

const odsOptions = ['Todos', 1, 4, 8, 9, 10, 11, 16, 17] as const
const frequencyOptions: Array<MapOpportunityFrequency | 'Todas'> = [
  'Todas',
  'Contínua',
  'Pontual',
]

const defaultFilters: FilterState = {
  category: '',
  ods: '',
  modality: 'Presencial',
  frequency: '',
}

const territorialPoints = [
  {
    title: 'Visibilidade territorial',
    description:
      'Ajuda a identificar onde existem atividades e onde a oferta ainda é limitada.',
    icon: Eye,
  },
  {
    title: 'Planejamento de novas ações',
    description:
      'Organizações podem observar territórios que precisam de mais cursos, oficinas, mentorias e projetos.',
    icon: Target,
  },
  {
    title: 'Dados protegidos',
    description:
      'As análises territoriais utilizam informações agregadas, sem expor nomes, contatos ou trajetórias individuais.',
    icon: ShieldCheck,
  },
]

function getDensityLevel(count: number) {
  if (count <= 5) return 'low'
  if (count <= 12) return 'moderate'
  return 'high'
}

function getHexPoints(x: number, y: number, size = 43) {
  return Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 180) * (60 * index - 30)
    return `${x + size * Math.cos(angle)},${y + size * Math.sin(angle)}`
  }).join(' ')
}

function matchesFilters(state: StateOpportunityData, filters: FilterState) {
  return (
    (!filters.category || state.categories.includes(filters.category)) &&
    (!filters.ods || state.ods.includes(filters.ods)) &&
    (!filters.frequency || state.frequencies.includes(filters.frequency))
  )
}

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
          Mapa
        </li>
      </ol>
    </nav>
  )
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className="p-5 sm:p-6">
      <dt className="text-4xl font-heading font-bold leading-none text-elociv-navy">
        {value}
      </dt>
      <dd className="mt-2 text-sm font-bold leading-snug text-muted-foreground">
        {label}
      </dd>
    </Card>
  )
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-h-9 items-center justify-center rounded-xl border px-3 py-2 text-xs font-heading font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        active
          ? 'border-elociv-navy bg-elociv-navy text-elociv-ivory'
          : 'border-elociv-navy/15 bg-elociv-ivory text-elociv-navy hover:border-elociv-plum',
      )}
    >
      {children}
    </button>
  )
}

function FiltersPanel({
  filters,
  activeFilterCount,
  onChange,
  onClear,
}: {
  filters: FilterState
  activeFilterCount: number
  onChange: (filters: FilterState) => void
  onClear: () => void
}) {
  return (
    <div className="grid gap-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-elociv-plum">
          <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
          <h2 className="text-xl font-heading font-bold text-elociv-navy">
            Filtros
          </h2>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={activeFilterCount === 0}
          onClick={onClear}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Limpar filtros
        </Button>
      </div>

      <fieldset>
        <legend className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
          Categoria
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => (
            <FilterButton
              key={category}
              active={
                category === 'Todas'
                  ? filters.category === ''
                  : filters.category === category
              }
              onClick={() =>
                onChange({
                  ...filters,
                  category: category === 'Todas' ? '' : category,
                })
              }
            >
              {category}
            </FilterButton>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
          ODS
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {odsOptions.map((ods) => (
            <FilterButton
              key={ods}
              active={ods === 'Todos' ? filters.ods === '' : filters.ods === ods}
              onClick={() =>
                onChange({
                  ...filters,
                  ods: ods === 'Todos' ? '' : ods,
                })
              }
            >
              {ods === 'Todos' ? 'Todos' : `ODS ${ods}`}
            </FilterButton>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
          Modalidade
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(['Presencial', 'Remoto'] as const).map((modality) => (
            <FilterButton
              key={modality}
              active={filters.modality === modality}
              onClick={() => onChange({ ...filters, modality })}
            >
              {modality}
            </FilterButton>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
          Frequência
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {frequencyOptions.map((frequency) => (
            <FilterButton
              key={frequency}
              active={
                frequency === 'Todas'
                  ? filters.frequency === ''
                  : filters.frequency === frequency
              }
              onClick={() =>
                onChange({
                  ...filters,
                  frequency: frequency === 'Todas' ? '' : frequency,
                })
              }
            >
              {frequency}
            </FilterButton>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

function BrazilHexMap({
  selectedUf,
  compatibleUfs,
  remoteMode,
  onSelect,
}: {
  selectedUf: string
  compatibleUfs: Set<string>
  remoteMode: boolean
  onSelect: (uf: string) => void
}) {
  return (
    <svg
      viewBox="0 0 850 940"
      role="img"
      aria-labelledby="hex-map-title hex-map-description"
      className="h-auto w-full max-w-3xl"
    >
      <title id="hex-map-title">Cartograma hexagonal do Brasil</title>
      <desc id="hex-map-description">
        Cartograma esquemático do Brasil formado por 27 hexágonos, um para cada
        unidade federativa.
      </desc>
      {stateOpportunityData.map((state) => {
        const density = getDensityLevel(state.count)
        const selected = selectedUf === state.uf
        const compatible = compatibleUfs.has(state.uf)
        const fillClass =
          density === 'low'
            ? 'fill-elociv-pink/70'
            : density === 'moderate'
              ? 'fill-elociv-blue/55'
              : 'fill-elociv-blue'

        return (
          <g
            key={state.uf}
            role="button"
            tabIndex={0}
            aria-pressed={selected}
            aria-label={`${state.name}, ${state.count} oportunidades presenciais`}
            onClick={() => onSelect(state.uf)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect(state.uf)
              }
            }}
            className={cn(
              'cursor-pointer outline-none transition-transform motion-safe:hover:scale-[1.02]',
              remoteMode && 'opacity-50',
              !remoteMode && !compatible && 'opacity-35',
            )}
          >
            <polygon
              points={getHexPoints(state.x, state.y)}
              className={cn(
                'stroke-elociv-navy/40 stroke-[3] transition-colors',
                fillClass,
                selected && 'stroke-elociv-yellow stroke-[8]',
              )}
            />
            {selected && (
              <circle
                cx={state.x + 31}
                cy={state.y - 31}
                r="9"
                className="fill-elociv-yellow stroke-elociv-navy stroke-[2]"
                aria-hidden="true"
              />
            )}
            <text
              x={state.x}
              y={state.y - 6}
              textAnchor="middle"
              className="pointer-events-none fill-elociv-navy text-[20px] font-bold"
            >
              {state.uf}
            </text>
            <text
              x={state.x}
              y={state.y + 19}
              textAnchor="middle"
              className="pointer-events-none fill-elociv-navy text-[18px] font-bold"
            >
              {state.count}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function RemotePanel() {
  const maxCount = Math.max(
    ...remoteOpportunityCategories.map((category) => category.count),
  )

  return (
    <div>
      <Badge variant="blue" showDot={false}>
        Disponível nacionalmente
      </Badge>
      <h2 className="mt-4 text-3xl font-heading font-bold text-elociv-navy">
        Oportunidades remotas
      </h2>
      <p className="mt-2 text-5xl font-heading font-bold text-elociv-navy">
        {mapTotals.remote}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Oportunidades demonstrativas acessíveis a jovens de diferentes estados,
        conforme os critérios definidos por cada instituição.
      </p>
      <div className="mt-6 grid gap-4">
        {remoteOpportunityCategories.map((category) => (
          <div key={category.label}>
            <div className="flex items-center justify-between gap-3 text-sm font-bold text-elociv-navy">
              <span>{category.label}</span>
              <span>{category.count}</span>
            </div>
            <div
              className="mt-2 h-3 rounded-full bg-elociv-blue/18"
              role="img"
              aria-label={`${category.label}: ${category.count} oportunidades remotas`}
            >
              <div
                className="h-3 rounded-full bg-elociv-plum"
                style={{ width: `${(category.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <a
        href="/oportunidades?modalidade=Online"
        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-elociv-navy px-5 text-sm font-heading font-bold text-elociv-ivory shadow-md transition-colors hover:bg-elociv-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Ver oportunidades remotas
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  )
}

function TerritoryPanel({
  selectedState,
}: {
  selectedState: StateOpportunityData | undefined
}) {
  if (!selectedState) {
    return (
      <div>
        <Badge variant="yellow" showDot={false}>
          Painel territorial
        </Badge>
        <h2 className="mt-4 text-3xl font-heading font-bold text-elociv-navy">
          Selecione um território
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Clique em uma UF no mapa para visualizar um resumo das oportunidades
          demonstrativas daquele estado.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Você também pode explorar oportunidades remotas disponíveis em todo o
          Brasil.
        </p>
      </div>
    )
  }

  return (
    <div>
      <Badge variant="yellow" showDot={false}>
        {selectedState.uf}
      </Badge>
      <h2 className="mt-4 text-3xl font-heading font-bold text-elociv-navy">
        {selectedState.name}
      </h2>
      <p className="mt-2 text-4xl font-heading font-bold text-elociv-navy">
        {selectedState.count}
      </p>
      <p className="text-sm font-bold text-muted-foreground">
        oportunidades presenciais
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Este território também pode acessar oportunidades remotas disponíveis
        nacionalmente.
      </p>

      <div className="mt-6">
        <p className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
          Categorias em destaque
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedState.categories.map((category) => (
            <Badge
              key={category}
              variant="blue"
              showDot={false}
              className="normal-case tracking-normal"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">
          ODS relacionados
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedState.ods.map((ods) => (
            <Badge key={ods} variant="pink" showDot={false} className="px-3 py-1">
              ODS {ods}
            </Badge>
          ))}
        </div>
      </div>

      <a
        href={`/oportunidades?estado=${selectedState.uf}`}
        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-elociv-navy px-5 text-sm font-heading font-bold text-elociv-ivory shadow-md transition-colors hover:bg-elociv-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Ver oportunidades no {selectedState.name}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  )
}

export function OpportunitiesMapPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [selectedUf, setSelectedUf] = useState('')
  const mapRef = useRef<HTMLDivElement>(null)

  const selectedState = stateOpportunityData.find(
    (state) => state.uf === selectedUf,
  )
  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.ods ? 1 : 0) +
    (filters.frequency ? 1 : 0) +
    (filters.modality === 'Remoto' ? 1 : 0)
  const remoteMode = filters.modality === 'Remoto'

  const compatibleStates = useMemo(
    () => stateOpportunityData.filter((state) => matchesFilters(state, filters)),
    [filters],
  )
  const compatibleUfs = useMemo(
    () => new Set(compatibleStates.map((state) => state.uf)),
    [compatibleStates],
  )

  const handleClearFilters = () => setFilters(defaultFilters)

  return (
    <>
      <section
        id="inicio-mapa"
        className="border-b border-elociv-navy/10 bg-elociv-blue/12 py-6"
      >
        <Container>
          <Breadcrumb />
        </Container>
      </section>

      <section className="relative overflow-hidden bg-elociv-ivory py-10 sm:py-12 lg:py-14">
        <Container className="grid gap-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div className="max-w-4xl">
              <Badge variant="blue" showDot={false}>
                MAPA DE OPORTUNIDADES
              </Badge>
              <h1 className="mt-5 text-4xl font-heading font-bold leading-tight text-elociv-navy sm:text-5xl lg:text-6xl">
                Explore oportunidades em diferentes territórios
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Visualize onde existem atividades presenciais, descubra opções
                remotas e identifique territórios que ainda precisam de novas
                oportunidades.
              </p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-elociv-plum">
                O mapa é uma representação esquemática e não corresponde aos
                limites geográficos exatos dos estados.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/oportunidades"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-elociv-navy px-5 text-sm font-heading font-bold text-elociv-ivory shadow-md transition-colors hover:bg-elociv-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
                >
                  Ver em lista
                </a>
                <button
                  type="button"
                  onClick={() => mapRef.current?.scrollIntoView({ block: 'start' })}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl border-2 border-elociv-navy px-5 text-sm font-heading font-bold text-elociv-navy transition-colors hover:bg-elociv-navy hover:text-elociv-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
                >
                  Explorar o mapa
                </button>
              </div>
            </div>

            <Card variant="surface" className="p-5">
              <Badge variant="yellow" showDot={false}>
                Dados demonstrativos
              </Badge>
              <p className="mt-3 text-sm leading-relaxed text-elociv-navy">
                Os números e oportunidades apresentados nesta tela são fictícios
                e servem exclusivamente para demonstrar a experiência territorial
                do EloCiv.
              </p>
            </Card>
          </div>

          <dl className="grid gap-4 md:grid-cols-3">
            <MetricCard
              value={mapTotals.inPerson.toString()}
              label="Oportunidades presenciais"
            />
            <MetricCard
              value={mapTotals.remote.toString()}
              label="Oportunidades remotas"
            />
            <MetricCard
              value={mapTotals.representedStates}
              label="UFs representadas"
            />
          </dl>
          <p className="text-sm font-semibold text-muted-foreground">
            Dados fictícios do protótipo
          </p>
        </Container>
      </section>

      <section ref={mapRef} className="py-10 sm:py-12 lg:py-14">
        <Container className="grid gap-6">
          <details className="lg:hidden">
            <summary className="cursor-pointer rounded-2xl border border-elociv-navy/15 bg-elociv-ivory p-4 text-base font-heading font-bold text-elociv-navy marker:text-elociv-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              Filtrar oportunidades
              {activeFilterCount > 0 && (
                <span className="ml-2 text-sm text-elociv-plum">
                  {activeFilterCount} filtros ativos
                </span>
              )}
            </summary>
            <Card className="mt-3 p-5">
              <FiltersPanel
                filters={filters}
                activeFilterCount={activeFilterCount}
                onChange={setFilters}
                onClear={handleClearFilters}
              />
            </Card>
          </details>

          <div className="grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)_22rem] lg:items-start">
            <Card className="hidden p-5 lg:block">
              <FiltersPanel
                filters={filters}
                activeFilterCount={activeFilterCount}
                onChange={setFilters}
                onClear={handleClearFilters}
              />
            </Card>

            <Card className="p-4 sm:p-6">
              <div className="mb-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_17rem] md:items-end">
                <div>
                  <h2 className="text-3xl font-heading font-bold text-elociv-navy">
                    Cartograma territorial
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    A intensidade representa o total presencial. Os filtros
                    destacam territórios compatíveis com o critério selecionado.
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="map-state-select"
                    className="text-xs font-heading font-bold uppercase tracking-wider text-elociv-plum"
                  >
                    Selecionar estado
                  </label>
                  <select
                    id="map-state-select"
                    value={selectedUf}
                    onChange={(event) => setSelectedUf(event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-elociv-navy/15 bg-elociv-ivory px-4 text-sm font-semibold text-elociv-navy outline-none transition-colors focus:border-elociv-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <option value="">Escolha uma UF</option>
                    {stateOpportunityData
                      .slice()
                      .sort((first, second) => first.name.localeCompare(second.name))
                      .map((state) => (
                        <option key={state.uf} value={state.uf}>
                          {state.name} ({state.uf})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center overflow-hidden rounded-2xl bg-elociv-blue/10 p-2 sm:p-4">
                <BrazilHexMap
                  selectedUf={selectedUf}
                  compatibleUfs={compatibleUfs}
                  remoteMode={remoteMode}
                  onSelect={setSelectedUf}
                />
              </div>

              <div className="mt-5 grid gap-3 text-sm text-elociv-navy sm:grid-cols-2 xl:grid-cols-4">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-elociv-pink" />
                  Baixa oferta
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-elociv-blue/55" />
                  Oferta moderada
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-elociv-blue" />
                  Maior oferta
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-4 border-elociv-yellow bg-elociv-ivory" />
                  Estado selecionado
                </div>
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              {remoteMode ? (
                <RemotePanel />
              ) : (
                <TerritoryPanel selectedState={selectedState} />
              )}
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-y border-elociv-navy/10 bg-elociv-blue/12 py-10 sm:py-12 lg:py-14">
        <Container>
          <Badge variant="plum" showDot={false}>
            INTELIGÊNCIA TERRITORIAL
          </Badge>
          <h2 className="mt-5 max-w-4xl text-3xl font-heading font-bold leading-tight text-elociv-navy sm:text-4xl">
            Quando uma oportunidade falta, essa ausência também importa.
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-muted-foreground">
            O EloCiv transforma informações agregadas sobre oferta de atividades
            em evidências que podem apoiar organizações, financiadores e gestores
            na criação de novas ações.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {territorialPoints.map((point) => {
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
        </Container>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <Container>
          <Card variant="navy" className="relative overflow-hidden p-6 sm:p-8">
            <Compass
              className="absolute right-8 top-8 h-24 w-24 text-elociv-blue/15"
              aria-hidden="true"
            />
            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-elociv-ivory/10 px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider text-elociv-yellow">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Próximo passo
              </div>
              <h2 className="mt-5 text-3xl font-heading font-bold leading-tight text-elociv-ivory sm:text-4xl">
                Encontre uma oportunidade para começar sua trajetória
              </h2>
              <p className="mt-4 text-base leading-relaxed text-elociv-ivory/78">
                Explore as experiências demonstrativas disponíveis na plataforma
                EloCiv.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/oportunidades"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-elociv-yellow px-5 text-sm font-heading font-bold text-elociv-navy shadow-sm transition-colors hover:bg-elociv-yellow/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
                >
                  Ver oportunidades em lista
                </a>
                <a
                  href="#inicio-mapa"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-elociv-ivory/30 px-5 text-sm font-heading font-bold text-elociv-ivory transition-colors hover:bg-elociv-ivory hover:text-elociv-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
                >
                  Voltar ao topo
                </a>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </>
  )
}
