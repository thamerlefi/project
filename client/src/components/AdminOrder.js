import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '../baseURL'

export default function AdminOrder() {
    const [order, setOrder] = useState({})
    const {orderId} = useParams()
    useEffect(()=>{
        axios.get(`${baseURL}api/orders/${orderId}`,{headers: {
            "x-auth" : localStorage.getItem('token')
        }})
        .then(res=>{
            console.log(res.data)
            setOrder(res.data)
        })
        .catch(er=>console.log(er))
    },[])
  return (
    <div>
      order details <br/>
      {orderId}
    </div>
  )
}
