import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";



export default function CategoriseSlider() {
  const [categorise, setCategorise] = useState([])

  var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000
  };



  async function getCategoriseSlider() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      setCategorise(data.data)
    }
    catch (eroor) {
      console.log(eroor)

    }
  }

  useEffect(() => {
    getCategoriseSlider()
  },[])


  return <>
  <div className=' hidden md:block'>
    <h3 className='my-3 text-left text-2xl capitalize sm:hidden' >shop popular categoris</h3>
    <Slider {...settings}>

      {categorise.map((category) => <div >
        <img className='w-full object-cover h-[250px]' src={category.image} alt="" />
        <h5>{category.name}</h5>
      </div>)}
    </Slider>

  </div>
  </>

}
