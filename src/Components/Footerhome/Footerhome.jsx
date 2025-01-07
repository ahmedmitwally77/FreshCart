import { Link } from "react-router-dom";
import storeImage from "../../assets/images/store.svg";
import IconBox from "../IconBox/IconBox";

export default function Footerhome() {
  return (
    <>

    <div className="shop w-5/6 mx-auto flex-col md:flex-row gap-4 flex justify-between items-center">
    <div className="text md:w-2/5 w-full">
      <h4 className="text-2xl font-bold ">One Stop Grocery Shop</h4>
      <p className="my-3 text-gray-600">Shopping for your furry friend? Find food,
      treats, and more in one easy spot.</p>

      <Link to="/products" className="btn w-fit block bg-black hover:bg-gray-700">Get Discount on Share</Link >
    </div>

    <div className="image md:w-3/5 w-full ">
      <img src={storeImage} alt="store image for home Page" className="w-full"/>
    </div>
    </div>

    <div className="iconsimages w-5/6 mx-auto py-8 flex  flex-wrap items-center">
     <IconBox info={{icon:"fa-regular fa-clock",title:"10 minute grocery now",desc:"Get your order delivered to your doorstep at the earliest from FreshCart pickup stores near you."}}/>
     <IconBox info={{icon:"fa-solid fa-gift",title:"Best Prices & Offers",desc:"Cheaper prices than your local supermarket, great cashback offers to top it off. Get best pricess & offers."}}/>
     <IconBox info={{icon:"fa-solid fa-dolly",title:"Wide Assortment",desc:"Choose from 5000+ products across food, personal care, household, bakery, veg and non-veg & other categories."}}/>
     <IconBox info={{icon:"fa-solid fa-rotate",title:"Easy Returns",desc:"Not satisfied with a product? Return it at the doorstep & get a refund within hours. No questions asked policy."}}/>
    </div>
    </>
  )
}
