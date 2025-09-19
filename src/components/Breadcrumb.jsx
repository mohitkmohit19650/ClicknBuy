import React from 'react'
import { useNavigate } from 'react-router-dom'

const Breadcrumb = ({title}) => {
   const Navigate = useNavigate();
  return (
    <div className='text-xs p-4'>
       <span className='font-medium cursor-pointer' onClick={()=>Navigate('/')}>Home</span> / <span className='font-medium cursor-pointer' onClick={()=>Navigate('/Products')}>Products</span> / <span>{title}</span>
    </div>
  )
}

export default Breadcrumb