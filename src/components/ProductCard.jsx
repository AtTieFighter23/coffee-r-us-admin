import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <li className="product-card" data-testid="product-card">
      <Link to={`/products/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>
      <p>{product.description}</p>
      <p>Origin: {product.origin}</p>
      <p>Price: ${product.price}</p>
    </li>
  )
}

export default ProductCard