import MainSlider from "../../Components/Main-Slider/MainSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import RecentProducts from "../../Components/RecentProducts/RecentProducts";
import { Helmet } from "react-helmet";
import { Footer } from "flowbite-react";
import Footerhome from "../../Components/Footerhome/Footerhome";

export default function Home() {


  return (
    <>
    <Helmet>
      <title>Home</title>
      <meta name="description" content="Home" />
      <meta name="keywords" content="Home Ecommerce FreshCart ReactProject cart " />
    </Helmet>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
      <Footerhome />
      
    </>
  );
}
