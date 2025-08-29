import React, { useContext, useEffect } from 'react'
import RecentProduct from './../RecentProduct/RecentProduct';
import CategoriseSlider from '../CategoriseSlider/CategoriseSlider';
import MainSlider from '../MainSlider/MainSlider';
import { WishListConrext } from '../../Context/WishlistContext';

export default function Home() {
    let {getWishList} = useContext(WishListConrext)

    
    // async function getProductToWishlist() {
    //     let respons = await getWishList()
    //     console.log(respons.data.data);
        
    // }
    useEffect(()=>{
getWishList()
    },[])
  return <>
      <MainSlider/>
      < CategoriseSlider/>
      <RecentProduct/>
    </>
  
}
