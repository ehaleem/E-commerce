import React from 'react'
import Slider from "react-slick";
import slide1 from "../../assets/images/slider-image-1.jpeg"
import slide2 from "../../assets/images/slider-image-2.jpeg"
import slide3 from "../../assets/images/slider-image-3.jpeg"
import slide4 from "../../assets/images/grocery-banner.png"
import slide5 from "../../assets/images/grocery-banner-2.jpeg"


export default function MainSlider() {

    var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };
  return <>
      
       <div className='flex my-9'>
          <div className="w-3/4">
          <Slider {...settings}>
            <img  className="w-full h-[440px] object-cover " src={slide3} alt="" />
            <img  className="w-full h-[440px] object-cover " src={slide4} alt="" />
            <img  className="w-full h-[440px] object-cover " src={slide5} alt="" />
          </Slider>
            
          </div>
          <div className="w-1/4 ">
            <img className="w-full h-[220px] object-cover"  src={slide1} alt="" />
            <img  className="w-full h-[220px] object-cover " src={slide2} alt="" />
            
          </div>
        </div>

    </>
  
}
