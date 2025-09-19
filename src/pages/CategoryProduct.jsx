import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
  const params = useParams();
  const category = params.category;
  console.log(category)
  return (
    <div>CategoryProduct</div>
  )
}

export default CategoryProduct