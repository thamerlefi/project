import React from 'react'

export default function OrderDetails({order, isAdmin}) {
  return (
    <div className='col-8'>
        <div className='row mb-2 border-bottom border-2 pb-2'>
          <div className='col-4'>
            <h4 className=''>{`Total: ${order.totalPrice} $`}</h4>
          </div>
          <div className='col-4'>
          <h4 className=''>{`Status: ${order.status}`}</h4>
          </div>
          {isAdmin && <div className='col-4'>
            <button className='btn btn-success'>Processing ?</button>
          </div>}
        </div>
        <h4 className='ms-1'>{`${order.products?.length} items`}</h4>
        {
          order.products?.map(product=>(
            <div key={product._id} className='border border-2 row mb-1 ms-1'>
              <div className='col-3'>
                <img src={product.productId.image?.secure_url} alt="" 
                  style={{width:"100px"}}
                />
              </div>
              <div className='col-4'>
                <h4>{product.productId.name}</h4>
                <h6 className='text-primary'>{product.productId.category}</h6>
                <h6 className='text-success'>{product.productId.price} $</h6>
              </div>
              <div className='col-4'>
                <h5>Quantity: {product.quantity}</h5>
                <h6 className='text-danger'>Sub-Total: {product.quantity * product.productId.price} $</h6>
              </div>
            </div>
          ))
        }
      </div>
  )
}
