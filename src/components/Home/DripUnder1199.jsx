"use client"
import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import axiosInstance from "@/config/axiosInstance";
import { Skeleton } from "../ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const DripUnder1199 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(false);
  const [timer, setTimer] = useState("");

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free",
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1.4, spacing: 10 },
      },
    },
    created(slider) {
      updateControls(slider);
    },
    slideChanged(slider) {
      updateControls(slider);
    },
  });

  const updateControls = (slider) => {
    if (!slider.track.details) {
      return; // Exit if details are not available
    }

    const current = slider.track.details.rel;
    const slidesPerView = slider.track.details.slidesPerView || 1; // Fallback to 1 if undefined
    const max = slider.track.details.slides.length - slidesPerView;

    setCanSlidePrev(current > 0);
    setCanSlideNext(current < max);
  };

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `product/get-product-category/steal-the-drip?limit=60&sort=relevance`
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

  useEffect(() => {
    const getThursdayMidnightIST = () => {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const utcNow = now.getTime() + now.getTimezoneOffset() * 60000;
      const istNow = new Date(utcNow + istOffset);

      // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const currentDay = istNow.getDay();

      // Calculate days to add to reach Friday (i.e., Thursday 12 PM = Friday 00:00 AM)
      const daysToSunday = (7 - currentDay + 7) % 7;

      const nextFridayMidnight = new Date(istNow);
      nextFridayMidnight.setDate(istNow.getDate() + daysToSunday);
      nextFridayMidnight.setHours(0, 0, 0, 0); // Set to 00:00 IST

      return nextFridayMidnight.getTime();
    };

    const target = getThursdayMidnightIST();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimer("00 hr 00 min 00 sec");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimer(
        `${hours.toString().padStart(2, "0")} hr ${minutes
          .toString()
          .padStart(2, "0")} min ${seconds.toString().padStart(2, "0")} sec`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Skeleton className="w-full h-[500px] rounded-xl" />;
  }

  return (
    <div className="py-10 px-0 md:px-5 relative">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-center uppercase text-xl md:text-3xl font-bold text-red-500 !mb-0">
          {/* DRIPCULT - CERTIFIED HEAT */}
          End of Season Steals
        </h2>
      </div>

      <div className="relative pt-10 pb-4">
        <div ref={sliderRef} className="keen-slider pl-4">
          {data.map((product) => (
            <Link
              href={`/product-details/${product?._id}?name=${product?.name?.replace(/[\s–]+/g, "-")}`}
              key={product._id}
              className="keen-slider__slide flex flex-col items-center group relative  pb-10"
            >
              <div className="relative w-full h-[300px] overflow-hidden rounded-xl">
                {/* First Image (Default) */}
                <img
                  src={product?.thumbnails[0]}
                  alt={product?.name}
                  className="h-full w-full object-cover absolute transition-opacity duration-500"
                  loading="lazy"
                />
                {/* Size Variation Sliding Up */}
              </div>

              {/* Product Info */}
              <p className="text-center text-xs md:text-sm font-semibold uppercase mt-2">
                {product?.name}
              </p>
              <p className="text-center text-sm font-medium mt-1">
                ₹ {product?.discountedPrice}
              </p>
              <div className="absolute  -bottom-0 w-full flex justify-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product &&
                  product?.sizeVariations.slice(0, 5).map((size, index) => (
                    <span
                      key={index}
                      className="bg-gray-300 text-black text-xs w-10 flex items-center justify-center py-1 hover:bg-black hover:text-white transition"
                    >
                      {size.size}
                    </span>
                  ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Left Arrow */}
        {canSlidePrev && instanceRef.current && (
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            onClick={() => instanceRef.current?.prev()}
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Right Arrow */}
        {canSlideNext && instanceRef.current && (
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            onClick={() => instanceRef.current?.next()}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DripUnder1199;
