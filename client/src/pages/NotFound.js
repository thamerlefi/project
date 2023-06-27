import React from 'react'
import HelmetTitle from '../components/HelmetTitle'

export default function NotFound({msg}) {
  return (
    <div className='container not-found'>
      <HelmetTitle title="Tech-Shop | Not Found" />
      <h1>{msg}</h1>
    </div>
  )
}
