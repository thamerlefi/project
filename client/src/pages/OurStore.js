import React, { useEffect } from "react";
import "../css/ourStore.css";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/slices/productSlice";
import Product from "../components/Product";
import { Link } from "react-router-dom";

export default function OurStore() {
  const dispatch = useDispatch();
  useEffect(() => {
    const limit = 10,
      page = 1;
    dispatch(getAllProducts({ limit, page }));
  }, []);
  const { products } = useSelector((state) => state.products);
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div className="mt-4">
      <div className="row">
        {/* -------------------------------------------------- filter side */}
        <div className="col-12 col-md-3 d-md-block d-flex  flex-column flex-sm-row  justify-content-between mb-2 mb-md-0">
          {/* ---------------------------- categories */}
          <div className="filter-prod">
            <h3>Shop By Categories</h3>
            <ul>
              <li>Laptop</li>
              <li>Phone</li>
              <li>Camera</li>
              <li>Accessories</li>
            </ul>
          </div>
          {/* ----------------------------- filter by */}
          <div className="filter-prod mt-2 mt-sm-0 mt-md-2">
            <h3>Filter By</h3>
            <div className="">
              <h4 className="sub-title mt-3">Price ($)</h4>
              <div className="d-flex align-items-center gap-1 row ">
                <div className="form-floating mb-3 col-4 col-md-5">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">From</label>
                </div>
                <div className="form-floating mb-3 col-4 col-md-5">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">To</label>
                </div>
              </div>
            </div>
            <div className=" align-items-center">
            <h4 className="sub-title mt-2">Rating</h4>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={28}
              isHalf={true}
              activeColor="#ffd700"
            />
            </div>
          </div>
          {/* ----------------------------- random product */}
          <div className="random-products filter-prod mt-2 d-none d-md-block">
            <h3>Random Products</h3>
            {products.list.map((product, i) => (
              <>
                {i < 3 && (
                  <div className="d-flex pt-1 border-bottom " key={product._id}>
                    <div className="w-25">
                      <img
                        src={product.image.secure_url}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="w-75 ms-2">
                      <h5 style={{ fontSize: 14 }}>{product.name}</h5>
                      <ReactStars
                        count={5}
                        size={18}
                        value={4.5}
                        edit={false}
                        isHalf={true}
                        activeColor="#ffd700"
                      />
                      <p>${product.price}</p>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        {/* -------------------------------------------------- product list side */}
        <div className="col-12 col-md-9">
          {/* ------------ sort  */}
          <div className="filter-sort-grid ">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <p>SortBy:</p>
                <select
                  className="form-control form-select"
                  style={{ width: "auto" }}
                >
                  <option value="createdAt">Date</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="category">Category</option>
                  <option value="stock">Count in Stock</option>
                </select>
              </div>
              <div className="d-flex align-items-center gap-2">
                {/* <p className="total-products">6 products</p> */}
                {/* <div className="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-grid"></i>
                        <i class="fa-solid fa-pause"></i>
                        <i class="fa-solid fa-bars"></i>
                    </div> */}
              </div>
            </div>
          </div>
          {/* ------------ prod list */}
          <div
            className="products-list row mt-2 gap-2"
            style={{ width: "100%" }}
          >
            {products.list.map((prod) => (
              <Product col="custom-col " product={prod} key={prod._id} />
            ))}
          </div>
          <div className="filter-sort-grid mt-2 d-flex align-items-center justify-content-center justify-content-sm-between ">
            <p className="d-none d-sm-block p-opacity">Showing 8 of 19</p>
            <div className="pages">
              <Link className="me-2 ">{"<"}</Link>
              <Link className="me-2 ">1</Link>
              <Link className="me-1 active">2</Link>
              <Link className="me-1">3</Link>
              <Link className="me-1">{">"}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
