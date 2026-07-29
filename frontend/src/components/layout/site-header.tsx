import * as React from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/brand/brand-logo'
import { homeContent } from '@/content/home-content'
import { scrollToAnchor } from '@/lib/utils'

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { links, cta } = homeContent.header

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev)
  const closeMenu = () => setMobileMenuOpen(false)

  // Fechar o menu com a tecla Escape por acessibilidade
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        closeMenu()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-all duration-200">
      <Container className="flex h-20 items-center justify-between gap-4">
        {/* Logo à esquerda com rolagem para o início sem # no URL */}
        <a
          href="#inicio"
          onClick={(e) => scrollToAnchor(e, '#inicio', closeMenu)}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-lg transition-transform hover:scale-[1.01]"
        >
          <BrandLogo size="md" />
        </a>

        {/* Navegação Desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          <ul className="flex items-center gap-4 lg:gap-8 text-base font-medium text-elociv-navy">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToAnchor(e, link.href)}
                  className="py-2 px-1 text-sm lg:text-base font-semibold transition-colors hover:text-elociv-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-md cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Destacado no Desktop */}
        <div className="hidden md:flex items-center">
          <a
            href={cta.href}
            onClick={(e) => scrollToAnchor(e, cta.href)}
            tabIndex={-1}
          >
            <Button size="md" variant="primary">
              {cta.label}
            </Button>
          </a>
        </div>

        {/* Botão do Menu Mobile */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            onClick={toggleMenu}
            className="p-2 text-elociv-navy rounded-lg hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-primary transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </Container>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden border-t border-border/80 bg-background px-4 py-6 shadow-xl transition-all"
        >
          <nav aria-label="Navegação móvel">
            <ul className="flex flex-col gap-4 text-center font-semibold text-lg text-elociv-navy">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToAnchor(e, link.href, closeMenu)}
                    className="block py-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 border-t border-border/60">
                <a
                  href={cta.href}
                  onClick={(e) => scrollToAnchor(e, cta.href, closeMenu)}
                  className="block w-full"
                  tabIndex={-1}
                >
                  <Button variant="primary" className="w-full h-12 text-base">
                    {cta.label}
                  </Button>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
