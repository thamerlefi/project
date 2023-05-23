import axios from 'axios'
import React, { useEffect } from 'react'

export default function Home() {
  useEffect(()=>{
    axios.get('http://localhost:5000/api/user/profile')
    .then(res=>console.log(res.data))
    .catch(er=>console.log(er.response.data))
  },[])
  return (
    <div>
      home page
    </div>
  )
}
