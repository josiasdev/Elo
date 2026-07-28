import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import OpportunitiesPage from '@/features/opportunities/pages/OpportunitiesPage'

describe('OpportunitiesPage', () => {
  it('exibe oportunidades retornadas pelo repository mockado', async () => {
    render(
      <MemoryRouter>
        <OpportunitiesPage />
      </MemoryRouter>,
    )

    expect(await screen.findByText('Curso de cidadania digital')).toBeInTheDocument()
    expect(screen.getByText('Oficina de rádio comunitária')).toBeInTheDocument()
  })
})
