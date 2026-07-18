import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Shop from './components/Shop'
import AdminPortal from './components/AdminPortal'
import ProductDetail from './components/ProductDetail'

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  )
}

export default App