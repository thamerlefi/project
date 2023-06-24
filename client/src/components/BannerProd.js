import React, { useEffect } from "react";
import "../css/bannerProd.css";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function BannerProd() {
  const { products } = useSelector((state) => state.products);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
  };

  return (
    <div className="banner-prod row py-2">
      <div className="part mb-4 mb-md-0  col-11 ">
        <Slider {...settings}>
          {products.list.map(
            (prod, i) =>
              i < 7 &&
              i > 3 && (
                <div
                  className={`d-flex justify-content-between align-items-center `}
                  key={prod._id}
                >
                  <div className="p-5 ">
                    <h1 className="">50% Off your first Shoppping</h1>
                    <h3 className="my-4">{prod.name}</h3>
                    <button className="button" style={{ background: "tomato" }}>
                      Buy Now
                    </button>
                  </div>
                  <div style={{ width: "35%" }}>
                    <img
                      src={prod.image.secure_url}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              )
          )}
          {/* <div>
            <img src="img/lapcat.jpg" alt="" style={{width:"100%"}}/>
          </div> */}
        </Slider>
      </div>
      {/* <div className="part  col-12 col-md-6 d-flex flex-column justify-content-between gap-4 gap-md-0">
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
      </div> */}
    </div>
  );
}
