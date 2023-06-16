import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { getUser } from "./redux/slices/authSlice";
import { Container } from "react-bootstrap";
import Admin from "./pages/Admin";
import UsersList from "./components/UsersList";
import ResetPass from "./pages/ResetPass";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminProducts from "./pages/AdminProducts";
import AdminDashboard from "./components/AdminDashboard";
import UpdateProduct from "./components/UpdateProduct";
import GoogleMapLocation from "./pages/GoogleMap";
import ProductDetails from "./pages/ProductDetails";
import { getTotal } from "./redux/slices/cartSlice";
// import ShippingAdress from './components/ShippingAdress';
import CheckoutSuccess from "./pages/CheckoutSuccess";
import AdminOrdersList from "./components/AdminOrdersList";
import AdminOrder from "./components/AdminOrder";
import UserDash from "./pages/UserDash";
import OrderHistory from "./pages/OrderHistory";
import UserOneOrder from "./pages/UserOneOrder";
import OurStore from "./pages/OurStore";
// import { getAllProducts } from './redux/slices/productSlice';

function App() {
  // const {isLoggedIn} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getTotal());
  }, []);
  return (
    <div className="App">
      <ToastContainer position="bottom-center" autoClose={2000} />
      <NavBar />
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<OurStore />} />
          <Route path="/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPass />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment-success" element={<CheckoutSuccess />} />
          <Route path="/location" element={<GoogleMapLocation />} />
          <Route path="/user" element={<UserDash />}>
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="orders/:id" element={<UserOneOrder />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="users" element={<UsersList />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/update/:id" element={<UpdateProduct />} />
            <Route path="orders" element={<AdminOrdersList />} />
            <Route path="orders/:orderId" element={<AdminOrder />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
