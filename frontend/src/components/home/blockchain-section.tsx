import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  EyeOff,
  KeyRound,
  Network,
  ShieldCheck,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { homeContent } from '@/content/home-content'

export function BlockchainSection() {
  const { blockchain } = homeContent
  const pillarIcons = [
    <KeyRound className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <Network className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <BadgeCheck className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <EyeOff className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
  ]

  return (
    <section
      id={blockchain.id}
      className="py-20 lg:py-28 bg-elociv-navy text-elociv-ivory relative overflow-hidden"
    >
      <div
        className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-elociv-yellow via-elociv-pink to-elociv-blue"
        aria-hidden="true"
      />

      <Container className="flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Badge variant="yellow" dotColor="navy" className="w-fit">
              {blockchain.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight text-elociv-ivory leading-[1.12]">
              {blockchain.title}
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-5 text-base sm:text-lg leading-relaxed text-elociv-ivory/82">
            {blockchain.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blockchain.pillars.map((pillar, idx) => (
            <Card
              key={pillar.title}
              variant="default"
              className="bg-elociv-ivory text-elociv-navy border-elociv-blue/30 p-6 flex flex-col gap-4"
            >
              <div className="h-13 w-13 rounded-2xl bg-elociv-blue/40 flex items-center justify-center border border-elociv-navy/10">
                {pillarIcons[idx] ?? pillarIcons[0]}
              </div>
              <h3 className="text-xl font-heading font-bold text-elociv-navy leading-tight">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="rounded-2xl border border-elociv-yellow/40 bg-elociv-yellow/12 p-6 md:p-8 flex flex-col md:flex-row gap-4 md:items-center">
          <ShieldCheck className="h-8 w-8 text-elociv-yellow shrink-0" aria-hidden="true" />
          <p className="text-base sm:text-lg font-semibold text-elociv-ivory leading-relaxed">
            {blockchain.callout}
          </p>
        </div>

        <div className="rounded-3xl border border-elociv-ivory/15 bg-elociv-ivory/6 p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {blockchain.flow.map((item, idx) => (
              <div key={item} className="flex flex-col lg:flex-row lg:items-center gap-4 flex-1">
                <div className="min-h-28 flex flex-col justify-center rounded-2xl bg-elociv-ivory text-elociv-navy border border-elociv-blue/30 p-5 shadow-sm">
                  <span className="text-xs font-bold text-elociv-plum uppercase tracking-wider">
                    Fluxo 0{idx + 1}
                  </span>
                  <span className="mt-2 text-base font-heading font-bold leading-tight">
                    {item}
                  </span>
                </div>
                {idx < blockchain.flow.length - 1 && (
                  <ArrowRight
                    className="h-6 w-6 text-elociv-yellow shrink-0 self-center rotate-90 lg:rotate-0"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-elociv-ivory">
            {blockchain.comparison.title}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[blockchain.comparison.centralized, blockchain.comparison.elociv].map((column) => (
              <div
                key={column.title}
                className="rounded-2xl bg-elociv-ivory text-elociv-navy p-6 md:p-8 border border-elociv-blue/30"
              >
                <h4 className="text-2xl font-heading font-bold text-elociv-navy">
                  {column.title}
                </h4>
                <ul className="mt-6 flex flex-col gap-4">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm sm:text-base leading-relaxed">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 text-elociv-plum shrink-0"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-3xl border border-elociv-ivory/15 bg-elociv-plum/35 p-6 md:p-8">
          <div>
            <Badge variant="outline" dotColor="navy" className="bg-elociv-ivory text-elociv-navy">
              {blockchain.roadmapLabel}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {blockchain.roadmap.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-elociv-ivory text-elociv-navy p-5 border border-elociv-pink/30"
              >
                <h4 className="text-lg font-heading font-bold text-elociv-navy leading-tight">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
