import React, { useEffect } from 'react'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'

export default function ProductsList() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllProducts())
  },[])
  const products = useSelector(state=>state.products)
  return (
    <div className='mt-5 row '>
      {products.products.map(product => <Product key={product._id} product={product} />)}
    </div>
  )
}
