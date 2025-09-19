import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb';
import { IoCartOutline } from "react-icons/io5";
import ReuseableInput from '../components/common/ReuseableInput';
import { getProductSingle } from '../api/productService'
import { handleApiError } from "../utils/errorHandler";
import { useCartHook } from '../context/CartContext';

const SingleProduct = () => {
  const { id } = useParams();

  const [singleProductData, setSingleProductData] = useState('');
  const { addToCart } = useCartHook()

  const getSingleProduct = async () => {
    try {
      const ProductData = await getProductSingle(id);
      setSingleProductData(ProductData);
    }
    catch (error) {
      handleApiError(error); // Centralized handling;
    }
  }
  useEffect(() => {
    getSingleProduct();
  }, [id])

  const originalPrice = Math.round(singleProductData.price + singleProductData.price * singleProductData.discount / 100)
  return (
    <Container fluid>
      {singleProductData ?
        <>
          <Row>
            <Col>
              <Breadcrumb title={singleProductData.title} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='w-full'>
                <img src={singleProductData.image} alt={singleProductData.title} className='w-full object-cover' />
              </div>
            </Col>
            <Col>
              <div className='product-details gap-1'>
                <h1 className='!text-3xl font-bold text-gray-800'>{singleProductData.title}</h1>
                <div className='text-sm font-semibold text-gray-600'>
                  {singleProductData.brand?.toUpperCase()}/{singleProductData.category?.toUpperCase()}/{singleProductData.model?.toUpperCase()}
                </div>
                <div className='flex items-center text-red-500 font-semibold gap-2 my-4'>${singleProductData.price} <span className='text-gray-500 line-through'>${originalPrice}</span> <span className='bg-red-500 font-bold text-white rounded-md px-3 py-1'>{singleProductData.discount}% Discount</span></div>
                <p>{singleProductData.description}</p>
                <div className='flex items-center gap-2'>
                  <strong>Quantity: </strong>
                  <ReuseableInput type='number' className="h-8 !w-20" min={1} value='1' />
                </div>
                <button onClick={()=>addToCart(singleProductData)} className='!bg-red-500 font-medium !text-sm text-white flex items-center gap-2 h-[34px] my-4 hover:outline-none focus:outline-none border-0'><IoCartOutline className='text-xl' /> Add to Cart</button>
              </div>
            </Col>
          </Row>
        </>
        :
        <Row>
          <Col>
            <div className='flex h-full justify-center items-center text-xl font-bold bg-gray-100'>No data</div>
          </Col>
        </Row>
      }
    </Container>
  )
}
export default SingleProduct
