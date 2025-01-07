import axios from "axios";
import  { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import { cartContext } from "../Context/CartContext/Cart.Context";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useQuery } from "@tanstack/react-query";
import { wishlistContext } from "../Context/wishlist/wishlist";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";


export default function ProductDetails() {
  const { id } = useParams();

  const { addToCart, addLoading } = useContext(cartContext);
  const { wishlist,addToWishlist,removeFromWishlist} = useContext(wishlistContext);
  
  const [product, setProduct] = useState(null);
  const [realtedProduct, setRealtedProduct] = useState(null);

  function getProductDetails() {
    const option = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    };
    axios
      .request(option)
      .then(({ data }) => {
        setProduct(data.data);
      })
      .catch((err) => toast.error("No Product Found"));
  }

  function getRelatedProducts() {
    const option = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${product.category._id}`,
    };
    axios
      .request(option)
      .then(({ data }) => {
        const products = data.data.filter((p) => p._id !== product._id);
        setRealtedProduct(products);
      })
      .catch((err) => toast.error(err.response.data.message));
  }

async function getAllProducts() {
    const option = {
      method: "GET",
      url: `https://ecommerce.routemisr.com/api/v1/products`,
    };
    return axios.request(option)
      
  }

  const {data,isLoading}= useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 6 * 60 * 60 * 1000
  })

  var settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    swipeToSlide: true,
    // slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ],
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    getRelatedProducts();    
  }, [product]);


  if(isLoading){return <div className="flex justify-center items-center py-24   " ><Loading /></div>}

  return (
    <div className="product-details-page pb-8">
      <Helmet>
        <title>{product?.title}</title>
        <meta name="description" content={`Product Details of ${product?.title} `}/>
      </Helmet>
      {product ? (
        <div
          className="product-details flex flex-col lg:flex-row gap-10 justify-center items-center  "
          data-id={id}
        >
          <div className="lg:w-1/4 w-3/4 mx-auto  rounded-md shadow-lg overflow-hidden ">
            <ImageGallery 
            showFullscreenButton={false}
            infinite={true}
            autoPlay={true}
            showPlayButton={false}
            showNav={false}
            // thumbnailPosition="right"
              items={product.images.map((img) => {
                return { original: img, thumbnail: img };
              })}
            />
          </div>

          <div className="lg:w-3/4 w-full">
            <div className="divider flex justify-between items-center">
            <h2 className="product-name text-2xl font-semibold mb-3 mr-3 ">
              {product.title}
            </h2>
            {wishlist?.data?.map((p) => p._id).includes(product._id) ? (
                  <div className="icon bg-red-600   rounded-full text-white" onClick={()=>removeFromWishlist({id})}>
                  <i className="fa-solid p-2 text-xl cursor-pointer fa-heart hover:scale-110 hover:rotate-12 transition-all duration-300"></i>
                </div>
            ) : (
              <div className="icon bg-primary-400  rounded-full text-white" onClick={()=>addToWishlist({id})}>
              <i className="fa-solid p-2 text-xl cursor-pointer fa-heart hover:scale-110 hover:rotate-12 transition-all duration-300"></i>
            </div>
            )}
            </div>

            <p className="product-description text-gray-600 ">
              {product.description}
            </p>
            <h3 className="category text-primary-500 text-md my-3">
              {product.category.name}
            </h3>
            <div className="price-rate flex justify-between items-center mb-3">
              <span className="price font-semibold text-xl">
                {product.price} EGP
              </span>
              <div className="rate flex items-center  gap-1">
                <i className="fa-solid fa-star text-yellow-300"></i>
                <span className="text-md">{product?.ratingsAverage}</span>
              </div>
            </div>
            <div className="brand border-t border-gray-300 py-3 flex justify-between items-center">
              <h4 className="text-gray-600 text-lg font-semibold">
                Brand: {product.brand.name}
              </h4>
              <img src={product.brand.image} loading="lazy"  className="md:w-28 w-16" alt=" " />
            </div>
            <button
              className="btn w-full mt-2"
              disabled={addLoading}
              onClick={() => addToCart({ productId: product._id })}
            >
              {addLoading ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                <span>
                  {" "}
                  Add To Cart <i className="fa-solid fa-cart-shopping "></i>{" "}
                </span>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center py-24   ">
          <Loading />
        </div>
      )}

      {realtedProduct ? (
        <div className="related-products mt-16">
          <h1 className="text-2xl font-bold text-primary-500 mb-4">
            Related Products
          </h1>
          <div className="slider-related">
            <Slider {...settings}>
              {realtedProduct.map((product) => (
                <div className="px-1 cursor-grab product-realted" key={product._id}>
                  <ProductCard productItem={product} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center py-24   ">
          <Loading />
        </div>
      )}

      {data ? (
        <div className="related-products mt-6">
          <h1 className="text-2xl font-bold text-primary-500 mb-4">
            Recent Products
          </h1>
          <div className="slider-all">
            <Slider {...settings}>
              {data.data.data.map((product) => (
                <div className="px-1 cursor-grab product-realted" key={product._id}>
                  <ProductCard key={product._id} productItem={product} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center py-24   ">
          <Loading />
        </div>
      )}
    </div>
  );
}
