"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatIndianPrice } from "@/utils/formatPrice";

const ComboSlider = ({ combos, handleBuyNow }) => {
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesPerView = 4; // default, will be overridden by breakpoints

  // Get total slides
  const totalSlides = combos ? combos.length : 0;

  // Helper to get current slidesPerView based on window width
  const getSlidesPerView = () => {
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      if (w < 640) return 1.2;
      if (w < 1024) return 2;
      return 3.5;
    }
    return slidesPerView;
  };

  // Update slidesPerView on resize
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState(slidesPerView);

  useEffect(() => {
    // Set initial value after component mounts
    setCurrentSlidesPerView(getSlidesPerView());

    const handleResize = () => setCurrentSlidesPerView(getSlidesPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation handlers
  const handlePrev = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };
  const handleNext = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };

  // Hide left if at first, right if at last
  const isAtStart = activeIndex <= 0;
  const isAtEnd = activeIndex >= totalSlides - currentSlidesPerView;

  return (
    <div className="relative py-2">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        slidesPerView={slidesPerView}
        breakpoints={{
          320: { slidesPerView: 1.25, spaceBetween: 10 },
          765: { slidesPerView: 2.3, spaceBetween: 10 },
          1024: { slidesPerView: 3.5, spaceBetween: 10 },
        }}
        className=""
        style={{ paddingBottom: "10px", paddingLeft: "10px", paddingRight : "10px" }} // Space for pagination
        freeMode={true}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {combos &&
          combos.map((combo) => (
            <SwiperSlide key={combo._id}>
              <div className="group flex flex-col items-center relative pb-10">
                <div className="relative w-full overflow-hidden border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-300 bg-[#fefefe]">
                  {/* Title */}
                  <h3 className=" md:text-lg uppercase text-center font-bold text-gray-800 mb-4 p-4">
                    {combo.title}
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={combo?.imageUrl}
                      alt={combo?.title}
                      width={500}
                      height={500}
                      className="w-full h-auto object-contain transition-opacity duration-500"
                    />
                  </motion.div>

                  <div className="mt-8 text-center border-t-1 border-gray-400 p-4">
                    <p className="text-sm font-semibold text-gray-800 uppercase">
                      {combo?.totalPrice > 0
                        ? `Get This Combo at Just ₹${combo.totalPrice}`
                        : "Price not available"}
                    </p>
                    <button
                      onClick={() => handleBuyNow(combo)}
                      className="flex justify-center items-center w-fit py-[12px] px-[30px] text-[10px] tracking-[0.2em] bg-black text-white border-transparent border-[1px] mx-auto mt-4 "
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {!isAtStart && (
        <button
          aria-label="Previous slide"
          className="absolute top-[40%] md:top-[45%] left-0 -translate-y-1/2 z-[1] bg-black text-white p-2 shadow-md hover:bg-gray-100 hover:text-black transition-all duration-300"
          onClick={handlePrev}
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {!isAtEnd && (
        <button
          aria-label="Next slide"
          className="absolute top-[40%] md:top-[45%] right-0 -translate-y-1/2 z-[1] bg-black text-white p-2 shadow-md hover:bg-gray-100 hover:text-black transition-all duration-300"
          onClick={handleNext}
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default ComboSlider;
