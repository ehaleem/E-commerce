import axios from "axios";
import { createContext, useEffect, useState } from "react";




export let  WishListConrext = createContext()

export default function WishListContextProvider(props){
    const [wishlistID, setWishlistID] = useState([])
    const [countWishlist, setCountWishlist] = useState(0)
    let headers = {
        token: localStorage.getItem("userToken")
    }
async function addWishList(productId){
    let res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
    );
    await getWishList(); 
    return res;
}
    async function getWishList(){
        let res = await  axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{headers})
        setCountWishlist(res.data.count)
        console.log(res.data.data);
        setWishlistID(res.data.data)
        
        return res
    }
    function deletfromWishlist(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
    }
useEffect(()=>{
    getWishList()
},[])
    return <>
        <WishListConrext.Provider value={{ addWishList , getWishList , countWishlist,setWishlistID ,wishlistID, setCountWishlist,deletfromWishlist}}>
           {props.children}
        </WishListConrext.Provider>
    </>

}