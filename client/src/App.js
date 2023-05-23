import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { getUser, reset } from './redux/slices/authSlice';
import { Container } from 'react-bootstrap';
import Admin from './pages/Admin';
import UsersList from './components/UsersList';
import ResetPass from './pages/ResetPass'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const {isLoggedIn} = useSelector(state => state.auth)
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
          <Route path='/' Component={Home} />
          {  <Route path='/login' Component={Login} />}
          {  <Route path='/reset-password' element={<ResetPass />} />}
          { <Route path='/register' Component={Register} />}
          {  <Route path='/profile' element={<Profile />} />}
          <Route path='/admin' element={<Admin />} >
            <Route path='users' element={<UsersList />} />
          </Route>
          <Route path='/cart' Component={Cart}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Container>
      
    </div>
  );
}

export default App;
