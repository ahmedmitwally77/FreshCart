import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function RecentProducts() {

let dataQuery=useQuery({queryKey:["products"],queryFn:getProducts,staleTime:6 * 60 * 60 * 1000});

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
      <h1 className="text-xl  font-bold text-primary-500 px-1 -mb-2">Shop Recent Products</h1>
        <div className="recent-products mb-8 lg:mt-8 mt-6 px-2">
          <div className="grid grid-cols-12 gap-8 ">
            {data.data.data.map((product) => (
              <ProductCard key={product.id} productItem={product} />
            ))}
          </div>
        </div>
    </>
  );
}
