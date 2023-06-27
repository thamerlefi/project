import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Product from '../components/Product'
import HelmetTitle from '../components/HelmetTitle'

export default function WishList() {
    const {wishList} = useSelector(state=> state.wishList)
  return (
    <div className='row container m-auto gap-2'>
      <HelmetTitle title="Tech-Shop | WishList" />
      {

        wishList.map(wish =>(
            <Product key={wish._id} col={"custom-col"} inWish={true} product={wish}/>
        ))
      }
    </div>
  )
}
