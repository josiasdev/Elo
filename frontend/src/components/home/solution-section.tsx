import {
  MapPinned,
  MousePointerClick,
  BadgeCheck,
  ChartNoAxesCombined,
  ArrowRight,
} from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { SectionHeading } from '@/components/ui/section-heading'
import { homeContent } from '@/content/home-content'

export function SolutionSection() {
  const { solution } = homeContent

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPinned':
        return <MapPinned className="h-8 w-8 text-elociv-navy" aria-hidden="true" />
      case 'MousePointerClick':
        return <MousePointerClick className="h-8 w-8 text-elociv-navy" aria-hidden="true" />
      case 'BadgeCheck':
        return <BadgeCheck className="h-8 w-8 text-elociv-navy" aria-hidden="true" />
      case 'ChartNoAxesCombined':
        return <ChartNoAxesCombined className="h-8 w-8 text-elociv-navy" aria-hidden="true" />
      default:
        return <BadgeCheck className="h-8 w-8 text-elociv-navy" aria-hidden="true" />
    }
  }

  return (
    <section id={solution.id} className="py-20 lg:py-28 relative overflow-hidden">
      <Container className="flex flex-col gap-16">
        
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            label={solution.label}
            title={solution.title}
            description={solution.description}
            align="center"
            badgeVariant="yellow"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {solution.steps.map((step, idx) => (
            <div key={idx} className="flex flex-col relative group">
              
              {/* Conector sutil em telas grandes entre os passos */}
              {idx < solution.steps.length - 1 && (
                <div
                  className="hidden lg:flex absolute top-12 right-[-20px] z-10 items-center justify-center text-elociv-navy/30"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-6 w-6" />
                </div>
              )}

              <Card
                variant={step.collectiveResult ? 'navy' : 'default'}
                className={
                  step.collectiveResult
                    ? 'h-full flex flex-col justify-between p-7 sm:p-8 border-2 border-elociv-yellow/35 group-hover:border-elociv-yellow transition-all group-hover:shadow-md relative overflow-hidden'
                    : 'h-full flex flex-col justify-between p-7 sm:p-8 bg-background border-2 border-elociv-navy/20 group-hover:border-elociv-navy transition-all group-hover:shadow-md relative overflow-hidden'
                }
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        step.collectiveResult
                          ? 'text-3xl font-heading font-extrabold text-elociv-yellow'
                          : 'text-3xl font-heading font-extrabold text-elociv-navy/40 group-hover:text-elociv-plum transition-colors'
                      }
                    >
                      {step.number}
                    </span>
                    <div className="h-14 w-14 rounded-2xl bg-elociv-blue/40 flex items-center justify-center shrink-0">
                      {renderIcon(step.icon)}
                    </div>
                  </div>
                  
                  <h3
                    className={
                      step.collectiveResult
                        ? 'text-xl sm:text-2xl font-heading font-bold text-elociv-ivory mt-1'
                        : 'text-xl sm:text-2xl font-heading font-bold text-elociv-navy mt-1'
                    }
                  >
                    {step.title}
                  </h3>
                </div>

                <p
                  className={
                    step.collectiveResult
                      ? 'text-sm sm:text-base text-elociv-ivory/80 leading-relaxed mt-4 font-sans'
                      : 'text-sm sm:text-base text-muted-foreground leading-relaxed mt-4 font-sans'
                  }
                >
                  {step.description}
                </p>
                {step.collectiveResult && (
                  <span className="mt-5 inline-flex w-fit rounded-full border border-elociv-yellow/40 bg-elociv-yellow/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-elociv-yellow">
                    Resultado coletivo
                  </span>
                )}
              </Card>
            </div>
          ))}
        </div>

      </Container>
    </section>
  )
}
