import { Link } from 'react-router-dom'

import { appRoutes } from '@/constants/routes'

export default function NotFoundPage() {
  return (
    <section className="page-section" aria-labelledby="not-found-title">
      <p className="eyebrow">Erro 404</p>
      <h1 id="not-found-title">Página não encontrada</h1>
      <p>
        O endereço acessado não corresponde a uma rota disponível no frontend do EloCiv.
      </p>
      <Link className="button-link" to={appRoutes.opportunities}>
        Voltar para oportunidades
      </Link>
    </section>
  )
}
