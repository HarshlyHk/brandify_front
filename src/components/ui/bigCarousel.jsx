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
import Image from "next/image";

export const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

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
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleCardClose = (index) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const cardWidth = isMobile ? 250 : 384;
    const gap = isMobile ? 4 : 8;
    carouselRef.current?.scrollTo({
      left: (cardWidth + gap) * (index + 1),
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full py-0">
        <h2 className="text-center">DRIP FAM</h2>
        <div
          className="flex w-full overflow-x-scroll scroll-smooth no-scrollbar"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-50 h-auto w-[5%] bg-gradient-to-l" />
          <div className="flex flex-row justify-start gap-4 pl-4 mx-auto max-w-7xl">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index, ease: "easeOut" }}
                key={`card-${index}`}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 mt-10 md:mt-0 flex justify-end gap-2 md:absolute md:bottom-4 md:right-0">
          <button
            className="z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll Left"
          >
            <AiOutlineArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            className="z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll Right"
          >
            <AiOutlineArrowRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };

    document.body.style.overflow = open ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

    const handleOpen = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  useOutsideClick(containerRef, handleClose);



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
              className="relative z-60 mx-auto my-10 h-full max-w-[400px] rounded-3xl bg-transparent p-4 md:p-2 dark:bg-neutral-900"
            >
              <button
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
                aria-label="Close"
              >
                <AiOutlineClose className="h-6 w-6 text-white dark:text-black" />
              </button>
              <div className="relative h-[80vh] w-full overflow-hidden rounded-3xl">
                <BlurImage
                  src={card.imageUrl}
                  alt={card.title}
                  isVideo={card.isVideo}
                  className="absolute inset-0 z-10 object-cover"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={handleOpen}
        className="relative z-10 flex h-96 w-64 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8 text-white">
          <p className="text-sm font-medium md:text-base">{card.category}</p>
          <p className="mt-2 max-w-xs text-xl font-semibold md:text-3xl">
            {card.title}
          </p>
        </div>
        <BlurImage
          src={card.imageUrl}
          alt={card.title}
          isVideo={card.isVideo}
          className="absolute inset-0 z-10 object-cover"
        />
      </button>
    </>
  );
};

export const BlurImage = ({ height, width, src, className, alt, isVideo, ...rest }) => {
  const [isLoading, setLoading] = useState(true);

  if (isVideo) {
    return (
      <video
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
        {...rest}
      />
    );
  }

  return (
    <Image
      className={cn(
        "h-full w-full object-cover transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width || 500}
      height={height || 500}
      loading="lazy"
      decoding="async"
      alt={alt || "Card Image"}
      {...rest}
    />
  );
};
