import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Home from '../../components/Home'

describe('Home Page', () => {
  test('renders the site name', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(screen.getByText('Coffee R Us')).toBeInTheDocument()
  })

  test('renders the tagline', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(
      screen.getByText('The go to store for your coffee needs')
    ).toBeInTheDocument()
  })
})