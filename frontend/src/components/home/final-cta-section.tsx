import { ArrowRight, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { homeContent } from '@/content/home-content'
import { scrollToAnchor } from '@/lib/utils'

export function FinalCtaSection() {
  const { finalCta } = homeContent

  return (
    <section className="py-18 lg:py-24 bg-elociv-plum text-elociv-ivory">
      <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-elociv-ivory leading-tight">
            {finalCta.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-elociv-ivory/82 leading-relaxed">
            {finalCta.description}
          </p>
        </div>

        <div className="flex w-full sm:w-auto flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0">
          <a
            href={finalCta.primaryCta.href}
            onClick={(e) => scrollToAnchor(e, finalCta.primaryCta.href)}
            tabIndex={-1}
            className="w-full sm:w-auto"
          >
            <Button variant="negative" size="lg" className="w-full sm:w-auto gap-2">
              <span>{finalCta.primaryCta.label}</span>
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </Button>
          </a>
          <a
            href={finalCta.secondaryCta.href}
            onClick={(e) => scrollToAnchor(e, finalCta.secondaryCta.href)}
            tabIndex={-1}
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 border-elociv-ivory text-elociv-ivory hover:bg-elociv-ivory hover:text-elociv-navy"
            >
              <span>{finalCta.secondaryCta.label}</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </a>
        </div>
      </Container>
    </section>
  )
}
