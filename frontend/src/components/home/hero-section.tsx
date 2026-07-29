import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HexagonCluster } from '@/components/brand/hexagon-cluster'
import { ConnectionPattern } from '@/components/brand/connection-pattern'
import { homeContent } from '@/content/home-content'
import { scrollToAnchor } from '@/lib/utils'

export function HeroSection() {
  const { hero } = homeContent

  return (
    <section id="inicio" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      {/* Grafismo decorativo de fundo de marca no desktop */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-96 h-96 opacity-30 pointer-events-none hidden lg:block" aria-hidden="true">
        <ConnectionPattern variant="combined" />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-w-0">
          
          {/* Coluna da Esquerda: Conteúdo Editorial */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 z-10 min-w-0">
            <div className="flex">
              <Badge variant="yellow" dotColor="navy" className="text-sm px-4 py-1.5 shadow-sm">
                {hero.badge}
              </Badge>
            </div>

            <h1 className="text-[2rem] min-[420px]:text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-heading font-bold text-elociv-navy leading-[1.08] sm:leading-[1.1] tracking-tight break-words">
              {hero.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-sans">
              {hero.description}
            </p>

            {/* CTAs com rolagem suave sem # no URL */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={hero.primaryCta.href}
                onClick={(e) => scrollToAnchor(e, hero.primaryCta.href)}
                tabIndex={-1}
                className="w-full sm:w-auto"
              >
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 font-bold shadow-md">
                  <span>{hero.primaryCta.label}</span>
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </a>
              <a
                href={hero.secondaryCta.href}
                onClick={(e) => scrollToAnchor(e, hero.secondaryCta.href)}
                tabIndex={-1}
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold bg-background">
                  {hero.secondaryCta.label}
                </Button>
              </a>
            </div>

            {/* Informações curtas / Estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-4 border-t border-border/70">
              {hero.stats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="text-2xl font-heading font-bold text-elociv-navy">
                    {stat.highlight}
                  </span>
                  <span className="text-xs font-sans text-muted-foreground uppercase font-semibold tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna da Direita: Mockup visual da plataforma */}
          <div className="lg:col-span-5 relative hidden sm:flex min-w-0 items-center justify-center pt-6 lg:pt-0 overflow-hidden pb-6">
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-75 scale-125 pointer-events-none" aria-hidden="true">
              <HexagonCluster variant="light" />
            </div>

            <div className="relative z-10 w-full max-w-[18rem] min-[420px]:max-w-[21.5rem] sm:max-w-lg lg:max-w-full flex flex-col items-center min-w-0">
              <div className="relative w-full min-w-0 rounded-3xl border-[3px] border-elociv-navy bg-elociv-ivory p-3 sm:p-4 shadow-xl">
                <div className="rounded-2xl border border-elociv-navy/12 bg-background overflow-hidden">
                  <div className="flex items-center justify-between border-b border-elociv-navy/10 bg-elociv-blue/25 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-elociv-pink" aria-hidden="true" />
                      <span className="h-2.5 w-2.5 rounded-full bg-elociv-yellow" aria-hidden="true" />
                      <span className="h-2.5 w-2.5 rounded-full bg-elociv-blue border border-elociv-navy/20" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-elociv-plum">
                      Carteira cívica
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-4 sm:p-5">
                    <div className="rounded-2xl bg-elociv-navy p-4 text-elociv-ivory">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-elociv-blue">
                            Oportunidades no território
                          </p>
                          <p className="mt-2 text-2xl font-heading font-bold text-elociv-ivory leading-tight">
                            Oficinas, cursos e ações comunitárias
                          </p>
                        </div>
                        <div className="hidden sm:flex h-16 w-16 rounded-2xl bg-elociv-yellow items-center justify-center text-elociv-navy font-heading font-bold text-xl">
                          DID
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-elociv-navy">
                      <div className="rounded-xl border border-elociv-navy/12 bg-elociv-yellow/45 px-3 py-3">
                        Tecnologia
                      </div>
                      <div className="rounded-xl border border-elociv-navy/12 bg-elociv-pink/45 px-3 py-3">
                        Voluntariado
                      </div>
                      <div className="rounded-xl border border-elociv-navy/12 bg-elociv-blue/45 px-3 py-3">
                        Presencial
                      </div>
                      <div className="rounded-xl border border-elociv-navy/12 bg-elociv-ivory px-3 py-3">
                        12-18 anos
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {['Oficina de tecnologia cidadã', 'Mentoria de participação jovem'].map((title) => (
                        <div
                          key={title}
                          className="rounded-2xl border border-elociv-navy/12 bg-elociv-ivory p-4 shadow-sm min-w-0"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-base font-heading font-bold text-elociv-navy">
                                {title}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Interesse pelo canal oficial da instituição
                              </p>
                            </div>
                            <span className="hidden sm:inline-flex rounded-full bg-elociv-blue/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-elociv-navy">
                              Aberta
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-elociv-yellow/50 bg-elociv-yellow/25 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-elociv-plum">
                            Credencial verificável
                          </p>
                          <p className="mt-1 text-sm font-semibold text-elociv-navy">
                            Prova pública, dados privados
                          </p>
                        </div>
                        <span className="h-10 w-10 rounded-full bg-elociv-navy text-elociv-ivory flex items-center justify-center text-sm font-heading font-bold">
                          0
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-end mr-2 sm:mr-4 z-20 -mt-3 sm:-mt-4">
                <div className="bg-elociv-plum text-elociv-ivory text-[10px] sm:text-[11px] font-bold px-3 sm:px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 border border-elociv-ivory/20 max-w-[16rem] min-[420px]:max-w-[18rem]">
                  <span className="h-2 w-2 rounded-full bg-elociv-pink" aria-hidden="true" />
                  <span>Trajetórias seguras & verificadas</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
