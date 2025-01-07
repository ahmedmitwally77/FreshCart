import React, { useContext, useEffect, useState } from 'react'
import { wishlistContext } from '../../Components/Context/wishlist/wishlist'
import ProductCard from '../../Components/ProductCard/ProductCard'
import Loading from '../../Components/Loading/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import AnimatedSVG from '../../Components/svgComp/AnimatedSVG'
import animationData from '../../assets/images/Empty Order.json'

export default function WishlistPage() {
  const {wishlist,getWishlistDetails}=useContext(wishlistContext)

useEffect(() => {
  getWishlistDetails()
}, []);

  return (
    wishlist.data && wishlist? <section className='wishlist p-3 mb-6' id='wishlist'>
      <Helmet>
      <title>Wishlist</title>
      <meta name="description" content="Wishlist" />
      </Helmet>
   

    {wishlist.count>0 ? (
      <div className="py-3">
        <div className="divider flex justify-between items-center flex-col lg:flex-row">
        <h1 className='text-3xl font-bold '> <i className=" text-primary-500 fa-fade text-4xl fa-solid fa-clipboard-list"></i> Wishlist </h1>
        <span className='text-lg font-semibold text-gray-600 mt-2 lg:mt-0'>Number of items: {wishlist.count} </span>
        </div>
      <div className="grid grid-cols-12 gap-6 md:gap-8 mt-8">
        {wishlist.data.map((product) => (
          <ProductCard key={product.id} productItem={product} />  
        ))}
      </div>
      </div>
    ):(
      <div className="flex items-center justify-center w-3/4 mx-auto flex-col lg:flex-row gap-1">

          <div className="flex justify-center text-center w-full lg:w-1/2 items-center flex-col    ">

          <h1 className="text-xl font-bold text-gray-600">Your Wishlist Is Empty, Start Shopping Now by Clicking the button below and find something you love! ❤</h1>
          <Link to="/" className="btn w-fit font-medium txet-lg  block bg-primary-500 hover:bg-primary-600 mt-5"><i className="fa-solid fa-bag-shopping me-2"></i>Start Shopping</Link>
          </div>

          <div className="image w-full lg:w-1/2 lg:mt-0 -mt-8">
            <AnimatedSVG animationData={animationData} />
          </div>

      </div>
    )}

 </section>: <div className="flex justify-center items-center py-24   "><Loading /></div>
  )
}
