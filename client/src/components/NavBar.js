import { NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import Cart from "../pages/Cart";
import { clearProdSearch, getProdSearch } from "../redux/slices/productSlice";


export default function NavBar() {
  window.addEventListener("scroll",()=>{
    const headerBottom = document.querySelector('.header-bottom')
    const headerTop = document.querySelector('.header-upper')
    headerBottom.classList.toggle("hide", window.scrollY > 60)
    headerTop.classList.toggle("opacity", window.scrollY > 60)
  })
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // -------------------- redux states
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const shopCart = useSelector((state) => state.shopCart);
  const {wishList} = useSelector((state) => state.wishList);
  const {prodSearch} = useSelector(state=>state.products)

  // -------------------- states
  const [showMenu, setShowMenu] = useState(false);
  const [prodSrch, setProdSearch] = useState("");
  
  // ---------------------------- functions
  const { pathname } = location;
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  
  const searchHandler = (e)=>{
    e.preventDefault()
    dispatch(getProdSearch(prodSrch.trim().split(' ').join('+')))
    if (prodSrch) navigate('/store')
  }

  // -------------------- use effect
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showMenu && ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showMenu]);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);
  // ----------------------------------------- JSX
  return (
    <div className="navbarr">
      {/* ------------------------------------------- Navbar-TOP -------------------------------------------------------------------------- */}
      <header className="header-upper">
        <div className="container-xxl py-3">
          <div className="row align-items-center">
            {/* ---------------------------------------------- LOGO ----------------- */}
            <div className="col-sm-3 col-6 upper-elmnts">
              <h3 className="mb-0">
                <Link className="text-white" to="/">
                  Tek-Shop
                </Link>
              </h3>
            </div>
            {/* ---------------------------------------------- SEARCH ----------------- */}
            <div className="col-sm-4 col-12 upper-elmnts d-flex align-items-center gap-2">
              <div
                id="btn-show-menu"
                className="toggle-menu-btn"
                onClick={() => setShowMenu((prev) => (prev ? false : true))}
              >
                <i className="fa-solid fa-bars text-white fs-1"></i>
              </div>
              <form className="input-group" onSubmit={searchHandler}>
                <input
                  type="text"
                  value={prodSrch}
                  className="form-control p-1"
                  placeholder="Search Product..."
                  aria-label="Search Product..."
                  aria-describedby="basic-addon2"
                  onChange={(e)=>setProdSearch(e.target.value)}
                />
                {!prodSearch ? <span onClick={searchHandler} className="input-group-text search" id="basic-addon2">
                  <BsSearch />
                </span> :
                <span onClick={()=>{
                  dispatch(clearProdSearch())
                  setProdSearch('')}} className="input-group-text search" id="basic-addon2">
                  <i className="fa-solid   fa-xmark" ></i>
                </span>
                }
              </form>
            </div>
            {/* ---------------------------------------------- LINKS ----------------- */}
            <div className="col-sm-5 col-6 upper-elmnts">
              <div className="header-upper-links d-flex align-items-center justify-content-center gap-5">
                {/* ------------------------- whish icon ------ */}
                <div>
                  <Link to="/wish-list">
                    <i className="fa-regular  fa-heart text-white fs-4"></i>
                  </Link>
                  {wishList.length > 0 && (
                      <span
                        className="ms-0"
                        style={{
                          color: "#fff",
                          background: "red",
                          width: "20px",
                          padding: "0px 5px",
                          borderRadius: "50%",
                        }}
                      >
                        {wishList.length}
                      </span>
                    )}
                </div>
                {/* ------------------------- cart icon ------- */}
                <div>
                  <a
                    data-bs-toggle="offcanvas"
                    href="#offcanvasExample8"
                    role="button"
                    aria-controls="offcanvasExample8"
                  >
                    <i className="fa-sharp fa-solid text-white fa-cart-shopping fs-4"></i>
                    {shopCart.cart.length > 0 && (
                      <span
                        className="ms-0"
                        style={{
                          color: "#fff",
                          background: "red",
                          width: "20px",
                          padding: "0px 5px",
                          borderRadius: "50%",
                        }}
                      >
                        {shopCart.cart.length}
                      </span>
                    )}
                  </a>
                  <Cart />
                </div>
                {/* ------------------------- user icon ------- */}
                {!isLoggedIn ? (
                  <div>
                    <Link to="/login">
                      <i className="fa-regular fa-user text-white fs-4"></i>
                    </Link>
                  </div>
                ) : (
                  // ---------- user dropdown ----------
                  <div>
                    <div className="dropdown user-dropdown">
                      <button
                        className="btn p-0  dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          style={{
                            width: "30px",
                            borderRadius: "50%",
                            border: "2px solid #fff",
                          }}
                          src={user?.image["secure_url"]}
                          alt=""
                        />
                      </button>
                      <ul
                        className="dropdown-menu pb-0"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          {
                            <Link className="dropdown-item">{`${user?.firstName} ${user?.lastName}`}</Link>
                          }
                        </li>
                        <li>
                          <Link to="/user/profile" className="dropdown-item">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/user/orders" className="dropdown-item">
                            Orders History
                          </Link>
                        </li>
                        <li onClick={logoutHandler} className="border-top">
                          <Link className="dropdown-item">
                            <i className="fa-solid fa-right-from-bracket"></i>{" "}
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* ------------------------------------------- Navbar BOTTOM ----------------------------------------------------------------------- */}
      {
        <header
          ref={ref}
          className={`header-bottom py-1 ${showMenu ? "show-menu" : ""}`}
        >
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <div className="menu-bottom d-flex align-items-center gap-4">
                  <div>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-list me-2"></i>
                        Shop Categories
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link className="dropdown-item">Action</Link>
                        </li>
                        <li>
                          <Link className="dropdown-item">Another action</Link>
                        </li>
                        <li>
                          <Link className="dropdown-item">
                            Something else here
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {user?.isAdmin && (
                    <div>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-solid fa-lock  me-3"></i>
                          ADMIN
                        </button>
                        <ul
                          className="dropdown-menu admin-dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            <Link
                              to="/admin/dashboard"
                              className="dropdown-item"
                            >
                              <i className="fa-solid fa-chart-line"></i> Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/users" className="dropdown-item">
                              <i className="fa-solid fa-users"></i> Users
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/products"
                              className="dropdown-item"
                            >
                              <i className="fa-solid fa-sitemap"></i> Products
                            </Link>
                          </li>
                          <li>
                            <Link to="/admin/orders" className="dropdown-item">
                              <i className="fa-solid fa-pen"></i> Orders
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {/* --------------- nav bottom menu links ------ */}
                  <div className="menu-links">
                    <div className="d-flex align-items-center gap-2 gap-md-4 ">
                      <Link to="/" className="text-white">
                        HOME
                      </Link>
                      <Link to="/store" className="text-white">
                        OUR STORE
                      </Link>
                      <NavLink to="/admin/dashboard" className="text-white">
                        CONTACT
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      }
    </div>
  );
}
