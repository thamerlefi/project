import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '../baseURL'
import axios from 'axios'
import OrderDetails from '../components/OrderDetails'

export default function UserOneOrder() {
    const {id} = useParams()
    const [order, setOrder] = useState({})
    useEffect(()=>{
        axios.get(`${baseURL}api/orders/user/order/${id}`,{headers: {
            "x-auth" : localStorage.getItem('token')
        }})
        .then(res=>setOrder(res.data.order))
    },[])
  return (
      <OrderDetails order={order} />
  )
}
