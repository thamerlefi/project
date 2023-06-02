import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct } from "../redux/slices/productSlice";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../baseURL";
import { toast } from "react-toastify";
import { addProduct, decCount, deleteProd, incCount } from "../redux/slices/cartSlice";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const auth = useSelector((state) => state.auth);
  const {cart} = useSelector(state => state.shopCart)
  const cartProd = cart.find(prod=>prod._id === products.product._id)
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [comment, setComment] = useState("");

  const commentHandler = async(e) =>{
    const data = {comment,
        userId:auth.user.id,
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
        image: auth.user.image.secure_url
    }
    e.preventDefault()
    try {
        const res = await axios.post(`${baseURL}api/products/${id}/comment`,data,{headers: {
            "x-auth" : localStorage.getItem('token')
        }})
        toast(res.data.message,  {type: "success"})
        dispatch(getOneProduct(id))
        setComment('')
    } catch (error) {
        toast(error.response.data.message,{type: "error"})
    }
  }

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, []);

  useEffect(() => {
    setProduct(products.product);
  }, [products.product]);

  return (
    <div>
      <div className="row">
        <h1>{product.name}</h1>
        <div className="col-4">
          <img
            style={{ width: "80%", height: 400, objectFit: "cover" }}
            src={product.image?.secure_url}
            alt=""
          />
        </div>
        <div className="col-4">
          <p>{product.description}</p>
        </div>
        <div className="col-4 border-start border-1 border-secondary">
          <div className=" pb-4">
            <p className="text-primary fs-5">Rating :</p>
            {/* <Rating movie={product} /> */}
          </div>
          <div className="col-4 border-top border-2">
            <p className="text-primary fs-5">Category :</p>
            <h5>{product.category}</h5>
          </div>
          { cartProd ?
            <div>
            <button className="btn btn-success" onClick={()=>dispatch(decCount(product))}>-</button>
            <span className="mx-4">{cartProd.count}</span>
            <button className="btn btn-success me-2" onClick={()=>dispatch(incCount(product))}>+</button>
            <button className="btn btn-danger" onClick={()=>dispatch(deleteProd(product))}>delete</button>
          </div> :
          <button className="btn btn-success"
            onClick={()=>dispatch(addProduct(product))}
          >add to cart</button>
          }
          
        </div>
        {/* ------------------------- comments */}
      </div>
      <div className="row">
        <div className="col-6">
          <h3>Comments :</h3>
          {auth.isLoggedIn ? (
            <form className="d-flex" onSubmit={commentHandler}>
              <input
              value={comment}
                className="form-control me-2"
                placeholder="Write a comment"
                onChange={(e)=>setComment(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Comment
              </button>
            </form>
          ) : (
            <div className="alert alert-warning" role="alert">
              please <Link to="/login">login</Link> to be able to add a comment !!
            </div>
          )}
          <ListGroup className="my-3">
            {(  product.reviews && [...product.reviews].reverse().map(elmnt=>(
                <ListGroup.Item key={elmnt._id} className="d-flex">
                <div>
                    <img src={elmnt.user.image} 
                        style={{width:"30px",height:"30px", borderRadius:"50%"}} alt="" />
                </div>
                <div>
                    <span style={{fontSize:"14px"}} className="ms-2 fw-bolder">{`${elmnt.user?.firstName} ${elmnt.user?.lastName}`}</span>
                    <p className="ms-2 mb-0">{elmnt.comment}</p>
                </div>
                </ListGroup.Item>
            ))
                
            )}
            
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
