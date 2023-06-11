import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../baseURL";
import { LinkContainer } from 'react-router-bootstrap'

export default function OrderHistory() {
  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURL}api/orders/user/orders`, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((res) => setUserOrders(res.data.orders));
  }, []);
  const tranformDate = (date) => {
    let endDt = "",
      hr = "",
      dt = "";
    dt = date.split("T")[0].split("-").reverse().join("/");
    hr = date.split("T")[1].split(".")[0];
    hr = hr.split(":")[0] + ":" + hr.split(":")[1];
    endDt = hr + "-" + dt;
    return endDt;
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Products</th>
            <th scope="col">Date</th>
            <th scope="col">Total Price</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order) => (
            <tr key={order._id}>
              <th scope="row">1</th>
              <td>
                {
                order.products.map(prod=><p className="mb-0" key={prod.productId._id}>
                                                # {prod.productId.name}
                                        </p>)}
              </td>
              <td>{tranformDate(order.createdAt)}</td>
              <td>{order.totalPrice} $</td>
              <td>{order.status}</td>
              <td>
                <LinkContainer to={`/user/orders/${order._id}`}>
                    <button className="btn btn-outline-info">details</button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
