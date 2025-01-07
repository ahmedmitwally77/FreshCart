import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {

  const {data,isLoading}= useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 6 * 60 * 60 * 1000
  })

  async function getAllCategories() {
    const option={
      method:"GET",
      url:"https://ecommerce.routemisr.com/api/v1/categories"
    }
    return axios.request(option)
  }


    if(isLoading){
      return <div className="flex justify-center items-center py-24   "><Loading /></div>
    }

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
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

  return (
    <div className="category-slider my-8 md:my-10">
      <h1 className="text-xl font-bold text-primary-500 mb-8">
        Shop Popular Categories
      </h1>
      {(<Slider {...settings}>
        {data.data.data.map((category) => ( <div key={category._id} >
            <div className="category-item cursor-grab">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[200px] object-cover"
              />
              <Link to={`/categories/${category._id}`}>
              <h2 className="text-md mt-3 ml-2">{category.name}</h2>
              </Link>
            </div>
          </div>
        ))}
      </Slider>)}
    </div>
  );
}
