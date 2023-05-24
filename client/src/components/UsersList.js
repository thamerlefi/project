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
  const [pages, setPages] = useState(1)
  const [activePage, setActivePage] = useState(1)
  useEffect(()=>{
    getAllUsers(5,1)
  },[])
  //------------------------------ get all users handler (admin)
  async function getAllUsers(limit,page) {
    try {
      dispatch(pending())
      const res = await axios.get(baseURL + `api/admin/users/?limit=${limit}&page=${page}`, {headers: {
        "x-auth" : localStorage.getItem('token')
      }})
      setAllUsers(res.data.users)
      setPages(res.data.pages)
      setActivePage(page)
      dispatch(fulfilled(res.data.message))
    } catch (error) {
      dispatch(rejected(error.response.data.message))
    }
  }

  // generating an array for all users pages [1,2,3...]
  let Pagesbuttons = []
   for(let i=1;i<=pages;i++){
    Pagesbuttons.push(i)
  }
  //------------------------------ delete a user handler (admin)
  const deleteUserHandler = async(user) =>{
    try {
      dispatch(pending())
      const res = await axios.delete(baseURL + `api/admin/remove-user/${user._id}`, {headers: {
        "x-auth" : localStorage.getItem('token')
      }})
      getAllUsers(5,activePage || activePage-1)
      dispatch(fulfilled(res.data.message))
      toast(res.data.message, {type: "success"})
    } catch (error) {
      dispatch(rejected(error.response.data.message))
      toast(error.response.data.message, {type: "error"})
    }
  }

  return (
    <div className='mt-4'>
      {/* ---------------------------- users list */}
      <ListGroup>
        {allUsers.map(user =>  <ListGroup.Item key={user._id} className='d-flex justify-content-between'>
          {`${user.lastName} ${user.firstName}`}
          <div>
            <span className={`me-2 ${user.isAdmin ? 'text-success': 'text-danger' }`}>{user.isAdmin ? 'admin' : 'user'}</span>
            <button className='btn btn-info me-2'>edit</button>
            <button className='btn btn-danger' onClick={()=>deleteUserHandler(user)}>delete</button>
          </div>
        </ListGroup.Item> )}
    </ListGroup>   
        {/* ----------------------- pagination buttons  */}
    <div className='mt-3'> 
        {Pagesbuttons.map(page => (
          <button key={page} 
          className={`btn px-2 py-0 text-primary me-1  
                    ${page === activePage ? 'border border-success':''} `}
            onClick={()=>getAllUsers(5,page)}
          >
            {page}
          </button>
        ))}
    </div>
    </div>
  )
}
