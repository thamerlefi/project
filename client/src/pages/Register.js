import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../redux/slices/authSlice';


export default function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isLoggedIn} =  useSelector(state => state.auth)
    useEffect(()=>{
        if(isLoggedIn) navigate('/')
        else dispatch(reset())
    },[isLoggedIn])

    const handleRegister = (e)=>{
        e.preventDefault()
        const newUser = {firstName,lastName,email,password, confirm}
        dispatch(register(newUser))
        
    }
  return (
    <div className='container mt-3'>
        <div className="row"> 
            <div className='col-4'>
             
            <form>
                <h3>Sign Up</h3>
                <div className="mb-3">
                {/* <label>First Name</label> */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your first name"
                    onChange={(e)=>setFirstName(e.target.value)}
                />
                </div>
                <div className="mb-3">
                
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your last name"
                    onChange={(e)=>setLastName(e.target.value)}
                />
                </div>
                <div className="mb-3">
                
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e)=>setEmail(e.target.value)}
                />
                </div>
                <div className="mb-3">
                
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e)=>setPassword(e.target.value)}
                />
                </div>
                <div className="mb-3">
                
                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    onChange={(e)=>setConfirm(e.target.value)}
                />
                </div>
                <div className="mb-2">
            
                </div>
                <div className="d-grid">
                <button type="submit" className="btn btn-primary" onClick={handleRegister}>
                    Signup
                </button>
                </div>
                
            </form>
            </div>  
        </div>
    </div>
  )
}
