import {
  Container,
  Nav,
  NavDropdown,
  NavLink,
  Navbar,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {BsSearch} from 'react-icons/bs'

export default function NavBar() {
  const {user, isLoggedIn} = useSelector(state => state.auth)
  const shopCart = useSelector(state=> state.shopCart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }
 
  
  // return (
  //   <div>
  //     <Navbar bg="dark" variant="dark">
  //       <Container className="flex justify-content-between ">
  //         {/* ------------------- LOGO ----------------- */}
  //         <LinkContainer to='/'>
  //             <Navbar.Brand >Tek-Shop</Navbar.Brand>
  //         </LinkContainer>

  //         <Nav className="">
  //           {/* ------------------------ cart button ------------------ */}
  //         <LinkContainer to='/cart'>
  //           <Nav.Link >
  //           Cart 
  //           {shopCart.cart.length > 0  && <span className="ms-1" 
  //           style={{color:"#fff",background:"red",width:"20px",padding:"0px 5px",borderRadius:"50%"}}>
  //             {shopCart.cart.length}
  //           </span>}
  //           </Nav.Link>
  //         </LinkContainer>
  //          {
  //           isLoggedIn ? 
  //           <>
  //            {/* ------------------------ admin dropdown --------------- */}
  //            { user.isAdmin &&
  //           <NavDropdown title="Admin" id="navbarScrollingDropdown">
  //             <LinkContainer to="/admin/dashboard">
  //               <NavDropdown.Item href="#action4">Admin Dashboard</NavDropdown.Item>
  //             </LinkContainer>
  //             <LinkContainer to='/admin/users'>
  //               <NavDropdown.Item>Users List</NavDropdown.Item>
  //             </LinkContainer>
  //             <LinkContainer to="/admin/products">
  //               <NavDropdown.Item href="#action4">Products List</NavDropdown.Item>
  //             </LinkContainer>
  //             <LinkContainer to="/admin/orders">
  //               <NavDropdown.Item >Orders List</NavDropdown.Item>
  //             </LinkContainer>
  //           </NavDropdown>}
  //             {/* ----------------------- user dropdown ----------------- */}
  //           { 
  //           <NavDropdown title={user && user.lastName} id="navbarScrollingDropdown">
  //             <LinkContainer to='/user/profile'>
  //               <NavDropdown.Item >
  //                 {user?.image["secure_url"] !=="" &&
  //                 <img className="me-1" style={{width:"30px",borderRadius:"50%"}} src={user?.image["secure_url"] } alt="" />}
  //                 <span >{`${user.firstName} ${user.lastName}`}</span>
  //               </NavDropdown.Item >
  //             </LinkContainer>
  //             <NavDropdown.Divider />
  //             <LinkContainer to='/user/profile'>
  //               <NavDropdown.Item >Profile</NavDropdown.Item>
  //             </LinkContainer>
  //             <LinkContainer to='/user/orders'>
  //               <NavDropdown.Item >Orders History</NavDropdown.Item>
  //             </LinkContainer>
  //             <NavDropdown.Divider />
  //             <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
  //           </NavDropdown>}
  //           </> :<>
  //           {<LinkContainer to='/login'><Nav.Link >Login</Nav.Link></LinkContainer>}
  //           {<LinkContainer to='/register'><Nav.Link >Signup</Nav.Link></LinkContainer>}
  //           </>
  //          }
            
  //         </Nav>
  //       </Container>
  //     </Navbar>
  //   </div>
  // );
  return(
    <>
    <header className="header-upper">
      <div className="container-xxl py-3">
        <div className="row align-items-center">
          <div className="col-2">
            <h3 className="mb-0">
              <Link className="text-white" to="/">Tek-Shop</Link>
            </h3>
          </div>
          <div className="col-5">
          <div className="input-group">
            <input type="text" 
              className="form-control p-1" placeholder="Search Product..." 
              aria-label="Search Product..." aria-describedby="basic-addon2"
            />
            <span className="input-group-text" id="basic-addon2">
              <BsSearch />
            </span>
          </div>
          </div>
          <div className="col-5">
            <div className="header-upper-links d-flex align-items-center justify-content-end gap-5">
              <div>
                <Link >
                  <i className="fa-regular  fa-heart text-white fs-4"></i>
                </Link>
              </div>
              <div>
                <Link to="/cart">
                <i className="fa-sharp fa-solid text-white fa-cart-shopping fs-4"></i>
                </Link>
              </div>
              <div>
              <Link to="/login">
              <i className="fa-regular fa-user text-white fs-4"></i>
                </Link>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <header className="header-bottom py-1">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="menu-bottom d-flex align-items-center gap-4">
              <div>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-list me-2"></i>
                  Shop Categories
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><Link className="dropdown-item" >Action</Link></li>
                  <li><Link className="dropdown-item" >Another action</Link></li>
                  <li><Link className="dropdown-item" >Something else here</Link></li>
                </ul>
              </div>
              </div>
              <div className="menu-links">
                <div className="d-flex align-items-center gap-4">
                  <NavLink className="text-white">Home</NavLink>
                  <NavLink className="text-white">Our Store</NavLink>
                  <NavLink className="text-white">Contact</NavLink> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}
