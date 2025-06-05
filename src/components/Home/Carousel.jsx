"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import { ChevronDown } from "lucide-react";
import axiosInstance from "@/config/axiosInstance";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";

// Sample Data

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await axiosInstance.get("/lookbooks/get");
        setCarouselData(response.data.data.lookBooks);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

    fetchCarouselData();
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full md:hidden h-[80vh] relative">
      {carouselData.length > 0 && (
        <>
          <Swiper
            modules={[Pagination, EffectFade, Autoplay]}
            effect="fade"
            pagination={{
              clickable: true,
              type: "bullets",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="h-full"
          >
            {carouselData?.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full">
                  <img
                    src={item?.imageUrl}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {carouselData[activeIndex] && (
            <div className="absolute left-10 flex flex-col gap-3 bottom-16 text-white max-w-[80%] z-10">
              <h3 className="text-xl font-semibold font-figtree">
                {carouselData[activeIndex].name.toUpperCase()}
              </h3>
              <Link
                href={carouselData[activeIndex]?.productUrl}
                className="bg-white text-black px-8 py-4 text-xs font-medium shadow-md hover:bg-gray-200 transition font-figtree mt-0 w-36 flex items-center justify-center"
              >
                SHOP NOW
              </Link>
            </div>
          )}
        </>
      )}
      <button
        className="bg-white absolute -bottom-5 shadow-md rounded-full left-1/2 -translate-x-1/2 z-10 w-10 h-10 flex items-center justify-center"
        name="go-down"
        onClick={() => {
          const element = document.querySelector("#fix-your-drip");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <ChevronDown className="text-gray-500" size={22} />
      </button>
    </div>
  );
};

export default Carousel;
