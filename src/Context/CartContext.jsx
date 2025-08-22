import axios from "axios";
import { createContext, useEffect, useState  } from "react";

export let CartContext = createContext()
export default function CartContextProvider (props){
    const [cartNumber, setCartNumber] = useState(0)
    let headers = {
        token : localStorage.getItem("userToken")
    }

    async function addToCart(productId){
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{ productId },{headers})
    }

    async function getProduct(){
    let respons = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{headers})
    setCartNumber(respons.data.numOfCartItems)
    return respons
    
}
    async function updataCountProduct(productId,newCount){
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count :newCount},{headers})
    }


    async function deletProduct(productId){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {headers})
    }
    async function deletAllProduct(){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
    }

useEffect(()=>{
    getProduct()
},[])


    return <CartContext.Provider value={ { addToCart ,getProduct ,updataCountProduct ,deletProduct , deletAllProduct,cartNumber ,setCartNumber } }>
        {props.children}
    </CartContext.Provider>
}

