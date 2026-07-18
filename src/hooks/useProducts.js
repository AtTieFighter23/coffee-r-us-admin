import { useState, useEffect } from 'react'

const BASE_URL = 'http://localhost:6001/products'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // GET all products on mount
  useEffect(() => {
    fetch(BASE_URL)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
        setLoading(false)
      })
  }, [])

  // POST a new product
  function addProduct(newProduct) {
    return fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then((r) => r.json())
      .then((createdProduct) => {
        setProducts((prevProducts) => [...prevProducts, createdProduct])
        return createdProduct
      })
      .catch((error) => console.error('Error adding product:', error))
  }

  // PATCH an existing product (e.g. updating price)
  function updateProduct(id, updates) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
      .then((r) => r.json())
      .then((updatedProduct) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        )
        return updatedProduct
      })
      .catch((error) => console.error('Error updating product:', error))
  }

  // DELETE a product
  function deleteProduct(id) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        )
      })
      .catch((error) => console.error('Error deleting product:', error))
  }

  return { products, loading, addProduct, updateProduct, deleteProduct }
}