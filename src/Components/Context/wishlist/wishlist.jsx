import { createContext, useContext, useState } from "react";
import { tokenContext } from "../TokenContext/Token.Context";
import axios from "axios";
import toast from "react-hot-toast";

export const wishlistContext = createContext(null);

export  function WishlistProvider({children}){
  const [wishlist, setWishlist] = useState([]);
    const { token } = useContext(tokenContext);
  

  function addToWishlist({id}){
    const idToast = toast.loading("Adding Product...");
    const option={
      method:"POST",
      url:"https://ecommerce.routemisr.com/api/v1/wishlist",
      headers:{token},
      data:{productId:id}
    }
    axios.request(option).then(({data})=>{
      if(data.status==="success"){
        toast.success(data.message);
        getWishlistDetails();
      }
    }).catch((err)=>{
      toast.error(err.response.data.message);
    })
    .finally(()=>{
      toast.dismiss(idToast);
    })
  }

  function removeFromWishlist({id}){
    const idToast = toast.loading("Removing Product...");
    const option={
      method:"DELETE",
      url:`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      headers:{token}
    }
    axios.request(option).then(({data})=>{
      if(data.status==="success"){
        toast.success(data.message);
        getWishlistDetails();
      }
    }).catch((err)=>{
      toast.error(err.response.data.message);
    })
    .finally(()=>{
      toast.dismiss(idToast);
    })
  }

  function getWishlistDetails(){
    const option={
      method:"GET",
      url:"https://ecommerce.routemisr.com/api/v1/wishlist",
      headers:{token}
    }
    axios.request(option).then(({data})=>{      
      if(data.status==="success"){
        setWishlist(data);
      }
    })
    .catch((err)=>{
      toast.error(err.response.data.message);
    })
  }



  return (
    <wishlistContext.Provider value={{wishlist, setWishlist, addToWishlist,removeFromWishlist,getWishlistDetails}}>{children}</wishlistContext.Provider>
  )
}
