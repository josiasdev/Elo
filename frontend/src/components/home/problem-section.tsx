import { MapPin, Puzzle, ShieldAlert } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'
import { homeContent } from '@/content/home-content'

export function ProblemSection() {
  const { problem } = homeContent
  const icons = [
    <Puzzle className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <MapPin className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <ShieldAlert className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
  ]

  return (
    <section
      id={problem.id}
      className="py-20 lg:py-28 bg-elociv-blue/10 border-y border-elociv-navy/10 relative overflow-hidden"
    >
      <Container className="flex flex-col gap-14 lg:gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              label={problem.label}
              title={problem.title}
              badgeVariant="pink"
              className="max-w-xl"
            />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4 text-base sm:text-lg text-muted-foreground leading-relaxed pt-1">
            {problem.paragraphs.map((paragraph, idx) => (
              <p
                key={paragraph}
                className={idx === 0 ? 'font-semibold text-elociv-navy text-lg sm:text-xl' : ''}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problem.cards.map((card, idx) => (
            <Card
              key={card.title}
              variant="default"
              className="flex h-full flex-col gap-5 bg-background border-2 border-elociv-navy/15"
            >
              <div className="h-14 w-14 rounded-2xl bg-elociv-yellow/70 flex items-center justify-center shrink-0 border border-elociv-navy/15">
                {icons[idx] ?? icons[0]}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-elociv-navy">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="rounded-2xl bg-elociv-navy text-elociv-ivory p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-elociv-navy/50">
          <div className="flex items-center gap-3 shrink-0">
            <span className="h-3 w-3 rounded-full bg-elociv-yellow" aria-hidden="true" />
            <h3 className="text-base sm:text-lg font-heading font-bold uppercase tracking-wider text-elociv-ivory">
              Valores fundamentais
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-6">
            {problem.values.map((value) => (
              <span
                key={value}
                className="bg-elociv-ivory/10 text-elociv-ivory text-xs sm:text-sm font-bold px-4 py-2 rounded-xl border border-elociv-ivory/20"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
