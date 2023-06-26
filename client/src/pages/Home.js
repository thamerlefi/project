import React from 'react'
import BannerProd from '../components/BannerProd'
// import ProductsList from '../components/ProductsList'
import LatestProd from '../components/LatestProd'
import "../css/home.css"
import FeateredProd from '../components/FeateredProd'
import PopularProd from '../components/PopularProd'
import BestSellers from '../components/BestSellers'

export default function Home() {
 
  return (
    <div className='home container-xxl  pt-'>
      <BannerProd />
      <LatestProd />
      <FeateredProd />
      <div className='banner my-5'>
        <img src="img/banner1.webp" style={{width:"100%"}} alt="" />
      </div>
      <PopularProd />
      <BestSellers />
    </div>
  )
}
