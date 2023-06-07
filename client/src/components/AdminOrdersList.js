import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../baseURL'
import { LinkContainer } from 'react-router-bootstrap'

export default function AdminOrdersList() {
  const [orders, setOrders] = useState([])
  useEffect(() =>{
    axios.get(`${baseURL}api/orders/all`,{headers: {
      "x-auth" : localStorage.getItem('token')
    }})
    .then(res => {
      setOrders(res.data.orders)
    })
    .catch(er => console.log(er))
  },[])

  //------------------------- update Status function
  const updateStatusHandler = (status, id)=>{
    let action = status==="Pending" ? "Processing" : 
    status==="Processing"? "Shipped" :
    status==="Shipped"? "Delivered" : null
    axios.put(`${baseURL}api/orders/update/${id}`,{action},{headers: {
      "x-auth" : localStorage.getItem('token')
    }})
    .then(res=> setOrders(prev=>{
      return prev.map(order=>{
        if(order._id === id){
                  order = res.data.updatedOrder
                }
                return order
      })
    }))
    .catch(er=>console.log(er))
  }

  const tranformDate = (date) =>{
    let endDt = "", hr = "", dt=""
    dt = date.split('T')[0].split('-').reverse().join('/')
    hr = date.split('T')[1].split('.')[0]
    hr = hr.split(':')[0] + ':' + hr.split(':')[1] 
    endDt = hr + '-' + dt
    return endDt
  }
  return (
    <div className='mt-3'>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#id</th>
      <th scope="col">Products</th>
      <th scope="col">user name</th>
      <th scope="col">Date</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
      {orders.map(order=>(
        <tr key={order._id}>
        <th scope="row">1</th>
        <td>
          {order.products.map(prod=>(
              <p key={prod._id} className='mb-0'># {prod.productId.name}</p>
          ))}
        </td>
        <td>{order.userId.firstName + ' ' + order.userId.lastName}</td>
        <td>{tranformDate(order.createdAt)}</td>
        <td>{order.status}</td>
        <td>
          <button className='btn btn-outline-primary' 
          disabled={order.status==="Delivered" ? true: false}
          onClick={()=>updateStatusHandler(order.status, order._id)}
          >
            {
              order.status=== "Pending" ? "Processing ?" : 
              order.status=== "Processing" ? "Shipped ?" : 
              order.status=== "Shipped" ? "Delivered ?" : "ended" 
            }
          </button>
        </td>
        <td>
          <LinkContainer to={`/admin/orders/${order._id}`}>
            <button className='btn btn-outline-info'>details</button>
          </LinkContainer>
        </td>
        </tr>
      ))}
  </tbody>
</table>
    </div>
  )
}
