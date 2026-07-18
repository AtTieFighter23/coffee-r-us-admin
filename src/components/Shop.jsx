import React, { useContext, useRef, useState } from 'react'
import { ProductContext } from '../context/ProductContext'
import ProductCard from './ProductCard'

function Shop() {
  const { products, loading } = useContext(ProductContext)
  // Uncontrolled search input: the DOM manages its own value, we read it via ref
  const searchInputRef = useRef(null)
  // Only used to trigger a re-render of the filtered list when the search term changes
  const [query, setQuery] = useState('')

  function handleSearch() {
    setQuery(searchInputRef.current.value)
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.origin.toLowerCase().includes(query.toLowerCase())
  )

  if (loading) {
    return <p>Loading products...</p>
  }

  return (
    <main className="shop">
      <aside className="shop-sidebar">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search"
          onChange={handleSearch}
        />
      </aside>
      <ul className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </main>
  )
}

export default Shop