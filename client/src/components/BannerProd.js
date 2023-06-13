import React from "react";
import "../css/bannerProd.css";
export default function BannerProd() {
  return (
    <div className="banner-prod row py-2">
      <div className="part mb-4 mb-md-0  col-12 col-md-6">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="img-fluid rounded-3 d-block w-100" src={require('../img/main-banner.jpg')}  alt="..." />
            </div>
            <div className="carousel-item">
              <img className="img-fluid rounded-3 d-block w-100" src={require('../img/main-banner-1.jpg')}  alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="part  col-12 col-md-6 d-flex flex-column justify-content-between gap-4 gap-md-0">
        <div className="row ">
            <div className="col-6">
                <img className="img-fluid rounded-3" src={require('../img/catbanner-01.jpg')} style={{width:"100%"}} alt="" />
            </div>
            <div className="col-6">
            <img className="img-fluid rounded-3" src={require('../img/catbanner-02.jpg')} style={{width:"100%"}} alt="" />
            </div>
        </div>
        <div className="row ">
        <div className="col-6">
                <img className="img-fluid rounded-3" src={require('../img/catbanner-03.jpg')} style={{width:"100%"}} alt="" />
            </div>
            <div className="col-6">
            <img className="img-fluid rounded-3"  src={require('../img/catbanner-04.jpg')} style={{width:"100%"}} alt="" />
            </div>
        </div>
      </div>
    </div>
  );
}
