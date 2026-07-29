import { Network } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'
import { homeContent } from '@/content/home-content'

export function PartnersSection() {
  const { partners } = homeContent

  return (
    <section
      id={partners.id}
      className="py-20 lg:py-28 bg-elociv-ivory border-y border-elociv-navy/10 relative overflow-hidden"
    >
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            label={partners.label}
            title={partners.title}
            description={partners.description}
            align="center"
            badgeVariant="blue"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {partners.items.map((partner) => (
            <Card
              key={partner.name}
              variant="default"
              className="min-h-56 bg-background border-2 border-elociv-navy/15 p-0"
            >
              <a
                href={partner.url}
                target="_blank"
                rel="noreferrer"
                className="flex h-full min-h-56 flex-col items-center justify-center gap-5 p-7 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={`Abrir site de ${partner.name} em nova aba`}
              >
                <div className="flex h-24 w-full items-center justify-center rounded-2xl bg-elociv-ivory p-4">
                  <img
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    className="max-h-32 w-full object-contain"
                    loading="lazy"
                  />
                </div>
                {/* <div className="flex items-center justify-center gap-2 text-elociv-navy">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold leading-tight">
                    {partner.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </div> */}
              </a>
            </Card>
          ))}
        </div>

        <div className="mx-auto w-full max-w-3xl rounded-2xl bg-elociv-blue/20 border border-elociv-blue/40 p-6 flex items-center justify-center gap-4 text-center">
          <Network className="h-6 w-6 text-elociv-navy shrink-0 hidden sm:block" aria-hidden="true" />
          <p className="text-sm sm:text-base font-medium text-elociv-navy">
            {partners.message}
          </p>
        </div>
      </Container>
    </section>
  )
}
