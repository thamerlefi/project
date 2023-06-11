import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '../baseURL'
import OrderDetails from './OrderDetails'

export default function AdminOrder() {
    const [order, setOrder] = useState({})
    const {orderId} = useParams()
    useEffect(()=>{
        axios.get(`${baseURL}api/orders/${orderId}`,{headers: {
            "x-auth" : localStorage.getItem('token')
        }})
        .then(res=>setOrder(res.data.order))
        .catch(er=>console.log(er))
    },[])
  return (
    <div className='row mt-4 '>
      <div className='col-4 border-end'>
        <img src={order.userId?.image.secure_url} alt="" 
            style={{width:"150px"}}
        />
        <h4 className='mt-2'>{`${order.userId?.firstName} ${order.userId?.lastName}`}</h4>
        <h6 className='mt-2'>{`${order.shippingAdress?.phone.slice(4)}`}</h6>
      </div>
      <OrderDetails order={order} isAdmin={true} />
    </div>
  )
}
