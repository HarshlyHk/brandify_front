"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClose,
} from "react-icons/ai";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/utils/use-outside-click";
import Link from "next/link";

// Carousel context
export const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

// Carousel component
export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 250 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full py-0 md:py-0">
        <h2 className=" text-center"></h2>
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] "
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"></div>
          <div
            className={cn("flex flex-row justify-start gap-4 pl-4", "mx-auto ")}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 mt-10 md:mt-0 flex justify-end gap-2 md:absolute md:bottom-4 md:-right-4">
          <button
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <AiOutlineArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <AiOutlineArrowRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

// Card component
export const Card = ({ card, index, layout = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose } = useContext(CarouselContext);
  const product = card?.product;
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") handleClose();
    }

    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    // if mobile. then open otherwise don't open
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setOpen(true);
    } else {
      // onCardClose(index);
    }
  };
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[50000000] h-screen overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              ref={containerRef}
              className="relative z-[60] mx-auto my-10 h-full max-w-[93%] rounded-3xl bg-transparent p-1 font-sans md:p-2 "
            >
              <button
                className=" absolute -top-5 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
              >
                <AiOutlineClose className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              {/* image */}
              <div className="relative h-[80vh] w-full overflow-hidden rounded-[15px] top-6 md:w-full md:h-[80vh] ">
                <BlurImage
                  src={card.imageUrl}
                  alt={card.title}
                  isVideo={card.isVideo}
                  className="absolute inset-0 z-10 object-cover"
                />
                {product && (
                  <div className="absolute left-1/2 bottom-2 -translate-x-1/2 w-[95%] bg-[#f9f9f9] rounded-[10px] shadow-lg flex items-center p-1 gap-4 z-50 justify-between">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={product.thumbnails?.[0] || card.imageUrl}
                        alt={product.name}
                        className="object-cover rounded-[5px] "
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-full  px-2">
                      <div className="flex-1 flex flex-col items-end ">
                        <div>
                          <h1 className="text-[13px] md:text-[1.6rem] font-semibold uppercase ">
                            {product?.name}
                          </h1>
                        </div>

                        <div className="flex gap-2 mt-2 items-center">
                          <p className="text-[0.7rem] md:text-[1.4rem] tracking-[0.1em] ">
                            ₹{product?.discountedPrice}
                          </p>
                          <p className="line-through text-[0.7rem] text-gray-500 md:text-[1.4rem] opacity-75 tracking-[0.1em]">
                            ₹{product?.originalPrice}
                          </p>
                        </div>
                        <p className="text-[0.65rem] md:text-[1.4rem] text-gray-700 tracking-[0.1em] mt-1">
                          DRIP STUDIOS
                        </p>
                      </div>
                      <Link
                        href={`/product/${
                          product._id
                        }?name=${product.name.replace(/[\s–]+/g, "-")}`}
                        onClick={() => {
                          document.body.style.overflow = "auto";
                          handleClose();
                        }}
                        className="inline-block mt-2 px-[30px] py-[12px] text-[11px] bg-black text-white hover:bg-gray-200 transition tracking-[0.2em] rounded-[1px] border-[1px] border-transparent text-center"
                      >
                        BUY NOW
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={handleOpen}
        className="relative z-10 flex h-[36em] w-80 flex-col items-start justify-start overflow-hidden rounded-[15px] bg-gray-100 md:h-[40rem] md:w-96 "
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          <p className="text-left font-sans text-sm font-medium text-white md:text-base">
            {card.category}
          </p>
          <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
            {card.title}
          </p>
        </div>
        <div>
          <BlurImage
            src={card.imageUrl}
            alt={card.title}
            isVideo={card.isVideo}
            className="absolute inset-0 z-10 object-cover"
          />
        </div>
        {product && (
          <div className="absolute left-1/2 bottom-2 -translate-x-1/2 w-[95%] bg-[#f9f9f9] rounded-[10px] shadow-lg flex items-center p-1 gap-4 z-50 justify-between">
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src={product.thumbnails?.[0] || card.imageUrl}
                alt={product.name}
                className="object-cover rounded-[5px] "
              />
            </div>
            <div className="flex-1 flex flex-col justify-between h-full pr-2">
              <div className="flex-1 flex flex-col items-end ">
                <div>
                  <h1 className="text-[12px] md:text-[14px] font-semibold uppercase text-end w-36 truncate">
                    {product?.name}
                  </h1>
                </div>

                <div className="flex gap-2 mt-2 items-center">
                  <p className="text-[0.7rem]  tracking-[0.1em] ">
                    ₹{product?.discountedPrice}
                  </p>
                  <p className="line-through text-[0.7rem] text-gray-500  opacity-75 tracking-[0.1em]">
                    ₹{product?.originalPrice}
                  </p>
                </div>
                <p className="text-[0.65rem]  text-gray-700 tracking-[0.1em] mt-1">
                  DRIP STUDIOS
                </p>
              </div>
              <Link
                href={`/product/${product._id}?name=${product.name.replace(
                  /[\s–]+/g,
                  "-"
                )}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the button's onClick
                  document.body.style.overflow = "auto";
                  handleClose();
                }}
                className="inline-block mt-2 px-[30px] py-[12px] text-[11px] bg-black text-white transition tracking-[0.2em] rounded-[1px] border-[1px] border-transparent text-center"
              >
                BUY NOW
              </Link>
            </div>
          </div>
        )}
      </button>
    </>
  );
};

// BlurImage component

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  isVideo,
  ...rest
}) => {
  const [isLoading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Use IntersectionObserver to track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // stop observing once visible
        }
      },
      { threshold: 0 } // Trigger when 10% of the element is visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return (
      <div
        ref={ref}
        className={cn("h-full w-full bg-neutral-200 ", className)}
        style={{ width, height }}
      />
    );
  }

  if (isVideo) {
    return (
      <video
        ref={ref}
        className={cn(
          "h-full w-full transition duration-300",
          isLoading ? "blur-sm" : "blur-0",
          className
        )}
        onLoadedData={() => setLoading(false)}
        src={src}
        width={width}
        height={height}
        autoPlay
        muted
        loop
        playsInline
        loading="lazy"
        {...rest}
      />
    );
  }

  return (
    <img
      ref={ref}
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt || "Background of a beautiful view"}
      {...rest}
    />
  );
};
