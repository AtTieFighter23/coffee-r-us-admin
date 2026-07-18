import React, { useContext, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, updateProduct, deleteProduct } = useContext(ProductContext)

  const product = products.find((p) => p.id === id)

  const [isEditing, setIsEditing] = useState(false)
  const [price, setPrice] = useState(product ? product.price : '')

  if (!product) {
    return <h2>Product not found.</h2>
  }

  function handleSave(e) {
    e.preventDefault()
    updateProduct(product.id, { price: parseFloat(price) }).then(() => {
      setIsEditing(false)
    })
  }

  function handleDelete() {
    deleteProduct(product.id).then(() => {
      navigate('/shop')
    })
  }

  return (
    <main className="product-detail">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Origin: {product.origin}</p>

      {isEditing ? (
        <form onSubmit={handleSave}>
          <label htmlFor="price-input">Price</label>
          <input
            id="price-input"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>Price: ${product.price}</p>
          <button onClick={() => setIsEditing(true)}>Edit Price</button>
        </>
      )}

      <button onClick={handleDelete}>Delete Product</button>
      <Link to="/shop">Back to Shop</Link>
    </main>
  )
}

export default ProductDetail