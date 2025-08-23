
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import shopping from '../../assets/images/shopping.png'
import { Link } from 'react-router-dom';

export default function Cart() {

    const [product, setProduct] = useState([])
    let { getProduct, updataCountProduct, deletProduct, deletAllProduct, cartNumber, setCartNumber } = useContext(CartContext)
    async function getCartProduct() {
        let respons = await getProduct()
        setProduct(respons.data.data.products)
    }

    async function updata(productID, newCount) {
        let res = await updataCountProduct(productID, newCount)

        if (res.data.status === "success") {
            setProduct(res.data.data.products)
            toast.success("updataproduct successfully")
        }
        else {
            toast.error("don`t updataproduct ")
        }
    }

    async function deletCartProduct(productID) {
        let res = await deletProduct(productID)
        setProduct(res.data.data.products)
        setCartNumber(cartNumber - 1)
        toast.success("deleted product")
    }
    async function deletAll() {
        let respons = await deletAllProduct()
        console.log(respons);

        setProduct(respons.data)
        toast.success("deleted all product")
    }
    useEffect(() => {
        getCartProduct()
    }, [])

    return <>
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>

        {product.length === 0 ? <div className=' flex items-center justify-center'><img className='w-[350px]' src={shopping} alt="" /></div> :
            product.length > 0 ? <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {product.map((product) => (
                            <tr key={product.product.id} className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
                                <td className="p-4">
                                    <img className='w-[200px]' src={product.product.imageCover} />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {product.product.title}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <button onClick={() => { updata(product.product.id, product.count - 1) }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  " type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <span className='font-bold'>{product.count}</span>
                                        <button onClick={() => { updata(product.product.id, product.count + 1) }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {product.price * product.count}
                                </td>
                                <td className="px-6 py-4 ">
                                    <Button onClick={() => { deletCartProduct(product.product.id) }}
                                        sx={{
                                            color: "#059669",
                                            '&:hover': {
                                                backgroundColor: "#059669",
                                                color: 'white',
                                                transition: '1s all'
                                            }
                                        }} size="medium" variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot >
                        <tr >
                            <td className='px-3' colSpan={5}>
                                <Button onClick={() => { deletAll() }}
                                    sx={{
                                        color: "#059669",
                                        width: "100%",
                                        marginBlock: "2%",
                                        fontSize: "17px",
                                        '&:hover': {
                                            backgroundColor: "#059669",
                                            color: 'white',
                                            transition: '1s all'
                                        }
                                    }} variant="outlined" startIcon={<DeleteIcon />}>Delete All Product</Button>
                            </td>
                        </tr>
                        <tr >
                           
                            <td className='px-3' colSpan={5}>
                                 <Link to ="/checkout">
                                <Button 
                                    sx={{
                                        color: "#059669",
                                        width: "100%",
                                        marginBottom:"2%",
                                        fontSize: "17px",
                                        '&:hover': {
                                            backgroundColor: "#059669",
                                            color: 'white',
                                            transition: '1s all'
                                        }
                                    }} variant="outlined">Checkout</Button></Link>
                            </td>
                            
                            
                        </tr>
                    </tfoot>
                </table>
            </div> : <div className='flex items-center justify-center'> <span className="looadercart"></span> </div>
        }
    </>

}