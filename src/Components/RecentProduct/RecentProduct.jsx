import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { WishListConrext } from '../../Context/WishlistContext'


export default function RecentProduct() {
  let { addWishList, setCountWishlist, countWishlist, setWishlistID, wishlistID, deletfromWishlist } = useContext(WishListConrext)


  async function deletItemFromWishlist(id) {
    let respons = await deletfromWishlist(id)
    setWishlistID(wishlistID.filter((wid) => wid.id !== id))
    setCountWishlist(countWishlist - 1)
    console.log(respons.data.data);
    toast.success(respons.data.message)

  }



  async function addProductToWishlist(productId) {
    let respons = await addWishList(productId)
    console.log(respons.data.message);
    toast.success(respons.data.message)
    countWishlist(countWishlist + 1)
  }
  const [loding, setLoding] = useState(false)
  const [currntID, setCurrntID] = useState(0)
  let { addToCart, cartNumber, setCartNumber } = useContext(CartContext)

  async function addProductCart(id) {
    setCurrntID(id)
    setLoding(true)
    let respons = await addToCart(id)

    if (respons.data.status === 'success') {
      toast.success(respons.data.message)
      setLoding(false)
      setCartNumber(cartNumber + 1)
    }

    else {
      toast.error(respons.data.message)
    }

  }
  const [recentProducts, setRecentProducts] = useState([])
  async function getRecentProducts() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      setRecentProducts(data.data)

    }
    catch (erorr) {
      console.log(erorr);
    }
  }

  useEffect(() => {
    getRecentProducts()
  }, [])





  return <>
    <div className='flex flex-wrap '>

      {
        recentProducts.length ? recentProducts.map((product) =>
          <div className='product md:w-1/3 lg:w-1/5 p-2 rounded mb-[50px] hover:border-2  border-emerald-500' key={product.id}>
            <div onClick={() => addProductToWishlist(product.id)} className='wishlist'>
              <FavoriteIcon sx={{
                fontSize: "40px"
              }} className=' cursor-pointer' />
            </div>

            <Link to={`/productdetails/${product.id}`}>

              <div>

                <div>
                  <img className='w-full' src={product.imageCover} alt="" />
                </div>
                <div className='my-1 py-2'>
                  <p className='text-sm text-emerald-600 text-left'>{product.category.name}</p>
                  <h4 className='font-semibold text-sm md:text-[15px] lg:text-xl text-left my-2'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
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
            <div className='flex items-center justify-evenly my-div'>
              <button onClick={() => { addProductCart(product.id) }} className='flex items-center justify-center btn w-3/4 text-sm md:text-[14px] lg:text-[15px]'>
                {loding && currntID == product.id ? <i className='fas fa-spinner fa-spin'></i> : "+Add To Cart"}
              </button>

              {
                wishlistID.map((wid) => wid.id === product.id ? <div onClick={() => (deletItemFromWishlist(product.id))} > <FavoriteIcon className='text-red-700 cursor-pointer' /></div> : null)
              }
              {/* <FavoriteIcon   className='cursor-pointer'/> */}

            </div>

          </div>) : <span className="looader"></span>}


    </div>

  </>

}
