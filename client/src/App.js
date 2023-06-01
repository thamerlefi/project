import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { useDispatch } from 'react-redux';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { getUser } from './redux/slices/authSlice';
import { Container } from 'react-bootstrap';
import Admin from './pages/Admin';
import UsersList from './components/UsersList';
import ResetPass from './pages/ResetPass'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminProducts from './pages/AdminProducts';
import AdminDashboard from './components/AdminDashboard';
import UpdateProduct from './components/UpdateProduct';
import GoogleMapLocation from './pages/GoogleMap';
import ProductDetails from './pages/ProductDetails';
// import { getAllProducts } from './redux/slices/productSlice';


function App() {
  // const {isLoggedIn} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUser())
  },[])
  return (
    <div className="App">
        <ToastContainer position="bottom-center" autoClose={2000}/>
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:id' element={<ProductDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<ResetPass />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<Admin />} >
            <Route path='users' element={<UsersList />} />
            <Route path='products' element={<AdminProducts />} />
            <Route path='products/update/:id' element={<UpdateProduct />} />
            <Route path='dashboard' element={<AdminDashboard />} />
          </Route>
          <Route path='/cart' Component={Cart}/>
          <Route path='/location' element={<GoogleMapLocation />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Container>
      
    </div>
  );
}

export default App;
