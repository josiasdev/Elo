import { BrandLogo, ConnectionPattern } from '@/components/brand'
import { Container } from '@/components/layout/Container'
import { landingContent } from '@/content/landing-content'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner" size="wide">
        <div className="site-footer__brand">
          <BrandLogo className="site-footer__logo" variant="negative" />
          <p>{landingContent.footer.description}</p>
        </div>

        <nav aria-label="Navegação do rodapé" className="site-footer__nav">
          {landingContent.navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          <a href="/oportunidades">Oportunidades</a>
        </nav>

        <ConnectionPattern />

        <p className="site-footer__copyright">{landingContent.footer.copyright}</p>
      </Container>
    </footer>
  )
}
