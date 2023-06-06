import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { baseURL } from '../baseURL'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../redux/slices/cartSlice'


export default function CheckoutSuccess() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cart } = useSelector((state) => state.shopCart);


  useEffect(()=>{
    const sessionId = localStorage.getItem('sessionId')
    if(sessionId){
      axios.post(`${baseURL}api/orders/create-order`,{
        sessionId,
        cart,
        userId: localStorage.getItem('userId')
      }).then(()=>{
        localStorage.removeItem('sessionId')
        localStorage.removeItem('userId')
        localStorage.removeItem('cart')
        dispatch(clearCart())
      }).catch(err=>console.log(err.message))
    }  
    else navigate('/')
  },[])
  return (
    <div>
      <h1>checkout successful</h1>
    </div>
  )
}
