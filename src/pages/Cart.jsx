import React from 'react'
import { useCartHook } from '../context/CartContext'
import { Container, Row, Col } from 'react-bootstrap';
import { RiDeleteBin6Line } from "react-icons/ri";
import { EmptyCart } from '../assets/images/Images'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { addToCart, cartItem, updateQuantity, deleteItem } = useCartHook();
  const navigate = useNavigate();


  const subtotal = cartItem.reduce((total, item) => total + item.price*item.quantity, 0).toFixed(2);
  return (
    <Container>
      <Row>
        <Col>
          <div className='py-[60px]'>
            {
              cartItem.length > 0 ?
                <>
                  <div className='text-2xl font-bold flex justify-between border-b-[2px] border-gray-200 mb-5'>
                    <p>Shopping Cart</p>
                    <span>{cartItem.length}</span>
                  </div>

                  <div className='gap-4 p-3 flex items-center justify-between w-full mt-3 font-bold'>
                    <div className='flex items-center gap-4 w-[60%] text-gray-500'>
                      Items
                    </div>
                    <div className='w-[20%] flex items-center justify-end text-gray-500 px-3'>
                      Quantity
                    </div>
                    <div className='w-[20%] flex items-center justify-end text-gray-500'>Total</div>
                  </div>
                  {cartItem.map((item, index) => {
                    return (
                      <div key={index} className='bg-gray-100 gap-3 p-3 rounded-md flex items-center justify-between w-full mb-3'>
                        <div className='flex items-center gap-4 w-[60%]'>
                          <img src={item?.image} alt={item.title} className='w-[100px] h-[100px] object-contain' />
                          <div>
                            <h1 className='!text-lg'>{item.title}</h1>
                            <p>{item.color}</p>
                          </div>
                        </div>
                        <div className='w-[20%] flex items-center justify-end'>
                          <div className='bg-red-500 text-white flex gap-2 p-2 rounded-md font-bold text-xl'>
                            <button className='cursor-pointer font-bold h-[24px] w-[24px] !bg-red-500 text-white p-0 !leading-none hover:outline-none focus:outline-none border-0'  
                            onClick={() => updateQuantity(cartItem, item.id, "decrease")}>-</button>
                            <span>{item.quantity}</span>
                            <button className='cursor-pointer font-bold h-[24px] w-[24px] !bg-red-500 text-white p-0 !leading-none hover:outline-none focus:outline-none border-0'
                              onClick={() => updateQuantity(cartItem, item.id, "increase")}>+</button>
                          </div>
                          <button className="bg-transparent hover:outline-none focus:outline-none border-0" onClick={()=>deleteItem(item.id)}>
                            <RiDeleteBin6Line className='text-xl text-red-500' />
                          </button>
                        </div>
                        <div className='w-[20%] flex items-center justify-end font-medium text-xl'>${item.price*item.quantity}</div>
                      </div>
                    )
                  })}
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='bg-gray-100 p-3 rounded-2'>
                      <h4 className='!text-lg'>Delivery info</h4>
                    </div>
                    <div className='bg-gray-100 p-3  rounded-2'>
                      <h4 className='!text-lg'>Bill Details</h4>
                      <div className='flex justify-between'>
                        <span>Sub Total</span>
                        <span className='font-bold text-xl text-red-500'>${subtotal}</span>
                      </div>
                    </div>
                  </div>
                </> :
                <div className='flex flex-col items-center'>
                  <img src={EmptyCart} alt="Cart" className='w-[200px]' />
                  <p className='text-2xl font-bold '>Oh no! Your Cart is <span className='text-red-500'>Empty</span></p>
                  <p className='!mb-8 text-gray-500'>Add something to make me happy:)</p>
                  <button onClick={()=>navigate('/products')} className='!bg-red-500 text-white hover:outline-none focus:outline-none border-0'>Continue Shopping</button>
                </div>
            }
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart