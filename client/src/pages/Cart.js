import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decCount, deleteProd, incCount } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart } = useSelector((state) => state.shopCart);
  const { total } = useSelector((state) => state.shopCart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  return (
    <div>
      {/* {cart.map(prod=>(
        <p>{prod.name}</p>
      ))} */}
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
          <button className="btn btn-success" disabled={total===0 ? true : false}> order ({total}$)</button> : 
          <span className="alert alert-warning " disabled>please <Link to="/login">login</Link> first</span> 

        }
      </div>
    </div>
  );
}
