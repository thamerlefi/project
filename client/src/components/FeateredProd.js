import React from 'react'
import { useSelector } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Product from './Product';

export default function FeateredProd() {
    const { products } = useSelector((state) => state.products);
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      }
  return (
    <div className='section-prod mt-5'>
      <div>
        <div className='line'></div>
        <h4 className='text-center'> Featered Products</h4>
      </div>
      <div className='list m-auto  container row mt-5'>
        <Slider {...settings} >
        {
            products.list.map(prod =>(
               <div className='px-2'>
                   <Product col={"aa"} product={prod}/>
               </div>
                
            ))
        }
        </Slider>
        
      </div>
    </div>
  )
}
