import React from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Admin() {
  const tostia = () => toast('not handled yet hahaha')
  return (
    <div className='mt-4'>
      <button onClick={tostia} className='btn btn-outline-success'>dashboars</button>
      <button className='btn btn-outline-success mx-3'>products</button>
      <button className='btn btn-outline-success'>users</button>
      <Outlet />
    </div>
  )
}
