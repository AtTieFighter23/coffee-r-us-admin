import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import Shop from '../../components/Shop'
import { ProductContext } from '../../context/ProductContext'

const mockProducts = [
  { id: '1', name: 'Ethiopian Yirgacheffe', description: 'Bright and floral.', origin: 'Ethiopia', price: 16.99 },
  { id: '2', name: 'Colombian Supremo', description: 'Smooth and balanced.', origin: 'Colombia', price: 14.5 },
]

function renderShop(overrides = {}) {
  const contextValue = {
    products: mockProducts,
    loading: false,
    addProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
    ...overrides,
  }
  return render(
    <MemoryRouter>
      <ProductContext.Provider value={contextValue}>
        <Shop />
      </ProductContext.Provider>
    </MemoryRouter>
  )
}

describe('Shop Page', () => {
  test('displays all products from context', () => {
    renderShop()
    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument()
    expect(screen.getByText('Colombian Supremo')).toBeInTheDocument()
  })

  test('shows a loading message while products are loading', () => {
    renderShop({ loading: true })
    expect(screen.getByText(/Loading products/i)).toBeInTheDocument()
  })

  test('filters products based on search input', async () => {
    renderShop()
    const searchInput = screen.getByPlaceholderText('Search')

    fireEvent.change(searchInput, { target: { value: 'Ethiopian' } })

    await waitFor(() => {
      expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument()
      expect(screen.queryByText('Colombian Supremo')).not.toBeInTheDocument()
    })
  })

  test('search with no matches renders no product cards', async () => {
    renderShop()
    const searchInput = screen.getByPlaceholderText('Search')

    fireEvent.change(searchInput, { target: { value: 'zzzznomatch' } })

    await waitFor(() => {
      expect(screen.queryAllByTestId('product-card')).toHaveLength(0)
    })
  })

  test('each product links to its detail page', () => {
    renderShop()
    const link = screen.getByRole('link', { name: /Ethiopian Yirgacheffe/i })
    expect(link).toHaveAttribute('href', '/products/1')
  })
})