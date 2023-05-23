import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from '../baseURL';
import { fulfilled, pending, rejected } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
// import { getAllUsers } from '../redux/slices/adminSlice';

export default function UsersList() {
  const dispatch = useDispatch()
  // const auth = useSelector(state => state.auth)
  const [allUsers, setAllUsers] = useState([])
  useEffect(()=>{
    getAllUsers()
  },[])
  //------------------------------ get all users handler (admin)
  async function getAllUsers() {
    try {
      dispatch(pending())
      const res = await axios.get(baseURL + 'api/admin/users', {headers: {
        "x-auth" : localStorage.getItem('token')
      }})
      setAllUsers(res.data.users)
      dispatch(fulfilled(res.data.message))
    } catch (error) {
      dispatch(rejected(error.response.data.message))
    }
  }

  //------------------------------ delete a user handler (admin)
  const deleteUserHandler = async(user) =>{
    try {
      dispatch(pending())
      const res = await axios.delete(baseURL + `api/admin/remove-user/${user._id}`, {headers: {
        "x-auth" : localStorage.getItem('token')
      }})
      console.log(res.data)
      getAllUsers()
      dispatch(fulfilled(res.data.message))
      toast(res.data.message, {type: "success"})
    } catch (error) {
      dispatch(rejected(error.response.data.message))
      toast(error.response.data.message, {type: "error"})
    }
  }
  return (
    <div className='mt-4'>
      <ListGroup>
        {allUsers.map(user =>  <ListGroup.Item className='d-flex justify-content-between'>
          {`${user.lastName} ${user.firstName}`}
          <div>
            <span className={`me-2 ${user.isAdmin ? 'text-success': 'text-danger' }`}>{user.isAdmin ? 'admin' : 'user'}</span>
            <button className='btn btn-info me-2'>edit</button>
            <button className='btn btn-danger' onClick={()=>deleteUserHandler(user)}>delete</button>
          </div>
        </ListGroup.Item> )}
      
    </ListGroup>      
    </div>
  )
}
