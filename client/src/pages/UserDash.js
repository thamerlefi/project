import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Outlet } from 'react-router-dom'

export default function UserDash() {
  return (
    <div className='my-2'>
        <LinkContainer to='/user/profile'>
            <button className='btn btn-success me-2'>Profile</button>
        </LinkContainer>
        <LinkContainer to='/user/orders'>
            <button className='btn btn-success'>Orders History</button>
        </LinkContainer>
        <Outlet />
    </div>
  )
}
