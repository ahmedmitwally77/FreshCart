import { useContext, useState } from "react";
import { cartContext } from "../Context/CartContext/Cart.Context";
import { Link } from "react-router-dom";
import { wishlistContext, WishlistProvider } from "../Context/wishlist/wishlist";



export default function ProductCard({ productItem }) {
  const { category, title, price, imageCover, ratingsAverage, id } =productItem;
  const { addToCart, addLoading } = useContext(cartContext);
  const {wishlist,addToWishlist,removeFromWishlist}=useContext(wishlistContext);
  const [currId, setcurrId] = useState(null)

  


  return (
    <div className="card relative pb-10 rounded-lg overflow-hidden col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 group/card">
      <div className="content">
        <div className="image relative">
          <img src={imageCover} className="w-full" alt={title} />

          <div className="layer bg-gray-300 bg-opacity-50 flex justify-center items-center w-full h-full absolute top-0 left-0  opacity-0 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-700">

            {wishlist.data?.find((item) => item.id === id) ? (
                  <div className="icon bg-red-600  rounded-full text-white" onClick={()=>removeFromWishlist({id})}>
                  <i className="fa-solid p-2 text-xl cursor-pointer fa-heart hover:scale-110 hover:rotate-12 transition-all duration-300"></i>
                </div>
            ) : (
              <div className="icon bg-primary-400  rounded-full text-white" onClick={()=>addToWishlist({id})}>
              <i className="fa-solid p-2 text-xl cursor-pointer fa-heart hover:scale-110 hover:rotate-12 transition-all duration-300"></i>
            </div>
            )}
            <Link to={`/product/${id}`}>
              <div className="icon bg-primary-400  rounded-full text-white ml-3">
                <i className="fa-solid p-2 text-xl cursor-pointer fa-eye hover:scale-110 hover:rotate-12 transition-all duration-300"></i>
              </div>
            </Link>
          </div>
          
        </div>
        <div className="card-info p-3">
          <h3
            className="category text-primary-500 text-sm"
            data-category={category._id}
          >
            {category.name}
          </h3>
          <h2 className="product-name text-xl font-semibold mb-3 line-clamp-1">
            {title}
          </h2>
          <div className="price-rate flex justify-between items-center mb-2">
            <span>{price} EGP</span>
            <span className="text-gray-500">
              <i className="fa-solid fa-star text-yellow-300"></i>
              {ratingsAverage}
            </span>
          </div>
        </div>
      </div>
      <button
        className="btn p-1 absolute w-40 translate-y-full bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 group-hover/card:delay-500"
        type="button"
        onClick={() => {setcurrId(id);addToCart({ productId: id })}}
        disabled={addLoading}
      >
        { addLoading && currId === id ? (
          <i className="fa-solid fa-spinner animate-spin"></i>
        ) : (
          <span>Add To Cart <i className="fa-solid fa-cart-shopping"></i></span>
        )}
      </button>
    </div>
  );
}
3;
