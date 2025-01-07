import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Categories() {

 const {data,isError,isLoading}= useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 6 * 60 * 60 * 1000
  })

  async function getAllCategories() {
    const option={
      method:"GET",
      url:"https://ecommerce.routemisr.com/api/v1/categories"
    }
    return axios.request(option)
  }


    if(isLoading){
      return <div className="flex justify-center items-center py-24   "><Loading /></div>
    }


  return (
    <>
    <Helmet>
        <title>Categories</title>
        <meta name="description" content="Categories" />
    </Helmet>
      <section id="categories">
        <div className="flex justify- items-center flex-wrap  pb-6">
        {data.data.data.map((category) => (
          <div key={category._id} className="md:w-1/4 w-1/2 lg:w-1/5 xl:w-1/6 p-3">
            <div className="content group/app transition-all duration-500 w-full relative p-2 border-4 border-gray-300 rounded-lg  ">
              <img src={category.image} loading="lazy" alt={category.name} className="w-full h-[250px] object-cover" />
              <h3 className="text-lg font-semibold text-gray-800 mt-2">{category.name}</h3>
              <div className="layer  transition-all opacity-0 duration-500 group-hover/app:opacity-100 group-hover/app:translate-y-0 flex  justify-center items-center w-full h-full absolute left-0 bottom-0 bg-gray-300 bg-opacity-50">
                <Link to={`/categories/${category._id}`} className="btn bg-primary-400 rounded-md w-fit duration-300 transition-colors  hover:bg-primary-500">
                  <i className="fa-solid me-1 fa-eye"></i> Show
                </Link >
              </div>
            </div>
          </div>
        ))}
        </div>
      </section>
    </>
  );
}
