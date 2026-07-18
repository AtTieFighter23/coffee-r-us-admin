import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import AdminPortal from '../../components/AdminPortal'
import { ProductContext } from '../../context/ProductContext'

function renderAdminPortal(addProductMock) {
  const contextValue = {
    products: [],
    loading: false,
    addProduct: addProductMock,
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
  }
  return render(
    <MemoryRouter>
      <ProductContext.Provider value={contextValue}>
        <AdminPortal />
      </ProductContext.Provider>
    </MemoryRouter>
  )
}

describe('Admin Portal', () => {
  test('renders all form fields', () => {
    renderAdminPortal(vi.fn())
    expect(screen.getByLabelText('Coffee Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByLabelText('Origin')).toBeInTheDocument()
    expect(screen.getByLabelText('Price')).toBeInTheDocument()
  })

  test('calls addProduct with form data on submit', async () => {
    const addProductMock = vi.fn(() =>
      Promise.resolve({ id: '4', name: 'Kenyan AA', description: 'Rich and bold.', origin: 'Kenya', price: 18 })
    )
    renderAdminPortal(addProductMock)

    fireEvent.change(screen.getByLabelText('Coffee Name'), { target: { value: 'Kenyan AA' } })
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Rich and bold.' } })
    fireEvent.change(screen.getByLabelText('Origin'), { target: { value: 'Kenya' } })
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '18' } })

    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(addProductMock).toHaveBeenCalledWith({
        name: 'Kenyan AA',
        description: 'Rich and bold.',
        origin: 'Kenya',
        price: 18,
      })
    })
  })

  test('each label is properly associated with its input via useId', () => {
    renderAdminPortal(vi.fn())
    const nameInput = screen.getByLabelText('Coffee Name')
    expect(nameInput).toHaveAttribute('id')
    expect(nameInput.id).not.toBe('')
  })
})