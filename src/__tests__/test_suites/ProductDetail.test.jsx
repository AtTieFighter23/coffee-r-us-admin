import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '@testing-library/jest-dom'
import ProductDetail from '../../components/ProductDetail'
import { ProductContext } from '../../context/ProductContext'

const mockProduct = {
  id: '1',
  name: 'Ethiopian Yirgacheffe',
  description: 'Bright and floral.',
  origin: 'Ethiopia',
  price: 16.99,
}

function renderProductDetail(overrides = {}) {
  const contextValue = {
    products: [mockProduct],
    loading: false,
    addProduct: vi.fn(),
    updateProduct: vi.fn(() => Promise.resolve({ ...mockProduct, price: 20 })),
    deleteProduct: vi.fn(() => Promise.resolve()),
    ...overrides,
  }
  return render(
    <MemoryRouter initialEntries={['/products/1']}>
      <ProductContext.Provider value={contextValue}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </ProductContext.Provider>
    </MemoryRouter>
  )
}

describe('Product Detail Page', () => {
  test('renders product details', () => {
    renderProductDetail()
    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument()
    expect(screen.getByText('Bright and floral.')).toBeInTheDocument()
    expect(screen.getByText(/Price: \$16.99/)).toBeInTheDocument()
  })

  test('shows "Product not found" for an invalid id', () => {
    renderProductDetail({ products: [] })
    expect(screen.getByText('Product not found.')).toBeInTheDocument()
  })

  test('editing and saving calls updateProduct with the new price', async () => {
    const updateProductMock = vi.fn(() => Promise.resolve({ ...mockProduct, price: 20 }))
    renderProductDetail({ updateProduct: updateProductMock })

    fireEvent.click(screen.getByText('Edit Price'))
    const priceInput = screen.getByLabelText('Price')
    fireEvent.change(priceInput, { target: { value: '20' } })
    fireEvent.click(screen.getByText('Save'))

    await waitFor(() => {
      expect(updateProductMock).toHaveBeenCalledWith('1', { price: 20 })
    })
  })

  test('clicking delete calls deleteProduct', async () => {
    const deleteProductMock = vi.fn(() => Promise.resolve())
    renderProductDetail({ deleteProduct: deleteProductMock })

    fireEvent.click(screen.getByText('Delete Product'))

    await waitFor(() => {
      expect(deleteProductMock).toHaveBeenCalledWith('1')
    })
  })
})