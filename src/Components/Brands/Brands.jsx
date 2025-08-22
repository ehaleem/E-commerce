import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'



export default function Brands() {

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let query = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })
  console.log(query?.data?.data?.data);
  const categories = query?.data?.data?.data
  return <>

    <div className="flex flex-wrap ">
      {
        categories ?
          categories.map((categoty) =>
            <div className="w-1/4  p-2  my-3   ">
              <div className="border border-gray-900 p-3">
                <div>
                <img className='w-full' src={categoty.image} />
              </div>
              <h3 className='text-gray-800 font-semibold' >{categoty.name}</h3>
              </div>
            </div>)
          : ''}
    </div>

  </>

}
