import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { baseURL } from '../baseURL'
import axios from 'axios'

export default function AdminDashboard() {
    const [users, setUsers] = useState(0)
    const [products, setProducts] = useState(0)

    useEffect(()=>{
        getDashInfo()
    },[])

    async function getDashInfo() {
        try {
            const res = await axios.get(baseURL + "api/admin", {headers: {
                "x-auth" : localStorage.getItem('token')
            }})
            setProducts(res.data.products)
            setUsers(res.data.users)
        } catch (error) {
            
        }
    }

  return (
    <div className='mt-3'>
      <div className='row dashboard-info'>
        <div className='col-3'>
            <p>users : </p>
            <h1>{users}</h1>
        </div>
        <div className='col-3'>
            <p>products :</p>
            <h1>{products}</h1>
        </div>
        <div className='col-3'>
            <p>orders</p>
            <h1>0</h1>
        </div>
      </div>
    </div>
  )
}
