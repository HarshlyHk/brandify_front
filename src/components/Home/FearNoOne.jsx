import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import axiosInstance from "@/config/axiosInstance";
import { Skeleton } from "../ui/skeleton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const FearNoOne = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
    },
  });

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `product/get-product-category/fear-no-one?limit=5`
      );
      if (data?.data?.products) {
        setData(data.data.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading || !data) {
    return <Skeleton className="w-full h-[500px] rounded-xl" />;
  }


  return (
    <div className="bg-black text-white py-10 px-4 md:px-16">
      <p className="text-center text-[20px] md:text-4xl font-bold mb-8">
            FEAR NO ONE
      </p>
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {data.map((product, index) => (
            <div
              key={product._id}
              className="keen-slider__slide flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8"
            >
              {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="rounded-[5px] h-[400px] w-full lg:w-[500px] lg:h-[500px] object-cover shadow-lg"
            />
          </div>

              {/* Right: Text */}
              <div className="w-full lg:w-2/3 text-center md:text-center space-y-8">
                <h3 className="text-[16px] text-nowrap md:text-[28px] font-bold">
                  {product.name}
                </h3>
                <p className="md:text-sm font-bold text-[10px] ">
                  THE RAREST PIECES CHOOSE THEIR OWNER, ARE YOU READY?
                </p>
                <div className="w-full text-center ">
                  <Link className="border-2 border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition w-fit text-center "
                    to={`/fear-no-one/${product._id}`}
                  >
                    COP NOW
                  </Link>
                </div>

                <div className="flex justify-center items-center space-x-4">
                <p className="text-red-600 md:text-sm  text-[10px] font-bold pt-2">
                  THESE PIECES ARE EXCLUSIVELY LIMITED TO 50 PCS.
                </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
          onClick={() => slider.current?.prev()}
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
          onClick={() => slider.current?.next()}
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default FearNoOne;
