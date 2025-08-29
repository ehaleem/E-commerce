import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function Categories() {


  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let query = useQuery({
   queryKey: ['categories'],
  queryFn: getCategories,

  
  })
  console.log(query?.data?.data?.data);
  const categories = query?.data?.data?.data
  return <>

    <div className="flex flex-wrap ">
      {
        categories ?
          categories.map((categoty) =>
            <div className="w-1/4  p-3 my-3">
              <div className='mb-3'>
                <img className='w-full h-[400px]' src={categoty.image} />
              </div>
              <h3 className='text-gray-800 font-semibold' >{categoty.name}</h3>
            </div>)
          : ''}
    </div>

  </>

}
