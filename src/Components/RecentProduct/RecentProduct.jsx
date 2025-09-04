import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { WishListConrext } from '../../Context/WishlistContext'


export default function RecentProduct() {
  let { addWishList, setCountWishlist, countWishlist, setWishlistID, wishlistID, deletfromWishlist } = useContext(WishListConrext)
  const [recentProducts, setRecentProducts] = useState([])
  let [currentPage, setCurrentPage] = useState(1)
  let itemsPrePage = 10


  let indexOfLastItems = currentPage * itemsPrePage
  let indexOfFirstItems = indexOfLastItems - itemsPrePage
  let currentItems = recentProducts.slice(indexOfFirstItems, indexOfLastItems)
  const totalPages = Math.ceil(recentProducts.length / itemsPrePage)

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

  async function getRecentProducts() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      setRecentProducts(data.data)

    }
    catch (erorr) {
      console.log(erorr);
    }
    console.log(totalPages);
    
  }

  useEffect(() => {
    getRecentProducts()
  }, [])


  function goTo(){
    setCurrentPage(currentPage +1)
    console.log(currentPage);
    
  }


  return <>
    <div className='flex flex-wrap justify-center'>

      {
        currentItems.length ? currentItems.map((product) =>
          <div key={product.id} className='product md:w-1/3 lg:w-1/5 p-2 rounded mb-[50px] hover:border-2  border-emerald-500' key={product.id}>
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


      <nav aria-label="Page navigation example">
        <ul className=" flex -space-x-px text-base h-10 border-collapse">
          <li onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border  border-emerald-600 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ">Previous</a>
          </li>
          <li onClick={()=>goTo()}>
            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white  border-y border-r  border border-emerald-600 hover:bg-gray-100 hover:text-gray-700 ">1</a>
          </li>
          <li onClick={()=>goTo()}> 
            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white  border-y border-r  border border-emerald-600 hover:bg-gray-100 hover:text-gray-700 ">2</a>
          </li>
          <li onClick={()=>goTo()}>
            <a href="#" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600  border-y border-r   border border-emerald-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">3</a>
          </li>

          <li onClick={()=>goTo()}>
            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500  border-y border-r bg-white  border border-emerald-600 hover:bg-gray-100 hover:text-gray-700 ">4</a>
          </li>
          
          <li  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}  disabled={currentPage === totalPages} >
            <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-emerald-600 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50">Next</a>
          </li>
        </ul>
      </nav>

    </div>

  </>

}
