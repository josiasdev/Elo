import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { BrandButton, BrandLogo } from '@/components/brand'
import { Container } from '@/components/layout/Container'
import { landingContent } from '@/content/landing-content'

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuId = 'site-navigation'

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header">
      <Container className="site-header__inner" size="wide">
        <a className="site-header__brand-link" href="#hero" onClick={closeMenu}>
          <BrandLogo className="site-header__logo" />
        </a>

        <button
          aria-controls={menuId}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fechar menu principal' : 'Abrir menu principal'}
          className="site-header__menu-button"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={22} />
          ) : (
            <Menu aria-hidden="true" size={22} />
          )}
        </button>

        <nav
          aria-label="Navegação principal"
          className={isMenuOpen ? 'site-header__nav is-open' : 'site-header__nav'}
          id={menuId}
        >
          {landingContent.navigation.map((item) => (
            <a
              className="site-header__nav-link"
              href={item.href}
              key={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <Link
            className="site-header__nav-link site-header__nav-link--mobile-cta"
            onClick={closeMenu}
            to="/oportunidades"
          >
            Explorar oportunidades
          </Link>
        </nav>

        <BrandButton className="site-header__cta" to="/oportunidades" variant="primary">
          Explorar oportunidades
        </BrandButton>

        <Link className="site-header__app-link" to="/oportunidades">
          Entrar na plataforma
        </Link>
      </Container>
    </header>
  )
}
