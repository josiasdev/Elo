import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import LandingPage from '@/features/landing/pages/LandingPage'

describe('LandingPage', () => {
  it('renderiza as seções principais da landing EloCiv', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'O território já tem oportunidades',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /Visibilidade/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /Uma jornada/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Rede parceira em construção' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Equipe EloCiv' }),
    ).toBeInTheDocument()
  })

  it('abre e fecha o menu mobile acessível', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )

    const menuButton = screen.getByRole('button', { name: 'Abrir menu principal' })
    await user.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    const navigation = screen.getByRole('navigation', {
      name: 'Navegação principal',
    })
    await user.click(within(navigation).getByRole('link', { name: 'Sobre' }))

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})
