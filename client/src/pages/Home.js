import axios from 'axios'
import React, { useEffect } from 'react'
import { getUser } from '../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(()=>{
    // axios.get('http://localhost:5000/api/user/profile')
    // .then(res=>console.log(res.data))
    // .catch(er=>console.log(er.response.data))
    dispatch(getUser())
  },[])
  return (
    <div>
      home page
    </div>
  )
}
