import React, { useContext, useEffect, useState } from 'react'
import { WishListConrext } from '../../Context/WishlistContext'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

export default function WishList() {
  const [wishlistProducts, setWishlistProducts] = useState([])
  let { getWishList , deletfromWishlist} = useContext(WishListConrext)

  async  function getProductToWishlist(){
    let respons = await getWishList()
    console.log(respons.data.data);
    setWishlistProducts(respons.data.data)
  }
  async function deletProduct(id){
    let respons = await deletfromWishlist (id)
console.log(respons.data.message);
toast.success(respons.data.message)
getProductToWishlist()

  }

 useEffect(()=>{getProductToWishlist()},[])

  return <>
      <h1>WishList</h1>
       {
        wishlistProducts.length > 0?  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                      Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Action
                  </th>
              </tr>
            </thead>
            <tbody >
                {wishlistProducts.map((product)=>(
                <tr  key={product.id} className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
                    <td className="p-4">
                        <img  className='w-[200px]' src={product.imageCover}/>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {product.title}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {product.price}
                    </td>
                    <td className="px-6 py-4 ">
                        <Button onClick={()=>deletProduct(product.id)}
                        sx={{
                            color : "#059669",
                            '&:hover': {
                            backgroundColor:"#059669",
                            color : 'white',
                            transition : '1s all'}
                            }}  size="medium" variant="outlined"  startIcon={<DeleteIcon/>}>Delete</Button>
                    </td>
                </tr>
                ))} 
            </tbody>
            <tfoot >
                <tr >
                    <td className='px-3' colSpan={5}>
                        <Button  
                        sx={{
                            color : "#059669",
                            width : "100%",
                            marginBlock : "2%",
                            fontSize:"17px",
                            '&:hover': {
                            backgroundColor:"#059669",
                            color : 'white',
                            transition : '1s all'}}}   variant="outlined"  startIcon={<DeleteIcon/>}>Delete All Product</Button>
                    </td>
              
                </tr>
                
            </tfoot>
        </table>
    </div> : <h1 className='text-4xl capitalize font-bold my-9 text-red-600' >there is not item to show</h1>
    }
    </>
  
}
