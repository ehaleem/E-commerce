import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {


  let { addToCart, cartNumber, setCartNumber } = useContext(CartContext)
  async function addProductCart(id) {

    let respons = await addToCart(id)
    console.log(respons.data.status);

    if (respons.data.status === 'success') {
      toast.success(respons.data.message)
      setCartNumber(cartNumber + 1)
    }
    else {
      toast.error(respons.data.message)
    }

  }
  const [AllCategoryName, setAllCategoryName] = useState([])
  async function getRelatedProducts() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      setAllCategoryName(data.data)
    }
    catch (erorr) {
      console.log(erorr);

    }
  }

  const [product, setProduct] = useState(null)
  let { id } = useParams()


  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };

  async function getSpecificProduct(id) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setProduct(data.data)
    }
    catch (eroor) {
      console.log(eroor);
    }
  }


  // useEffect(() => {
  //   getSpecificProduct(id)
  //   getRelatedProducts()

  // }, [id])
  useEffect(() => {
    async function fetchProductData() {
      await getSpecificProduct(id);
      getRelatedProducts();
    }

    fetchProductData();
  }, [id]);

  return <>
    <div className='flex flex-wrap p-2 items-center'>
      <div className='w-full md:w-1/5 mb-6 md:mb-0'>
        <Slider {...settings}>
          {product?.images.map((src) => <img src={src} />)}
        </Slider>

      </div>
      <div className="w-full md:w-3/4 px-8">
        <p className='text-left font-semibold text-2xl'>{product?.title}</p>
        <p className='text-left my-4 text-gray-600'>{product?.description}</p>
        <p className='text-left my-4 text-gray-900'>{product?.category.name}</p>
        <div className='flex justify-between items-center'>
          <p className='text-left my-4 text-gray-900'>{product?.price} EGP</p>
          <span className='text-left my-4 text-gray-600'>{product?.ratingsAverage} <i className='fas fa-star text-orange-600'></i></span>
        </div>
        <button onClick={() => { addProductCart(id) }} className='btn w-full'> Add To Cart</button>
      </div>
    </div>

    <div className='flex flex-wrap'>
      {
        AllCategoryName
          .filter(reproduct => reproduct.category.name === product?.category.name)
          .map(reproduct => (
            <div
              className='product md:w-1/4 lg:w-1/5 p-5 rounded mb-[50px] hover:border-2 border-emerald-500'
              key={reproduct.id}
            >
              <Link to={`/productdetails/${reproduct.id}`}>
                <img className='w-full' src={reproduct.imageCover} alt="" />
                <div className='my-1 py-2'>
                  <p className='text-sm text-emerald-600 text-left'>
                    {reproduct.category.name}
                  </p>
                  <h4 className='font-semibold text-xl text-left my-2'>
                    {reproduct.title.split(" ").slice(0, 2).join(" ")}
                  </h4>
                  <div className='flex justify-between items-center'>
                    <span>{reproduct.price} EGP</span>
                    <div className='flex gap-1 items-center'>
                      <span>{reproduct.ratingsAverage}</span>
                      <i className='text-orange-500 fas fa-star'></i>
                    </div>
                  </div>
                </div>
              </Link>
              <button onClick={() => { addProductCart(id) }} className='btn mt-2 w-full'>Add To Cart</button>
            </div>
          ))
      }
    </div>







    {/* <div className='flex flex-wrap'>
      {
        AllCategoryName.map((product) =>
        <div className='product md:w-1/4 lg:w-1/5 p-5 rounded mb-[50px] hover:border-2  border-emerald-500' key={product.id}>
          <Link to={`/productdetails/${product.id}`}>
            <div>
              <div>
                <img className='w-full' src={product.imageCover} alt="" />
              </div>
              <div className='my-5 py-3'>
                <p className='text-sm text-emerald-600 text-left'>{product.category.name}</p>
                <h4  className=' font-semibold text-xl text-left my-2'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                <div className='flex justify-between items-center'>
                  <span>{product.price} EGP</span>
                  <div className='flex gap-1 items-center'>
                    <span>{product.ratingsAverage}</span>
                    <i className='text-orange-500 fas fa-star'></i>
                  </div>
                </div>
              </div>
          </div>
          </Link>

          <button className='btn'>Add To Cart </button>
        </div>):<span className="looader"></span>}
    </div> */}

  </>

}
