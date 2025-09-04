import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { WishListConrext } from '../../Context/WishlistContext'
import FavoriteIcon from '@mui/icons-material/Favorite';



export default function Products() {
  

  let { addWishList, setCountWishlist, countWishlist, setWishlistID, wishlistID, deletfromWishlist } = useContext(WishListConrext)

  async function addProductToWishlist(productId) {
    let respons = await addWishList(productId)
    console.log(respons.data.message);
    toast.success(respons.data.message)
    countWishlist(countWishlist + 1)
  }

  async function deletItemFromWishlist(id) {
    let respons = await deletfromWishlist(id)
    setWishlistID(wishlistID.filter((wid) => wid.id !== id))
    setCountWishlist(countWishlist - 1)
    console.log(respons.data.data);
    toast.success(respons.data.message)

  }

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
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  let query = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts
  });
  const products = query?.data?.data?.data
  console.log(query?.data?.data?.data);

  return <>

    <div className='flex flex-wrap'>

      {
        products?.length > 0 ? products.map((product) =>
          <div className='product md:w-1/4 lg:w-1/5 p-2 rounded mb-[50px] hover:border-2  border-emerald-500' key={product.id}>
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
                  <h4 className=' font-semibold text-xl text-left my-2'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
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
              <button onClick={() => { addProductCart(product.id) }} className='flex items-center justify-center btn w-3/4 text-sm md:text-[14px] lg:text-[15px]'>Add To Cart </button>
              
                {
                  wishlistID.map((wid) => wid.id === product.id ? <div onClick={() => (deletItemFromWishlist(product.id))} > <FavoriteIcon className='text-red-700 cursor-pointer' /></div> : null)
                }
              
            </div>

          </div>) : <span className="looader"></span>}


    </div>
  </>

}
