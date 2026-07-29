import { Container } from '@/components/ui/container'
import { BrandLogo } from '@/components/brand/brand-logo'
import { Hexagon } from '@/components/brand/hexagon'
import { homeContent } from '@/content/home-content'
import { scrollToAnchor } from '@/lib/utils'

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SiteFooter() {
  const { footer } = homeContent
  const isHomePage = window.location.pathname === '/'
  const getNavigationHref = (href: string) =>
    href.startsWith('#') && !isHomePage ? `/${href}` : href

  return (
    <footer className="relative bg-elociv-navy text-elociv-ivory overflow-hidden pt-14 pb-12 border-t border-elociv-navy/30">
      {/* Elementos decorativos sutis no background */}
      <div
        className="absolute right-[-40px] top-[10%] opacity-10 pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <Hexagon variant="outline-ivory" size="xl" className="scale-150" />
      </div>

      <Container className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo e Resumo Institucional */}
          <div className="flex flex-col gap-4 md:col-span-2 max-w-sm">
            <div>
              <BrandLogo variant="negative" size="lg" />
            </div>
            <p className="text-sm text-elociv-ivory/75 leading-relaxed font-sans">
              {footer.brandDescription}
            </p>
          </div>

          {/* Links Rápida de Navegação */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-bold text-lg text-elociv-yellow uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="flex flex-col gap-2 text-sm font-semibold">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={getNavigationHref(link.href)}
                    onClick={(e) => {
                      if (isHomePage) {
                        scrollToAnchor(e, link.href)
                      }
                    }}
                    className="inline-block py-1 text-elociv-ivory/85 hover:text-elociv-yellow transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={footer.social.href}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl border border-elociv-ivory/20 px-3 py-2 text-sm font-bold text-elociv-ivory/85 transition-colors hover:border-elociv-yellow/60 hover:text-elociv-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elociv-yellow"
              aria-label="Abrir Instagram do EloCiv em nova aba"
            >
              <InstagramIcon />
              <span>{footer.social.label}</span>
            </a>
          </div>
        </div>

        {/* Rodapé Final com Copyright */}
        <div className="pt-8 border-t border-elociv-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-elociv-ivory/60 font-sans text-center sm:text-left">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-elociv-pink" />
            <span className="h-1.5 w-1.5 rounded-full bg-elociv-blue" />
            <span className="h-1.5 w-1.5 rounded-full bg-elociv-yellow" />
          </div>
        </div>
      </Container>
    </footer>
  )
}
