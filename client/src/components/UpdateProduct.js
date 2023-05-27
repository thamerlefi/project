import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../redux/slices/productSlice'

export default function UpdateProduct() {
    const {product} = useSelector(state=>state.products)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [stock, setStock] = useState('')
    

    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(()=>{
        dispatch(getOneProduct(id))
    },[])
    useEffect(()=>{
        setName(product.name)
        setPrice(product.price)
        setCategory(product.category)
        setDescription(product.description)
        setStock(product.stock)
    },[product])
  return (
    <div className='mt-3 row update-product'>
      <div className='col-8'>
      <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control mt-1" placeholder="name of product" />
        <input value={price} onChange={(e)=>{setPrice(+e.target.value)}} type="number" className="form-control mt-1" placeholder="price ?" />
        <div className='mt-1'>
        <select value={category} onChange={(e)=>{setCategory(e.target.value)}} className="form-select"  >
            <option value='' >Choose category</option>
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
            <option value="Camera">Camera</option>
            <option value="Accessories">Accessories</option>
        </select>
        </div>
        <input value={description} onChange={(e)=>{setDescription(e.target.value)}} type="text" className="form-control mt-1" placeholder="descrition" />
        <input type="file" accept="image/"  className="form-control mt-1"  />
        <input value={stock} onChange={(e)=>{setStock(+e.target.value)}} type="number" className="form-control mt-1" placeholder="count in stock" />
        <button className='btn btn-warning mt-2'>update</button>
      </div>
      <div className='col-4'>
        { product.image && <img src={product.image.secure_url} alt="" />}
      </div>
    </div>
  )
}
