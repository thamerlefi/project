import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {addProduct, decCount, deleteProd, incCount } from "../redux/slices/cartSlice";
import "../css/productCard.css";
import ReactStars from "react-rating-stars-component";


export default function Product({product, col}) {
  const dispatch = useDispatch()
  const {cart} = useSelector(state => state.shopCart)
  const cartProd = cart.find(prod=>prod._id === product._id)
  // return (

  //       <div className="col-3 mb-3">
  //       <Card style={{ width: '17rem' }}>
  //         <Card.Img variant="top"
  //            style={{width:"100%", height:"250px",objectFit:"cover"}} 
  //            src={product.image.secure_url} />
  //         <Card.Body>
  //           <Card.Title>
  //             <Link to={product._id}>{product.name} </Link>
  //           </Card.Title>
  //           {/* <Card.Text>{product.description}</Card.Text> */}
  //           {  cartProd ? 
  //             <div>
  //               <button className="btn btn-success" onClick={()=>dispatch(decCount(product))}>-</button>
  //               <span className="mx-4">{cartProd.count}</span>
  //               <button className="btn btn-success me-2" onClick={()=>dispatch(incCount(product))}>+</button>
  //               <button className="btn btn-danger" onClick={()=>dispatch(deleteProd(product))}>delete</button>
  //             </div> :
  //             <Button variant="primary"
  //             onClick={()=>dispatch(addProduct(product))}
  //           >
  //             add to cart
  //           </Button>
  //           }
  //         </Card.Body>
  //       </Card>
  //       </div>
  // )
  return (
    <div className={`${col || "col-2"} product-card position-relative`} style={{width:"217px"}}>
      <div className="product-img">
        <Link to={"/"+product._id}>
          <img src={product.image.secure_url} alt="" />
        </Link>
      </div>
      <div className="product-details">
        <h6 className="brand">{product.category}</h6>
        <h5 className="product-title">{product.name}</h5>
        <ReactStars
          count={5}
          // onChange={ratingChanged}
          size={18}
          value={4.5}
          edit={false}
          isHalf={true}
          activeColor="#ffd700"
          />
        <p className="product-price">${product.price}</p>
      </div>
      <div className='action-bar position-absolute '>
        <div className='d-flex flex-column gap-2 align-items-center'>
        <i className="fa-sharp fa-solid  fa-cart-shopping fs-6"></i>
        <i className="fa-regular  fa-heart fs-6"></i>
        <Link to={"/"+product._id}>
          <i class="fa-solid fa-eye fs-6"></i>
        </Link>
        </div>
      </div>
    </div>
  )
}
