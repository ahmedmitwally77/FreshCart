import {  useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { Helmet } from "react-helmet";
export default function Products() {
  const [products, setProduct] = useState(null);

let dataQuery=useQuery({queryKey:"products",queryFn:getProducts,staleTime:6 * 60 * 60 * 1000});

   function getProducts() {
    let option = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
     return axios.request(option); // Should return a promise
  }

  let {data,isLoading}=dataQuery;
  


  if(isLoading){
    return <div className="flex justify-center items-center py-24   "><Loading /></div>
  }

  return (
    <>
    <Helmet>
      <title>Products</title>
      <meta name="description" content="Products" />
    </Helmet>
        <div className="recent-products mb-8 lg:mt-8">
          <div className="grid grid-cols-12 gap-8 ">
            {data.data.data.map((product) => (
              <ProductCard key={product.id} productItem={product} />
            ))}
          </div>
        </div>
    </>
  );
}
