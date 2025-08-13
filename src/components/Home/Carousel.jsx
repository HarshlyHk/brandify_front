"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "@/config/axiosInstance";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const slidesPerView = isMobile ? 1 : 4;

  if (carouselData.length < slidesPerView + 1) {
    return null; // or render a static version
  }

  return (
    <div className="w-full swiper-height relative md:w-[99vw] mx-auto">
      {carouselData.length > 0 && (
        <>
          <Swiper
            modules={[Pagination, Navigation, EffectFade, Autoplay]}
            pagination={{
              clickable: true,
              type: "bullets",
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setSwiperInstance(swiper);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
              setCanSlidePrev(!swiper.isBeginning);
              setCanSlideNext(!swiper.isEnd);
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1240: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={20}
            className="h-full swiper-container"
          >
            {carouselData.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-[80vh]">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    fill
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute left-4 bottom-4 text-white max-w-[90%] md:block hidden">
                    <h3 className="text-lg font-semibold font-figtree">
                      {item.name?.toUpperCase()}
                    </h3>
                    <Link
                      href={item.productUrl}
                      className="bg-white text-black px-6 py-3 text-xs font-medium shadow-md hover:bg-gray-200 transition font-figtree mt-2 inline-block"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          {!isMobile && swiperInstance && (
            <div className="absolute top-1/2 left-0 w-full flex justify-between items-center px-4 z-10">
              {/* Left Button */}
              <button
                className="swiper-button-prev-custom bg-white text-black p-2 rounded-full shadow hover:bg-gray-100 transition transform -translate-y-1/2"
                onClick={() => swiperInstance.slidePrev()}
                style={{
                  visibility: swiperInstance.isBeginning ? "hidden" : "visible",
                }}
              >
                <ChevronLeft size={20} />
              </button>

              {/* Right Button */}
              <button
                className="swiper-button-next-custom bg-white text-black p-2 rounded-full shadow hover:bg-gray-100 transition transform -translate-y-1/2"
                onClick={() => swiperInstance.slideNext()}
                style={{
                  visibility: swiperInstance.isEnd ? "hidden" : "visible",
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Mobile text overlay */}
          {isMobile && carouselData.length > 0 && (
            <div className="absolute left-6 flex flex-col gap-3 bottom-16 text-white max-w-[80%] z-10 md:hidden">
              <h3 className="text-xl font-semibold font-figtree">
                {carouselData[activeIndex]?.name?.toUpperCase()}
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

      {/* Scroll down button */}
      <button
        className="bg-white absolute -bottom-5 md:hidden shadow-md rounded-full left-1/2 -translate-x-1/2 z-10 w-10 h-10 flex items-center justify-center"
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
