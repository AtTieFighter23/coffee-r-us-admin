import React, { createContext } from 'react'
import { useProducts } from '../hooks/useProducts'

export const ProductContext = createContext()

export function ProductProvider({ children }) {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts()

  return (
    <ProductContext.Provider
      value={{ products, loading, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  )
}