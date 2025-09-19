import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartHook } from '../context/CartContext'
import { getDataHook } from '../context/DataContext'
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart, cartItem } = useCartHook()
  const {handleWishList, wishlist} = getDataHook()
  const isInWishlist = wishlist?.some((item)=>item.id === product.id)

  return (
    <div className='card border border-gray-100 rounded-2xl cursor-pointer' onClick={() => navigate(`/products/${product.id}`)}>
      
      <div className="m-3 absolute">
        {isInWishlist ? (
          <IoMdHeart
            className="text-xl text-red-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              handleWishList(product) // remove from wishlist
            }}
          />
        ) : (
          <IoMdHeartEmpty
            className="text-xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              handleWishList(product) // add to wishlist
            }}
          />
        )}
      </div>
      <div className='cardImg'><img src={product.image} alt={product.title} className='aspect-square p-2' /></div>
      <div className='p-4'>
        <h4 className='line-clamp-2 !text-xl !font-bold'>{product.title}</h4>
        <p className='line-clamp-3'>{product.description}</p>
        <div className="flex justify-content-between items-center">
          <button className='!bg-red-500 font-medium !text-sm text-white flex items-center gap-2 h-[34px] hover:outline-none focus:outline-none border-0' onClick={(e) => {e.stopPropagation(); addToCart(product)}}><IoCartOutline className='text-xl' /> Add to Cart</button>
          <div className="price font-bold text-2xl">
            ${product.price}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard