import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { baseURL } from "../baseURL";
import { fulfilled, pending, rejected } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

export default function UsersList() {
  const dispatch = useDispatch();

  const [allUsers, setAllUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [activePage, setActivePage] = useState(1);

  // sort states
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    getAllUsers(5, 1, sortBy, order);
    console.log("aa");
  }, [sortBy, order]);

  //------------------------------ get all users handler (admin)
  async function getAllUsers(limit, page, sortBy, order) {
    try {
      dispatch(pending());
      const res = await axios.get(
        baseURL +
          `api/admin/users/?limit=${limit}&page=${page}&sortBy=${sortBy},${order}`,
        {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        }
      );
      setAllUsers(res.data.list);
      setPages(res.data.pages);
      setActivePage(page);
      dispatch(fulfilled(res.data.message));
    } catch (error) {
      dispatch(rejected(error.response.data.message));
    }
  }

  // generating an array for all users pages [1,2,3...]
  let PagesButtons = [];
  for (let i = 1; i <= pages; i++) {
    PagesButtons.push(i);
  }
  //------------------------------ delete a user handler (admin)
  const deleteUserHandler = async (user) => {
    try {
      dispatch(pending());
      const res = await axios.delete(
        baseURL + `api/admin/remove-user/${user._id}`,
        {
          headers: {
            "x-auth": localStorage.getItem("token"),
          },
        }
      );
      getAllUsers(5, activePage || activePage - 1);
      dispatch(fulfilled(res.data.message));
      toast(res.data.message, { type: "success" });
    } catch (error) {
      dispatch(rejected(error.response.data.message));
      toast(error.response.data.message, { type: "error" });
    }
  };

  // return (
  //   <div className='mt-4'>
  //     {/* ---------------------------- users list */}
  //     <div className='row mb-3'>
  //       <div className='col-4'>
  //         <select onChange={(e)=>{setSortBy(e.target.value)}} className="form-select">
  //             <option value='createdAt' >sort by</option>
  //             <option value="createdAt">date</option>
  //             <option value="firstName">first name</option>
  //             <option value="lastName">last name</option>
  //             <option value="isAdmin">role</option>
  //         </select>
  //       </div>
  //       <div className='col-3 mt-1'>
  //         <input className="form-check-input " type="radio" name="flexRadioDefault" id='flexRadioDefault2'
  //           value={"asc"}
  //           checked={order === "asc"}
  //           onChange={(e)=>setOrder(e.target.value)}
  //         />
  //         <label className="form-check-label" htmlFor="flexRadioDefault2">
  //           Ascendant
  //         </label>
  //         <input className="form-check-input ms-3" type="radio" name="flexRadioDefault" id='flexRadioDefault1'
  //           value={"desc"}
  //           checked={order === "desc"}
  //           onChange={(e)=>setOrder(e.target.value)}
  //         />
  //         <label className="form-check-label" htmlFor="flexRadioDefault1">
  //           Descendant
  //         </label>
  //       </div>
  //       <div className='col-3'>
  //         <input className="form-control me-2" placeholder="Search"/>
  //       </div>
  //     </div>
  //     <div style={{minHeight:"285px"}}>
  //     <ListGroup >
  //       {allUsers.map((user,i) =>  <ListGroup.Item key={user._id} className='d-flex justify-content-between'>
  //         {`${(i+1) + ((activePage - 1) * 5)} - ${user.lastName} ${user.firstName}`}
  //         <div>
  //           <span className={`me-2 ${user.isAdmin ? 'text-success': 'text-danger' }`}>{user.isAdmin ? 'admin' : 'user'}</span>
  //           <button className='btn btn-outline-info me-2'>edit</button>
  //           <button className='btn btn-outline-danger' onClick={()=>deleteUserHandler(user)}>delete</button>
  //         </div>
  //       </ListGroup.Item> )}
  //   </ListGroup>
  //   </div>
  //       {/* ----------------------- pagination buttons  */}
  //   <div >
  //       {PagesButtons.map(page => (
  //         <button key={page}
  //           className={`btn px-2 py-0 text-primary me-1
  //                   ${page === activePage ? 'border border-success':''} `}
  //           onClick={()=>getAllUsers(5,page)}
  //         >
  //           {page}
  //         </button>
  //       ))}
  //   </div>
  //   </div>
  // )
  return (

    <div className="users-list mt-4">
      <h5 className="border-bottom">Users List</h5>
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              Customer <i class="fa-solid fa-arrow-up ms-1"></i><i class="fa-solid fa-arrow-down"></i>
              </th>
            <th scope="col">
              Role <i class="fa-solid fa-arrow-up ms-1"></i><i class="fa-solid fa-arrow-down"></i>
              </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((user,i) =>(
              <tr key={user._id}>
            <th scope="row">{i+1}</th>
            <td>{user.lastName + " "+ user.firstName}</td>
            <td>{user.isAdmin ? 'admin' : 'user'}</td>
            <td>
            <i class="fa-solid fa-trash"></i>
            </td>
          </tr>
            ))
          }
          
        </tbody>
      </table>
    </div>
  );
}
