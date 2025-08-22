import React, { useContext, useState } from 'react'
import logo from "../../assets/images/logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../../Context/CartContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { WishListConrext } from '../../Context/WishlistContext';


export default function Navbar() {
  let {countWishlist ,setCountWishlist ,getWishList} =useContext(WishListConrext)
  let { cartNumber , setCartNumber } = useContext(CartContext)

  let navegat = useNavigate()
  function sginOut() {
    setUserLogin(null)
    setCountWishlist(0)
    setCartNumber(0)
    localStorage.removeItem("userToken")
    navegat("login")
  }
  let { userLogin, setUserLogin } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const CartBadge = styled(Badge)(() => ({
    [`& .${badgeClasses.badge}`]: {
      top: -5,
      right: -5,
    },
  }));


  return <>

    <nav className="bg-gray-200 px-5  border-gray-200 fixed top-0 left-0 right-0 z-40">

      <div className={`max-w-screen-xl   p-3 md:p-0 flex flex-wrap items-center justify-around md:justify-between mx-auto ${userLogin === null ? `h-[55px]` : null}`}>

        <a href="" className="flex items-center space-x-3  rtl:space-x-reverse">
          <img src={logo} className="md:h-8 w-[120px]" alt="Flowbite Logo" />
        </a>


        <div className=" items-center gap-4 flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <ul className='flex  gap-4 order-1'>
            {userLogin ? null : <li><Link to="login">Login</Link></li>}
            {userLogin ? null : <li><Link to="register">Register</Link></li>}
            {userLogin ? <li className='cursor-pointer' onClick={() => { sginOut() }}><span>SginOut</span></li> : null}
            <li onClick={toggleMenu} className='md:hidden cursor-pointer' ><i className="text-emerald-600 text-xl fa-solid fa-bars"></i></li>


          </ul>
          <Link to="cart">
            <IconButton >
              <CartBadge badgeContent={cartNumber} color="success" overlap="circular">
                <ShoppingCartIcon fontSize="small " sx={{
                  color: "black"
                }} />
              </CartBadge>
            </IconButton>
          </Link>
          <Link to="wishlist">
            <CartBadge badgeContent={countWishlist} color='success' overlap="circular">
              <FavoriteIcon sx={{
                Color: "black"
              }} />
            </CartBadge>
          </Link>
        </div>


        <div className={`${isMenuOpen ? 'block' : 'hidden'} items-center overflow-hidden justify-between w-full md:flex md:w-[500px] md:order-1`} id="navbar-cta">

          {userLogin ? <ul className=" flex flex-col font-medium p-4 md:p-0 mt-4 md:w-full  md:flex-row md:mt-0 md:border-0 ">
            <Link to="" onClick={() => setIsMenuOpen(false)} className='links group hover:bg-emerald-700  hover:scale-105 transition: duration-300 p-[20px]'>
              <span className=" py-2 px-3  md:p-0 text-gray-700 group-hover:text-white " aria-current="page">Home</span>
            </Link>
            <Link to="cart" onClick={() => setIsMenuOpen(false)} className='links group hover:bg-emerald-700  hover:scale-105 transition duration-300 p-[20px]'>
              <span className=" py-2 px-3 md:p-0 text-gray-700 group-hover:text-white">Cart</span>
            </Link>
            <Link to="products" onClick={() => setIsMenuOpen(false)} className='links group hover:bg-emerald-700  hover:scale-105 transition duration-300 p-[20px]'>
              <span className=" py-2 px-3 md:p-0 text-gray-700 group-hover:text-white">Products</span>
            </Link>
            <Link to="categories" onClick={() => setIsMenuOpen(false)} className='links group hover:bg-emerald-700  hover:scale-105 transition duration-300 p-[20px]'>
              <span className=" py-2 px-3 md:p-0 text-gray-700 group-hover:text-white">Categories</span>
            </Link>
            <Link to="brands" onClick={() => setIsMenuOpen(false)} className='links group hover:bg-emerald-700  hover:scale-105 transition duration-300 p-[20px]'>
              <span className=" py-2 px-3 md:p-0 text-gray-700 group-hover:text-white">Brands</span>
            </Link>
          </ul> : null}

        </div>

      </div>

    </nav>

  </>

}
