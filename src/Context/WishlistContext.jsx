import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishListConrext = createContext()

export default function WishListContextProvider(props) {
    const [wishlistID, setWishlistID] = useState([])
    const [countWishlist, setCountWishlist] = useState(0)

    axios.interceptors.request.use((config) => {
        const token = localStorage.getItem("userToken")
        if (token) {
            config.headers.token = token
        }
        return config
    })

    async function addWishList(productId) {
        let res = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId }
        );
        await getWishList();
        return res;
    }

    async function getWishList() {
        let res = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist")
        setCountWishlist(res.data.count)
        setWishlistID(res.data.data)
        return res
    }

    function deletfromWishlist(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
    }

    useEffect(() => {
        getWishList()
    }, [])

    return (
        <WishListConrext.Provider value={{ addWishList, getWishList, countWishlist, setWishlistID, wishlistID, setCountWishlist, deletfromWishlist }}>
            {props.children}
        </WishListConrext.Provider>
    )
}
