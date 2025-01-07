import { useContext } from "react";
import { cartContext } from "../Context/CartContext/Cart.Context";
import { Link } from "react-router-dom";

export default function CartItem({productInfo}) {
  let { removeProduct, updateQuantity } = useContext(cartContext);
  const {count, product, price} = productInfo
  const {title, imageCover,category,id} = product
  return (
    <div className="cart-item sm:flex sm:justify-between items-center gap-3">
      <div className="content flex gap-6 items-center justify-center sm:justify-start grow">
        <Link to={`/product/${id}`}><img
          src={imageCover}
          loading="lazy"
          alt=""
          className="sm:w-36 sm:h-36 w-24 h-24 object-cover  rounded-lg"
        /></Link>
      
        <div className="text space-y-2 ">
          <Link to={`/product/${id}`}><h3 className="text-lg font-medium text-gray-800">{title?.split(" ").slice(0, 2).join(" ")}</h3></Link>
          <h4 className="text-md ">Price: <span className="text-primary-500">{price} EGP</span></h4>
          <button
            onClick={() => removeProduct({productId:id})}
            type="button"
            className="btn  bg-red-700 rounded-md w-fit duration-300 delay-0 transition-colors  hover:bg-red-600"
          >
            <i className="fa-solid fa-trash me-1"></i> Remove
          </button>
        </div>
      </div>
      <div className="count my-2 space-x-5 flex items-center justify-center sm:justify-end ">
    <i onClick={() => updateQuantity({productId:id,count:+count-1})} className="fa-solid cursor-pointer fa-minus rounded-full text-primary-500 sm:py-8 sm:px-2 px-8 py-2 border border-primary-300 hover:bg-primary-500 hover:text-white transition-colors duration-300"></i>
        <span className="text-xl">{count}</span>
        <i onClick={() => updateQuantity({productId:id,count:+count+1})}   className="fa-solid cursor-pointer fa-plus rounded-full text-primary-500 sm:py-8 sm:px-2 px-8 py-2 border border-primary-300 hover:bg-primary-500 hover:text-white transition-colors duration-300"></i>
      </div>
    </div>
  );
}
