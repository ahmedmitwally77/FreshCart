import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import Order from "../../Components/Order/Order";
import { tokenContext } from "../../Components/Context/TokenContext/Token.Context";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const { token } = useContext(tokenContext);
  const { id } = jwtDecode(token);


  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    staleTime: 6 * 60 * 60 * 1000,
  });

async  function getOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    return axios.request(options)
  }
    

  if(isLoading){
    return <div className="flex justify-center items-center py-24   "><Loading /></div>
  }

  return (
    <div className="ALL-orders space-y-4 pb-10">
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Orders" />
      </Helmet>
      {data.data.length > 0 ? (
        data.data.map((ordery) => <Order key={ordery._id} myorder={ordery} />)
      ) : (
        <div className="flex justify-center items-center py-8   ">
        <div className="not-found-categories w-1/2 mx-auto bg-gray-200 rounded-lg shadow-md flex justify-center items-center p-8 text-center flex-col ">
          <p>Oops ! No Orders Yet Go And Shopping</p>
          <Link to="/" className="btn w-fit font-medium txet-lg mx-auto  block bg-primary-500 hover:bg-primary-600 mt-5"><i className="fa-solid fa-bag-shopping me-2"></i>Back To Home</Link>
        </div>
        </div>
      )}
    </div>
  );
}
