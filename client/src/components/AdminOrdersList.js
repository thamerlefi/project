import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../baseURL";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

export default function AdminOrdersList() {
  const [orders, setOrders] = useState([]);
  //----------- sortBy state
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(
        `${baseURL}api/orders/all/?limit=${5}&page=${activePage}&sortBy=${sortBy},${order}&filter=${filter}`,
        {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setOrders(res.data.orders.list);
        setPages(res.data.orders.pages);
      })
      .catch((er) => console.log(er));
  }, [activePage, filter]);

  // generate buttons pages
  let PagesButtons = [];
  for (let i = 1; i <= pages; i++) {
    PagesButtons.push(i);
  }

  

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
  // ---------------------------------------- J--S--X-------
  //               <button
  //                 disabled={order.status === "Delivered" ? true : false}
  //                 onClick={() => updateStatusHandler(order.status, order._id)}
  //               >
  //                 {order.status === "Pending"
  //                   ? "Processing ?"
  //                   : order.status === "Processing"
  //                   ? "Shipped ?"
  //                   : order.status === "Shipped"
  //                   ? "Delivered ?"
  //                   : "ended"}
  //               </button>

  return (
    <>
      <div className="mt-2 orders-list">
        <table className="table table-striped align-middle mb-0 bg-white custom-table">
          <thead className="bg-light">
            <tr>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={order.userId.image.secure_url}
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {order.userId.firstName + " " + order.userId.lastName}
                      </p>
                      <p className="text-muted mb-0">{order.userId.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">
                    {tranformDate(order.createdAt)}
                  </p>
                  {/* <p className="text-muted mb-0">IT department</p> */}
                </td>
                <td>
                  <span
                    className={`badge rounded-pill d-inline ${
                      order.status === "Pending"
                        ? "bg-warning"
                        : order.status === "Processing"
                        ? "bg-info"
                        : order.status === "Delivered"
                        ? "bg-primary"
                        : "bg-success"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.totalPrice} $</td>
                <td>
                  <Link
                    to={`/admin/orders/${order._id}`}
                    type="button"
                    className="btn btn-link btn-sm btn-rounded"
                  >
                    <i className="fa-solid fs-6 fa-pen-to-square"></i> 
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="section mt-2 d-flex align-items-center justify-content-between">
        <div>
          <select
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className="form-select py-0 "
          >
            <option value="">All Orders</option>
            <option value="status,Pending">Pending</option>
            <option value="status,Processing">Processing</option>
            <option value="status,Shipped">Shipped</option>
            <option value="status,Delivered">Delivered</option>
          </select>
        </div>
        <div className="pages">
          {PagesButtons.map((page) => (
            <Link
              key={page}
              className={page === activePage ? "active" : ""}
              onClick={() => setActivePage(page)}
            >
              {page}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
