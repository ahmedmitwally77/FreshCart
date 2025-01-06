import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider4 from "../../assets/images/slider-4.jpg"
import slider5 from "../../assets/images/slider-5.jpg"
import slider6 from "../../assets/images/slider-6.jpg"
import slider7 from "../../assets/images/slider-7.jpg"
import slider8 from "../../assets/images/slider-8.jpg"
import slider9 from "../../assets/images/slider-9.jpg"
import slider10 from "../../assets/images/slider-10.jpg"
import  "./MainSlider.css"

import "swiper/css";
export default function MainSlider() {
  return (
    <div className="grid-cols-12 grid -mt-4 md:mt-0">
      <div className="col-span-12 lg:col-span-9 h-[200px] md:h-[300px]">
        <swiper-container slidesPerView={1} style={{ width: "100%", height: "100%" }} speed={1000} loop={true} pagination={true} navigation={false} className="mySwiper">
          <swiper-slide><img src={slider5} alt="imgSlider 2" className="w-full h-full md:object-cover object-contain" /></swiper-slide>
          <swiper-slide><img src={slider4} alt="imgSlider 1" className="w-full h-full md:object-cover object-contain" /></swiper-slide>
          <swiper-slide><img src={slider6} alt="imgSlider 3" className="w-full h-full md:object-cover object-contain" /></swiper-slide>
          <swiper-slide><img src={slider7} alt="imgSlider 4" className="w-full h-full md:object-cover object-contain" /></swiper-slide>
          <swiper-slide><img src={slider8} alt="imgSlider 5" className="w-full h-full md:object-cover object-contain" /></swiper-slide>
          <swiper-slide><img src={slider9} alt="imgSlider 6" className="w-full h-full md:object-cover object-contain" /></swiper-slide>
          <swiper-slide><img src={slider10} alt="imgSlider 7" className="w-full h-full md:object-cover object-contain" /></swiper-slide>
        </swiper-container>
      </div>
      <div className="lg:col-span-3 md:flex lg:block col-span-12 lg:h-[300px] md:h-[250px] hidden ">
        <img src={slider1} className="lg:w-full w-1/2 lg:h-1/2 h-full object-cover" alt="" />
        <img src={slider2} className="lg:w-full w-1/2 lg:h-1/2  h-full object-cover "  alt="" />
      </div>
    </div>
  );
}
