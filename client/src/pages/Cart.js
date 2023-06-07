import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decCount, deleteProd, incCount } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios"
import {baseURL} from "../baseURL"
import { pending } from "../redux/slices/authSlice";
import { loadStripe } from '@stripe/stripe-js';
import { clientSecretStripe } from "../utils/clientSecretStrippe";

const stripePromise = loadStripe(clientSecretStripe);

export default function Cart() {
  const { cart,total } = useSelector((state) => state.shopCart);
  const { isLoggedIn, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const checkoutHandler = async(e)=>{
    e.preventDefault()
    try {
      dispatch(pending())

      const {data} = await axios.post(`${baseURL}api/orders/create-checkout`,{
        cart,
        userId: user.id,
      },{headers: {
        "x-auth" : localStorage.getItem('token')
    }})
    const sessionId = data.sessionId
    const stripe = await stripePromise;
    localStorage.setItem('sessionId', sessionId)
    localStorage.setItem('userId', user.id)
    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
      console.error(result.error);
    }
    console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="text-center my-4">
        <h3>your shopping cart</h3>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">img</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Count</th>
            <th scope="col">Sub-Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((prod,i)=>(
              <tr key={prod._id}>
                <th scope="row">{i+1}</th>
                <td ><img style={{width:"40px",height:"40px"}} src={prod.image.secure_url} alt="" /></td>
                <td>{prod.name}</td>
                <td>{prod.price} $</td>
                <td>
                  <button className="btn" onClick={()=>dispatch(decCount(prod))}>-</button>
                  {prod.count}
                  <button className="btn" onClick={()=>dispatch(incCount(prod))}>+</button>
                </td>
                <td>{prod.subTotal} $</td>
                <td><button className="btn btn-outline-danger" 
                onClick={()=>dispatch(deleteProd(prod))} >delete</button></td>
                
              </tr>
            ))
          }
          
        </tbody>
      </table>
      
      <div className="alert alert-secondary text-end pe-3 mb-4">
          <span >total: {total} $</span>
          {total !== 0 ? 
        <Link onClick={()=>dispatch(clearCart())} className=" ms-3">clear cart</Link>: null}
      </div>
      <div className="text-end ">
        {isLoggedIn ?

          <button className="btn btn-success" disabled={total===0 ? true : false}
            onClick={checkoutHandler}
          > 
            {isLoading ? "pending..." : "checkout"} ({total}$)
          </button>

           : 
          <span className="alert alert-warning " disabled>please <Link to="/login">login</Link> first</span> 

        }
      </div>
    </div>
  );
}
