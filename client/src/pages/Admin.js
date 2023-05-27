import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Admin() {
  
  return (
    <div className='mt-4'>
      <LinkContainer to="/admin/dashboard">
        <button  className='btn btn-outline-success'>dashboars</button>
      </LinkContainer>
      <LinkContainer to="/admin/products">
        <button className='btn btn-outline-success mx-3'>products</button>
      </LinkContainer>
      <LinkContainer to="/admin/users">
        <button className='btn btn-outline-success'>users</button>
      </LinkContainer>
      <Outlet />
    </div>
  )
}
