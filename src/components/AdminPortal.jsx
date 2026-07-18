import React, { useState, useId, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'

function AdminPortal() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [origin, setOrigin] = useState('')
  const [price, setPrice] = useState('')
  const { addProduct } = useContext(ProductContext)
  const navigate = useNavigate()

  // Generates unique, stable ids to properly associate each label with its input
  const nameId = useId()
  const descriptionId = useId()
  const originId = useId()
  const priceId = useId()

  function handleSubmit(e) {
    e.preventDefault()
    const newProduct = {
      name,
      description,
      origin,
      price: parseFloat(price),
    }

    addProduct(newProduct).then((createdProduct) => {
      if (createdProduct) {
        navigate(`/products/${createdProduct.id}`)
      }
    })
  }

  return (
    <main className="admin-portal">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>Add a New Product</h2>

        <label htmlFor={nameId}>Coffee Name</label>
        <input
          id={nameId}
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor={descriptionId}>Description</label>
        <input
          id={descriptionId}
          type="text"
          placeholder="Typing..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor={originId}>Origin</label>
        <input
          id={originId}
          type="text"
          placeholder="Typing..."
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />

        <label htmlFor={priceId}>Price</label>
        <input
          id={priceId}
          type="number"
          step="0.01"
          placeholder="Typing..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default AdminPortal