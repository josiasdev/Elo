import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import NotFoundPage from '@/components/feedback/NotFoundPage'

describe('NotFoundPage', () => {
  it('orienta o usuário quando a rota não existe', () => {
    render(
      <MemoryRouter initialEntries={['/rota-inexistente']}>
        <NotFoundPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Página não encontrada' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Voltar para oportunidades' }),
    ).toHaveAttribute('href', '/oportunidades')
  })
})
