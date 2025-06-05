"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DripCultSlider = ({ products }) => {
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free",
    slides: { perView: 4, spacing: 20 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 15 } },
      "(max-width: 640px)": { slides: { perView: 1.4, spacing: 10 } },
    },
    created: updateControls,
    slideChanged: updateControls,
  });

  function updateControls(slider) {
    if (!slider?.track?.details) return;
    const { rel, slides, slidesPerView = 1 } = slider.track.details;
    const max = slides.length - slidesPerView;
    setCanSlidePrev(rel > 0);
    setCanSlideNext(rel < max);
  }

  const handlePrev = () => instanceRef.current?.prev();
  const handleNext = () => instanceRef.current?.next();

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        { products && products.map((product) => (
          <Link
            key={product._id}
            href={`/${product.name.replace(/[\s–]+/g, "-")}/${product._id}`}
            className="keen-slider__slide group flex flex-col items-center relative pb-10"
          >
            <div className="relative w-full h-[300px] overflow-hidden rounded-xl">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority={false}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                  className="object-cover transition-opacity duration-500"
                />
              </motion.div>
            </div>

            <p className="text-center text-xs md:text-sm font-semibold uppercase mt-2">
              {product.name}
            </p>
            <p className="text-center text-sm font-medium mt-1">
              ₹ {product.discountedPrice}
            </p>

            {product?.sizeVariations?.length > 0 && (
              <div className="absolute bottom-0 w-full flex justify-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.sizeVariations.slice(0, 5).map((size, i) => (
                  <span
                    key={i}
                    className="bg-gray-300 text-black text-xs w-10 flex items-center justify-center py-1 hover:bg-black hover:text-white transition"
                  >
                    {size.size}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Left Arrow */}
      {canSlidePrev && (
        <button
          aria-label="Previous slide"
          onClick={handlePrev}
          className="absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Right Arrow */}
      {canSlideNext && (
        <button
          aria-label="Next slide"
          onClick={handleNext}
          className="absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default DripCultSlider;
