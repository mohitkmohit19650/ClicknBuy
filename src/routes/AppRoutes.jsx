import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import Products from '../pages/Products'
import Cart from '../pages/Cart'
import SingleProduct from '../pages/SingleProduct'
import CategoryProduct from '../pages/CategoryProduct'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/category/:category' element={<CategoryProduct />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  )
}

export default AppRoutes