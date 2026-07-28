import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppLayout } from '@/components/layout/AppLayout'

describe('AppLayout', () => {
  it('renderiza a marca, navegação e área principal', () => {
    render(
      <MemoryRouter initialEntries={['/oportunidades']}>
        <AppLayout>
          <p>Conteúdo teste</p>
        </AppLayout>
      </MemoryRouter>,
    )

    expect(screen.getAllByText('EloCiv').length).toBeGreaterThan(0)
    expect(
      screen.getAllByText('A EloCiv ajuda você a encontrá-las').length,
    ).toBeGreaterThan(0)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Conteúdo teste')).toBeInTheDocument()
  })
})
