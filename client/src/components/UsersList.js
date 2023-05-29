import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from '../baseURL';
import { fulfilled, pending, rejected } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

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
      setAllUsers(res.data.list)
      setPages(res.data.pages)
      setActivePage(page)
      dispatch(fulfilled(res.data.message))
    } catch (error) {
      dispatch(rejected(error.response.data.message))
    }
  }

  // generating an array for all users pages [1,2,3...]
  let PagesButtons = []
   for(let i=1;i<=pages;i++){
    PagesButtons.push(i)
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
      <div style={{minHeight:"285px"}}>
      <ListGroup >
        {allUsers.map((user,i) =>  <ListGroup.Item key={user._id} className='d-flex justify-content-between'>
          {`${(i+1) + ((activePage - 1) * 5)} - ${user.lastName} ${user.firstName}`}
          <div>
            <span className={`me-2 ${user.isAdmin ? 'text-success': 'text-danger' }`}>{user.isAdmin ? 'admin' : 'user'}</span>
            <button className='btn btn-info me-2'>edit</button>
            <button className='btn btn-danger' onClick={()=>deleteUserHandler(user)}>delete</button>
          </div>
        </ListGroup.Item> )}
    </ListGroup>   
    </div>
        {/* ----------------------- pagination buttons  */}
    <div > 
        {PagesButtons.map(page => (
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
