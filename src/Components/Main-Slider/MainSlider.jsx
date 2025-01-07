import Slider from "react-slick";

import slider1 from "../../assets/images/slider-image-3.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-1.jpeg";
import slider4 from "../../assets/images/slider-images-4.jpeg";
import CategoryBox from "../CategoryBox/CategoryBox";

export default function MainSlider() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <div>hi</div>,
    waitForAnimate: false,
    appendDots: dots => (
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          right: "0px"
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    
  };
  return (
    <div className="flex sm:-my-8">
     <div className="main-slider w-full md:w-5/7 lg:w-5/6  mx-auto sm:p-8 rounded-lg ">
     <Slider {...settings}>
      <CategoryBox info={{img:slider1,des:20,head:"Cokoladni Kolutici Lasta",price:"500"}} />
      <CategoryBox info={{img:slider3,des:15,head:"Best Online Deals, Free Stuff",price:"300"}} />
      <CategoryBox info={{img:slider2,des:40,head:"Chocozay wafer rolls Deals",price:"200"}} />
      </Slider>
     </div>
    </div>
  );
}

