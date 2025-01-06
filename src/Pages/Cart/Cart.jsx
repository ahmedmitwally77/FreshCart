import { useContext, useEffect } from "react";
import CartItem from "../../Components/CarItem/CartItem";
import { cartContext } from "../../Components/Context/CartContext/Cart.Context";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import AnimatedSVG from "../../Components/svgComp/AnimatedSVG";
import animationData from '../../assets/images/Zero Purchase.json';
export default function Cart() {
  let { getCartDetails, cartData , clearCart } = useContext(cartContext);

  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <>
    <Helmet>
      <title>Cart</title>
      <meta name="description" content="Cart" />
    </Helmet>
      {cartData === null ? (
        <div className="flex justify-center items-center py-8 ">
          <Loading />
        </div>
      ) : cartData.numOfCartItems === 0 ? (
        <div className="flex w-3/4 mx-auto items-center justify-start flex-col md:flex-row">

<div className="w-full md:w-1/2 rounded-lg flex justify-center mx-auto items-center p-8 text-center flex-col ">
          <h1 className="text-xl font-bold text-gray-600">
            Oops! Your Cart Is Empty, Start Shopping Now by Clicking the button
            below and find something you love! ❤
          </h1>
          <Link
            to="/"
            className="btn w-fit font-medium txet-lg  block bg-primary-500 hover:bg-primary-600 mt-5"
          >
            <i className="fa-solid fa-bag-shopping me-2"></i>Start Shopping
          </Link>
        </div>

        <div className="image w-full md:w-1/2">
          <AnimatedSVG animationData={animationData} />
        </div>


        


        </div>
      ) : (
        <div className="cart bg-gray-300 p-5 pt-6 mb-8 rounded-md">
          <h1 className="md:text-2xl text-xl font-bold ">
            <i className="fa-brands fa-opencart fa-fade text-4xl me-1 text-primary-500">
            </i>
            Shop Cart
          </h1>

          <div className="border sm:sticky  top-20 bg-white shadow-md shadow-primary-500  border-primary-400 mt-5 rounded-full md:w-1/2 w-full mx-auto p-2">
            <h3 className="text-lg mt-2 font-semibold  text-center">
              <i className="fa-solid fa-sack-dollar me-2 text-primary-500"></i>
              Total Cart Price:{" "}
              <span className="text-primary-500">
                {cartData.data.totalCartPrice} EGP
              </span>
            </h3>
            <h4 className="text-lg mt-2 font-semibold text-gray-600 text-center">
              Total Cart Items: {cartData.numOfCartItems}
            </h4>
          </div>

          <div className="cart-items mt-5 space-y-5">
            {cartData.data.products.map((product) => (
              <CartItem key={product._id} productInfo={product} />
            ))}
          </div>
          
          <button
            type="button"
            onClick={() => clearCart()}
            className="btn w-fit font-medium txet-lg ml-auto block bg-red-700 hover:bg-red-600 mt-5"
          >
            <i className="fa-solid fa-trash me-2"></i>Clear Cart
          </button>
          <Link to={"/checkout"}>
            <button type="button" className="btn font-semibold txet-lg  bg-blue-700 hover:bg-blue-600 mt-5">Next Step (Payment)</button>
          </Link>
        </div>
      )}
    </>
  );
}
