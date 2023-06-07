import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Outlet } from 'react-router-dom'


export default function Admin() {
  
  return (
    <div className='mt-4'>
      <LinkContainer to="/admin/dashboard">
        <button  className='btn btn-outline-success'>dashboars</button>
      </LinkContainer>
      <LinkContainer to="/admin/users">
        <button className='btn btn-outline-success mx-3'>users</button>
      </LinkContainer>
      <LinkContainer to="/admin/products">
        <button className='btn btn-outline-success '>products</button>
      </LinkContainer>
      <LinkContainer to="/admin/orders">
        <button className='btn btn-outline-success ms-3'>orders</button>
      </LinkContainer>
      <Outlet />
    </div>
  )
}
