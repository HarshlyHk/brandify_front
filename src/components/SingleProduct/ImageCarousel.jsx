import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Controller } from "swiper/modules";
import "swiper/css";
import { toast } from "sonner";
import ImageCarouselSkeleton from "../Skeleton/ImageCarouselSkeleton";
import { useRef, useState, useEffect } from "react";
import { addToWishlist } from "@/utils/addToWishlist";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { useRouter } from "next/navigation";

const ImageCarousel = ({ item, images, loading ,selectedSize}) => {
  const swiperRef = useRef(null); // Main Swiper
  const progressSwiperRef = useRef(null); // Progress Bar Swiper
  const thumbnailsRef = useRef(null); // Thumbnails container
  const thumbnailRefs = useRef([]); // Array of thumbnail refs
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressIndex, setProgressIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (item?._id) {
      const stored = typeof window !== "undefined" && localStorage.getItem("wishlist");
      if (stored) {
        try {
          const wishlist = JSON.parse(stored);
          setIsWishlisted(
            wishlist.some((w) => w.productId === item._id && (selectedSize ? w.size === selectedSize : true))
          );
        } catch {
          setIsWishlisted(false);
        }
      } else {
        setIsWishlisted(false);
      }
    }
  }, [item?._id, selectedSize]);

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

  const handleOpenModal = (src) => {
    setModalImage(src);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  if (loading) {
    return <ImageCarouselSkeleton />;
  }

  return (
    <div className="flex flex-col gap-10 relative">
      <div className="absolute top-4 z-[100] right-4 ">
        <button
          onClick={() => {
            if (!item?._id) return;
            if (isWishlisted) {
              router.push("/wishlist");
              return;
            }
            addToWishlist({
              productId: item?._id,
              name: item?.name,
              image: item?.images[0],
              price: item?.discountedPrice,
              size: selectedSize ? selectedSize : "",
            });
            router.push("/wishlist");
            toast.success(`${item?.name} Added to Wishlist`);
            setIsWishlisted(true);
          }}
          className="text-[0.9rem] text-black font-reigo-regular  "
        >
          {isWishlisted ? (
            <IoMdHeart className="inline-block text-red-500" size={24} />
          ) : (
            <IoMdHeartEmpty className="inline-block text-red-500" size={24} />
          )}
        </button>
      </div>
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
        className="md:w-[700px] md:min-h-[700px] min-h-[95vw] w-[95vw]"
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

            {/* <img
              src={src}
              alt={`Slide ${idx}`}
              loading="lazy"
              className="object-cover md:w-full w-[400px] h-auto cursor-pointer"
              onClick={() => handleOpenModal(src)}
            /> */}
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
            ref={(el) => (thumbnailRefs.current[idx] = el)}
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
      {/* Modal for image preview */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogOverlay className=" backdrop-blur-lg">
          <DialogContent className="bg-transparent border-0 shadow-none h-full md:h-screen min-w-[50vw]  max-w-full text-white p-0">
            <div className="">
              <div className=" overflow-y-scroll normal-scrollbar flex items-center justify-center">
                <img
                  src={modalImage}
                  alt="Product full view"
                  className="object-contain md:w-[50vw] "
                />
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </div>
  );
};

export default ImageCarousel;
