import React from 'react'
import { useSelector } from 'react-redux';
import Product from "../components/Product";

export default function LatestProd() {
    const { products } = useSelector((state) => state.products);
  return (
        // ----------------------- latest prod
    <div className='section-prod mt-5'>
      <div>
        <div className='line'></div>
        <h4 className='text-center'> Latest Products</h4>
      </div>
      <div className='list m-auto gap-2 container row mt-5'>
        {
            products.list.map(prod =>(
                
                    <Product col={"custom-col"} product={prod}/>
                
            ))
        }
      </div>
    </div>
  )
}
