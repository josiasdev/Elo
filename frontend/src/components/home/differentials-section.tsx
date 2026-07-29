import { BadgeCheck, DatabaseZap, EyeOff, ShieldCheck, WalletCards } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'
import { homeContent } from '@/content/home-content'

export function DifferentialsSection() {
  const { differentials } = homeContent
  const icons = [
    <WalletCards className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <ShieldCheck className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <EyeOff className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <BadgeCheck className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
    <DatabaseZap className="h-7 w-7 text-elociv-navy" aria-hidden="true" />,
  ]

  return (
    <section id={differentials.id} className="py-20 lg:py-28 relative overflow-hidden">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            label={differentials.label}
            title={differentials.title}
            description={differentials.description}
            align="center"
            badgeVariant="yellow"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {differentials.items.map((item, idx) => (
            <Card
              key={item.title}
              variant="surface"
              className="bg-elociv-ivory border-2 border-elociv-navy/15 p-6 flex flex-col gap-5"
            >
              <div className="h-13 w-13 rounded-2xl bg-elociv-blue/35 flex items-center justify-center border border-elociv-navy/10">
                {icons[idx] ?? icons[0]}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-heading font-bold text-elociv-navy leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
