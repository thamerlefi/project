import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser, login, reset } from '../redux/slices/authSlice'
import { LinkContainer } from 'react-router-bootstrap'

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {isLoading, isError,isSuccess, message, isLoggedIn} = useSelector(state => state.auth)
   
    useEffect(()=>{
        if(isLoggedIn) navigate('/')
        else dispatch(reset())
    },[isLoggedIn])
    const user = {email, password}
    const loginHandler =(e)=> {
        e.preventDefault()
        dispatch(login(user))
    }
  return (
    <div className='container-xxl mt-3'>
        <div className="row"> 
            <div className='col-4'>
             
            <form>
                <h3>Sign In</h3>
                <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e)=>setEmail(e.target.value)}
                />
                </div>
                <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e)=>setPassword(e.target.value)}
                />
                </div>
                <div className="mb-3">
                <div className="custom-control custom-checkbox">
                    <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                    </label>
                </div>
                </div>
                <div className="d-grid">
                <button type="submit" className="btn btn-primary" onClick={loginHandler}>
                    {isLoading ? 'pending...': 'login' }
                </button>
                </div>
                <LinkContainer to='/reset-password'>
                    <a href='/#' className="forgot-password text-right">Forgot password?</a>
                </LinkContainer>
            </form>
            </div>  
        </div>
    </div>
  )
}
