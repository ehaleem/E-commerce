import axios from "axios";
import { createContext, useEffect, useState } from "react";
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
        config.headers.token = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export let CartContext = createContext()
export default function CartContextProvider(props) {
    const [cartNumber, setCartNumber] = useState(0)





    async function addToCart(productId) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId })
    }

    async function getProduct() {
        let respons = await axios.get("https://ecommerce.routemisr.com/api/v1/cart")
        setCartNumber(respons.data.numOfCartItems)
        return respons

    }
    async function updataCountProduct(productId, newCount) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: newCount })
    }


    async function deletProduct(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`)
    }
    async function deletAllProduct() {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
    }

    useEffect(() => {
        getProduct()
    }, [])


    return <CartContext.Provider value={{ addToCart, getProduct, updataCountProduct, deletProduct, deletAllProduct, cartNumber, setCartNumber }}>
        {props.children}
    </CartContext.Provider>
}

