import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../baseURL";
import OrderDetails from "./OrderDetails";

export default function AdminOrder() {
  const [order, setOrder] = useState({});
  const { orderId } = useParams();
  useEffect(() => {
    axios
      .get(`${baseURL}api/orders/${orderId}`, {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((res) => setOrder(res.data.order))
      .catch((er) => console.log(er));
  }, []);
  console.log(order);
  return (
    <div className=" cus-section">
      <div className="border-bottom d-flex align-items-center gap-3 flex-wrap py-1">
        <h6 className="">
          <i className="fa-solid fa-person-military-pointing me-1"></i>
          {`${order.userId?.firstName} ${order.userId?.lastName}`}
        </h6>
        <h6 className="">
          <i className="fa-solid fa-phone me-1"></i>
          {`${order.shippingAdress?.phone.slice(4)}`}
        </h6>
        <h6 className="">
        <i className="fa-solid fa-envelope me-1"></i>
          {`${order.userId?.email}`}
        </h6>
      </div>
      <OrderDetails order={order} setOrder={setOrder} isAdmin={true} />
    </div>
  );
}
