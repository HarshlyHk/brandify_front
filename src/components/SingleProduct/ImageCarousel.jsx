import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Controller } from "swiper/modules";
import "swiper/css";

import ImageCarouselSkeleton from "../Skeleton/ImageCarouselSkeleton";
import { useRef, useState, useEffect } from "react";

const ImageCarousel = ({ images, loading }) => {
  const swiperRef = useRef(null); // Main Swiper
  const progressSwiperRef = useRef(null); // Progress Bar Swiper
  const thumbnailsRef = useRef(null); // Thumbnails container
  const thumbnailRefs = useRef([]); // Array of thumbnail refs
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressIndex, setProgressIndex] = useState(0);

  useEffect(() => {
    if (thumbnailRefs.current[activeIndex] && thumbnailsRef.current) {
      const activeThumbnail = thumbnailRefs.current[activeIndex];
      const thumbnailsContainer = thumbnailsRef.current;

      const containerRect = thumbnailsContainer.getBoundingClientRect();
      const thumbnailRect = activeThumbnail.getBoundingClientRect();

      if (thumbnailRect.right > containerRect.right) {
        // If the active thumbnail is outside right, scroll right
        thumbnailsContainer.scrollBy({
          left: thumbnailRect.right - containerRect.right + 20,
          behavior: "smooth",
        });
      } else if (thumbnailRect.left < containerRect.left) {
        // If the active thumbnail is outside left, scroll left
        thumbnailsContainer.scrollBy({
          left: thumbnailRect.left - containerRect.left - 20,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  if (loading) {
    return <ImageCarouselSkeleton />;
  }

  return (
    <div className="flex flex-col gap-10 relative">
      {/* Swiper Main Carousel */}
      <Swiper
        modules={[Pagination, Navigation, Controller]}
        pagination={{
          type: "fraction",
          clickable: true,
          el: ".custom-swiper-pagination",
        }}
        spaceBetween={30}
        slidesPerView={1}
        controller={{ control: progressSwiperRef.current }}
        loop={true}
        autoHeight={true}
        className="md:max-w-[700px] max-w-[95vw]"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.on("slideChange", () => {
            setActiveIndex(swiper.realIndex);
          });
          swiper.on("transitionStart", () => {
            setProgressIndex(swiper.realIndex);
          });
        }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <a href={src} target="_blank" rel="noopener noreferrer">
              <img
                src={src}
                alt={`Slide ${idx}`}
                loading="lazy"
                className="object-cover md:w-full w-[400px] h-auto"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Animated Progress Bar (desktop or mobile as needed) */}
      <div className="relative md:hidden bottom-10">
        <div
          className="relative w-full h-1 bg-gray-200 rounded overflow-hidden"
          onClick={(e) => {
            const progressBar = e.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const clickPosition = e.clientX - rect.left;
            const newIndex = Math.floor(
              (clickPosition / rect.width) * images.length
            );
            swiperRef.current?.slideToLoop(newIndex);
          }}
        >
          <div
            className="absolute top-0 left-0 h-full bg-black transition-transform duration-300"
            style={{
              width: `${(100 / images.length).toFixed(2)}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>

      <div className=" text-center text-[13px] tracking-wider absolute z-50 font-medium md:hidden bottom-16 left-4 border-2 max-h-9 min-h-9 min-w-10 max-w-10 rounded-full flex items-center justify-center border-gray-200 bg-[#f9f9f9]  text-gray-700 gap-[2px]">
        <span>{activeIndex + 1}</span>/ <span>{images.length}</span>
      </div>
      {/* Desktop Thumbnails */}
      <div
        ref={thumbnailsRef}
        className="hidden md:flex flex-row md:w-[600px] h-36 mx-8 px-2 justify-start gap-2 overflow-x-auto py-2 single-image-thumbnails scroll-smooth"
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            ref={(el) => (thumbnailRefs.current[idx] = el)} // Store ref for each thumbnail
            alt={`Thumbnail ${idx}`}
            className={`w-32 max-h-32 object-cover transition-all cursor-pointer ${
              activeIndex === idx
                ? "outline-[#9e9e9e] outline-2 scale-105"
                : "outline-transparent"
            }`}
            onClick={() => swiperRef.current?.slideToLoop(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
