import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { baseURL } from "../baseURL";
import axios from "axios";
import CategChart from "./CategChart";
import { AdminChart } from "./AdminChart";

export default function AdminDashboard() {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    
    getDashInfo();
  }, []);

  async function getDashInfo() {
   
    try {
      const res = await axios.get(baseURL + "api/admin", {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      });
      setProducts(res.data.products);
      setUsers(res.data.users);
      setOrders(res.data.orders);
      setWallet(res.data.walletBalance);
    } catch (error) {}
  }

  return (
    <div className="mt-3 admin-dash pe-0">
      {/* ----------------------------------- part-1 */}
      <div className="row gap-2 part-1">
        <div
          className="part col-12 "
          style={{ background: "linear-gradient(45deg, #ff009d, #e7645b)" }}
        >
          <div className="d-flex gap-2 align-items-center">
            <i class="fa-solid text-white fa-users me-2 fs-2"></i>
            <div>
              <h5 className="text-white">{users}</h5>
              <h4 className="text-white">Customers</h4>
            </div>
          </div>
        </div>
        <div
          className="part col-12"
          style={{ background: "linear-gradient(45deg, #491ba0, #af5be7)" }}
        >
          <div className="d-flex gap-2 align-items-center">
            <i class="fa-solid text-white fa-sitemap me-2 fs-2"></i>
            <div>
              <h5 className="text-white">{products}</h5>
              <h4 className="text-white">Products</h4>
            </div>
          </div>
        </div>
        <div
          className="part col-12"
          style={{ background: "linear-gradient(45deg, #1b76a0, #5ba8e7)" }}
        >
          
          <div className="d-flex gap-2 align-items-center">
          <i class="fa-solid text-white fa-pen me-2 fs-2"></i>
            <div>
              <h5 className="text-white">{orders}</h5>
              <h4 className="text-white">Orders</h4>
            </div>
          </div>
        </div>
        <div
          className="part col-12"
          style={{ background: "linear-gradient(45deg, #c9bd19, #d1c95b)" }}
        >
          
          <div className="d-flex gap-2 align-items-center">
          <i class="fa-solid fa-wallet text-white fs-2"></i>
            <div>
              <h5 className="text-white">{wallet} $</h5>
              <h5 className="text-white">Wallet balance</h5>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------- part-2 */}
      <div className="row gap-5 mt-4 ps-2 part-2">
        <div className="col-12 col-md-7 border part">
          <AdminChart />
        </div>
        <div className="col-12 col-md-4 part p-0">
        <CategChart />
        </div>
      </div>
    </div>
  );
}
