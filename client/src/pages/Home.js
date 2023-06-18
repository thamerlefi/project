import React from 'react'
import BannerProd from '../components/BannerProd'
import ProductsList from '../components/ProductsList'

export default function Home() {
 
  return (
    <div className='home container-xxl  pt-3'>
      <BannerProd />
      {/* <ProductsList /> */}
    </div>
  )
}
