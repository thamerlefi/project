import axios from 'axios'
import React, { useState } from 'react'
import { baseURL } from "../baseURL";
import { useDispatch, useSelector } from 'react-redux';
import { pending, rejected } from '../redux/slices/authSlice';
import { fulfilled } from '../redux/slices/authSlice';

export default function ResetPass() {
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth) 
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState('')
    const resetPassHandler = async(e) =>{
        e.preventDefault()
        try {
            dispatch(pending())
            const res = await axios.post(`${baseURL}api/user/forgot-password`,{email})
            setMessage(res.data.message)
            dispatch(fulfilled())
        } catch (error) {
            setMessage(error.response.data.message)
            dispatch(rejected())
        }
    }
  return (
    <div className='container mt-5'>
        <h5 className='mb-3'>enter your email to reset your password</h5>
      <form onSubmit={resetPassHandler}>
        <input
            type="email"
            className="form-control"
            style={{width:"400px"}}
            placeholder="Enter email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-3">
            {auth.isLoading ? "sending..." : "send"}
        </button>
      </form>
      {message !== "" && <p>{message}</p>}
    </div>
  )
}
