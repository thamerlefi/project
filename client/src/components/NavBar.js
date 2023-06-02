import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const {user, isLoggedIn} = useSelector(state => state.auth)
  const shopCart = useSelector(state=> state.shopCart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }
 
  
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container className="flex justify-content-between ">
          {/* ------------------- LOGO ----------------- */}
          <LinkContainer to='/'>
              <Navbar.Brand >Auto Shop</Navbar.Brand>
          </LinkContainer>

          <Nav className="">
            {/* ------------------------ cart button ------------------ */}
          <LinkContainer to='/cart'>
            <Nav.Link >
            Cart 
            {shopCart.cart.length > 0  && <span className="ms-1" 
            style={{color:"#fff",background:"red",width:"20px",padding:"0px 5px",borderRadius:"50%"}}>
              {shopCart.cart.length}
            </span>}
            </Nav.Link>
          </LinkContainer>
           {
            isLoggedIn ? 
            <>
             {/* ------------------------ admin dropdown --------------- */}
             { user.isAdmin &&
            <NavDropdown title="Admin" id="navbarScrollingDropdown">
              <LinkContainer to="/admin/dashboard">
                <NavDropdown.Item href="#action4">Admin Dashboard</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/users'>
                <NavDropdown.Item>Users List</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/products">
                <NavDropdown.Item href="#action4">Products List</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item href="#action4">Orders List</NavDropdown.Item>
            </NavDropdown>}
              {/* ----------------------- user dropdown ----------------- */}
            { 
            <NavDropdown title={user && user.lastName} id="navbarScrollingDropdown">
              <LinkContainer to='/profile'>
                <NavDropdown.Item >
                  {user.image["secure_url"] !=="" &&
                  <img className="me-1" style={{width:"30px",borderRadius:"50%"}} src={user.image["secure_url"] } alt="" />}
                  <span >{`${user.firstName} ${user.lastName}`}</span>
                </NavDropdown.Item >
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to='/profile'>
                <NavDropdown.Item >Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item href="#action3">Orders History</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>}
            </> :<>
            {<LinkContainer to='/login'><Nav.Link >Login</Nav.Link></LinkContainer>}
            {<LinkContainer to='/register'><Nav.Link >Signup</Nav.Link></LinkContainer>}
            </>
           }
            
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
