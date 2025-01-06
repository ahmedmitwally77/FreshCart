import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../Components/Loading/Loading'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { Helmet } from 'react-helmet'

export default function BrandDetails() {
  const [products, setProducts] = useState(null)
  const [title, setTitle] = useState(null)

  let {id}=useParams();
  function getProducts() {
    let option = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
     return axios.request(option); // Should return a promise
  }

  async function getName(){
    let option = {
      url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      method: "GET",
    };
    const res=await  axios.request(option); // Should return a promise
    setTitle(res.data.data.name)
  }



  const {data,isError,isLoading}= useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 6 * 60 * 60 * 1000
  })

  
  function filterData(data) {
    const filteredData = data.data.data.filter((item) => item.brand._id === id);
    setProducts(filteredData);
  }

  useEffect(() => {
    if (data) {
      filterData(data);
    }
    getName()
  }, [id, data]);


  return (
    <section id="category-details md:py-12">  


      {products ? products.length===0 ?<div className="flex justify-center items-center   ">
        <div className="not-found-categories  md:w-1/2 mx-auto bg-gray-200 rounded-lg shadow-md flex justify-center items-center p-8 text-center flex-col ">
        <Helmet>
        <title>{"No Products"}</title>
        <meta name="description" content="Brand Details" />
      </Helmet>
          <p>Oops ! No Products In this Brand Choose Another Brand</p>
          <Link to="/brands" className="btn w-fit font-medium txet-lg mx-auto  block bg-primary-500 hover:bg-primary-600 mt-5"><i className="fa-solid fa-bag-shopping me-2"></i>Back To Brands</Link>
        </div>
      </div> :(<div className="recent-products mb-8 lg:mt-8">
        <Helmet>
        <title>{`${title} Products`}</title>
        <meta name="description" content="Brand Details" />
      </Helmet>

      <h1 className="text-xl mb-8 md:text-2xl font-bold text-center relative after:absolute after:bg-primary-500 after:translate-x-1/2 after:w-1/2 after:h-[3px] after:-bottom-2 after:left-0 w-fit mx-auto text-black">{title} Products </h1>

                <div className="grid grid-cols-12 gap-8 ">
                  {products?.map((product) => (
                    <ProductCard key={product._id} productItem={product} />
                  ))}
                </div>
      </div>):(<div className="flex justify-center items-center py-24   "><Loading /></div>)}
    </section>
  )
}
