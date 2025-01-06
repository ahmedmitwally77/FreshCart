import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../Components/Loading/Loading'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { Helmet } from 'react-helmet'

export default function CategoryDetails() {
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
      url: `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      method: "GET",
    };
    const res=await  axios.request(option); // Should return a promise
    setTitle(res.data.data.name)
  }


  let {data,isError,isLoading}=useQuery({queryKey:"products",queryFn:getProducts,staleTime:6 * 60 * 60 * 1000});


  function filterData(data) {
    const filteredData = data.data.data.filter((item) => item.category._id === id);
    setProducts(filteredData);
  }

  useEffect(() => {
    if (data) {
      filterData(data);
    }
    getName()
  }, [id, data]);


  return (
    <section id="category-details py-12">
      <Helmet>
        <title>{products?.length===0 ? "No Products" : `${title} Products`}</title>
      </Helmet>
      {products ? products.length===0 ?<div className="flex justify-center items-center py-24   ">
        <div className="not-found-categories md:w-1/2 w-full mx-auto bg-gray-200 rounded-lg shadow-md flex justify-center items-center p-8 text-center flex-col ">
          <p>Oops ! No Products In this Category Choose Another Category</p>
          <Link to="/categories" className="btn w-fit font-medium txet-lg mx-auto  block bg-primary-500 hover:bg-primary-600 mt-5"><i className="fa-solid fa-bag-shopping me-2"></i>Back To Categories</Link>
        </div>
      </div> :(<div className="recent-products mb-8 lg:mt-8">
      <h1 className="text-xl mb-8 md:text-2xl font-bold text-center relative after:absolute after:bg-primary-500 after:translate-x-1/2 after:w-1/2 after:h-[3px] after:-bottom-2 after:left-0 w-fit mx-auto text-black">{title} Products </h1>

                <div className="grid grid-cols-12 gap-8 ">
                  {products?.map((product) => (
                    <ProductCard key={product.id} productItem={product} />
                  ))}
                </div>
      </div>):(<div className="flex justify-center items-center py-24   "><Loading /></div>)}
    </section>
  )
}
