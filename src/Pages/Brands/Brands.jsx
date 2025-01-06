import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from '../../Components/Loading/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Brands() {

  const {data,isError,isLoading}= useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
    staleTime: 6 * 60 * 60 * 1000
  })

  function getAllBrands(){
    const option={
      method:"GET",
      url:"https://ecommerce.routemisr.com/api/v1/brands"
    }
    return axios.request(option)
  }

  if(isLoading){
    return <div className="flex justify-center items-center py-24   "><Loading /></div>
  }




  return (
    <section className='brands pb-8' id='brands'>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Brands" />
      </Helmet>
      <div className="grid grid-cols-12 gap-4">
        {data.data.data.map((brand) => (
          <div key={brand._id} className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <div className="content group/app transition-all overflow-hidden duration-500 w-full relative p-2 border-4 border-gray-300 rounded-lg  " >
              <img src={brand.image} alt={brand.name} className="w-full h-[100px] object-cover" />
              <div className="layer bg-gray-300 bg-opacity-50 flex justify-center items-center w-full h-full absolute top-0 left-0 translate-y-4   opacity-0 group-hover/app:opacity-100 group-hover/app:translate-y-0 transition-all duration-700">
                <Link to={`/brands/${brand._id}`} className="btn w-fit font-medium text-lg  block mt-5">Show</Link>
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}
