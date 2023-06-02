import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {addProduct, decCount, deleteProd, incCount } from "../redux/slices/cartSlice";


export default function Product({product}) {
  const dispatch = useDispatch()
  const {cart} = useSelector(state => state.shopCart)
  const cartProd = cart.find(prod=>prod._id === product._id)
  return (

        <div className="col-3 mb-3">
        <Card style={{ width: '17rem' }}>
          <Card.Img variant="top"
             style={{width:"100%", height:"250px",objectFit:"cover"}} 
             src={product.image.secure_url} />
          <Card.Body>
            <Card.Title>
              <Link to={product._id}>{product.name} </Link>
            </Card.Title>
            {/* <Card.Text>{product.description}</Card.Text> */}
            {  cartProd ? 
              <div>
                <button className="btn btn-success" onClick={()=>dispatch(decCount(product))}>-</button>
                <span className="mx-4">{cartProd.count}</span>
                <button className="btn btn-success me-2" onClick={()=>dispatch(incCount(product))}>+</button>
                <button className="btn btn-danger" onClick={()=>dispatch(deleteProd(product))}>delete</button>
              </div> :
              <Button variant="primary"
              onClick={()=>dispatch(addProduct(product))}
            >
              add to cart
            </Button>
            }
          </Card.Body>
        </Card>
        </div>
  )
}
