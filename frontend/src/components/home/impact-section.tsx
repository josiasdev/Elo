import { Building2, HandHeart, Landmark, UserRound } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'
import { homeContent } from '@/content/home-content'

export function ImpactSection() {
  const { impact } = homeContent
  const icons = [
    <UserRound className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <Building2 className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <Landmark className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <HandHeart className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
  ]

  return (
    <section id={impact.id} className="py-20 lg:py-28 bg-elociv-blue/10 border-y border-elociv-navy/10">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            label={impact.label}
            title={impact.title}
            description={impact.description}
            align="center"
            badgeVariant="pink"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impact.blocks.map((block, idx) => (
            <Card key={block.title} className="bg-background flex flex-col gap-5">
              <div className="h-13 w-13 rounded-2xl bg-elociv-yellow/70 flex items-center justify-center border border-elociv-navy/10">
                {icons[idx] ?? icons[0]}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-heading font-bold text-elociv-navy">
                  {block.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {block.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
