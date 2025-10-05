"use client";
import React, { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";
import FrequentlyBought from "./FrequentlyBought";
import { Skeleton } from "../ui/skeleton";
import FrequentlyBoughtSkeleton from "../Skeleton/FrequentlyBoughtSkeleton";
import ImageGallerySkeleton from "../Skeleton/ImageGallerySkeleton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cartSlice";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SizeChartImg from "@/assets/images/size-chart.jpg";
import MagicCheckoutButton from "@/components/MagicCheckout/MagicCheckout";
import { BiSolidOffer } from "react-icons/bi";
import { formatIndianPrice } from "@/utils/formatPrice";
import { FaTruck } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";

const ImageGallery = ({ item, loading, frequentlyBought }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [openSizeChart, setOpenSizeChart] = useState(false);
  const router = useRouter();
  const { addresses } = useSelector((state) => state.address);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window != undefined) {
      window.scrollTo(0, 0);
    }
    setSelectedSize(null);
  }, [item]);

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart({ productId: item?._id, size: selectedSize }));
    } else {
      const cart =
        (typeof window !== "undefined" &&
          JSON.parse(localStorage.getItem("cart"))) ||
        [];
      const existingItemIndex = cart.findIndex(
        (cartItem) =>
          cartItem.productId === item?._id && cartItem.size === selectedSize
      );

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        const newItem = {
          productId: item?._id,
          size: selectedSize,
          name: item?.name,
          discountedPrice: item?.discountedPrice,
          originalPrice: item?.originalPrice,
          images: item?.images,
          quantity: 1,
        };
        cart.push(newItem);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }

    // 📌 Facebook Pixel Event: AddToCart
    window.fbq &&
      window.fbq("track", "AddToCart", {
        content_name: item?.name,
        content_ids: [item?._id],
        content_type: "product",
        value: item?.discountedPrice,
        currency: "INR",
      });

    router.push("/cart");
  };

  const handleProceedToCheckout = () => {
    const referralCode =
      typeof window !== "undefined" && localStorage.getItem("referralCode");
    if (window.fbq && referralCode) {
      window.fbq("track", "InitiateCheckout", {
        content_name: item?.name,
        content_ids: [item?._id],
        content_type: "product",
        value: item?.discountedPrice,
        currency: "INR",
      });
    }
  };

  useEffect(() => {
    if (item && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_ids: [item?._id],
        content_name: item?.name,
        content_type: "product",
        value: item?.discountedPrice,
        currency: "INR",
      });
    }
  }, [item]);

  if (loading) {
    return <ImageGallerySkeleton />;
  }

  const renderContent = (text) => {
    const formatted = (text || "").replace(/\r\n/g, "<br/>");
    return (
      <div className="mt-6 leading-relaxed text-sm">{parse(formatted)}</div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 pt-0 px-2 w-full">
      {/* Left Panel */}
      <div className=" md:hidden block">
        {item?.preeBook && (
          <div className="top-2 text-xs text-center font-semibold px-2 py-1 text-gray-700">
            <p>* THIS ITEM IS LIMITED TO 50 PIECES ONLY. * </p>
          </div>
        )}
      </div>
      <ImageCarousel
        item={item}
        selectedSize={selectedSize}
        images={item?.images}
        loading={loading}
      />
      {/* Right Panel */}
      <div className="flex-1 px-4 md:px-10">
        <div>
          <h1 className="text-[1.3rem] md:text-[1.6rem] font-bold uppercase flex items-center gap-2">
            {item?.name}
          </h1>
          <div>
            <p className="text-[0.8rem] md:text-[0.9rem] font-semibold text-gray-500">
              DRIP STUDIOS
            </p>
          </div>

          <div className="flex gap-2 mt-4 items-center ">
            <div className="flex gap-2 items-center">
              <p className="text-[1rem] md:text-[1.4rem] font-bold">
                ₹{formatIndianPrice(item?.discountedPrice)}
              </p>
              <p className="line-through text-[1rem] md:text-[1.4rem] opacity-75">
                ₹{formatIndianPrice(item?.originalPrice)}
              </p>
            </div>
            {item?.isSpecial && (
              <div className="flex items-center gap-2">
                <p>|</p>
                <p className="text-[0.9rem] md:text-[1rem] font-semibold text-gray-500">
                  BEST SELLER
                </p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <p>|</p>
              <p className="text-[0.9rem] md:text-[1rem] font-semibold text-red-500">
                ON SALE
              </p>
            </div>
          </div>
          <p className="text-[11px] md:text-[12px] mt-2 text-gray-500">
            Shipping Calculated at Checkout
          </p>
        </div>
        <div className=" hidden md:block">
          {item?.preBook && !item?.category?.includes("blind-drop") && (
            <div className="top-2 text-xs text-start font-semibold py-2 text-gray-700">
              <p>* THIS ITEM IS LIMITED TO 50 PIECES ONLY. *</p>
            </div>
          )}
        </div>

        <div className="">
          {item?.preeBook && !item?.category?.includes("blind-drop") && (
            <div className="top-2 text-[10px] text-start font-semibold py-2 text-gray-700 uppercase">
              <p>PREBOOKING ITEMS ARE AVAILABLE FOR PREPAID PURCHASES ONLY.</p>
              <p>prebooked items will be delivered within 7 working days.</p>
            </div>
          )}
        </div>

        <div className=" hidden md:block">
          {item?.preeBook && (
            <div className="top-2 text-xs text-start font-semibold py-2 text-gray-700">
              <p>* THIS ITEM IS LIMITED TO 50 PIECES ONLY. *</p>
            </div>
          )}
        </div>

        {/* Frequently Bought */}
        <div>
          <FrequentlyBought frequentlyBought={frequentlyBought} />
        </div>

        {!item?.outOfStock && (
          <div>
            <button
              className="text-[0.9rem]  md:text-[1rem] mt-8 underline underline-offset-4"
              onClick={() => setOpenSizeChart(true)}
            >
              Size Chart
            </button>
          </div>
        )}

        {/* Size Selector */}
        {!item?.outOfStock && (
          <div>
            <p className="text-[0.9rem] md:text-[1rem] mt-4">Select Size</p>
            {item?.sizeVariations?.map((size, index) => (
              <button
                name="size-button"
                key={index}
                disabled={size?.stock == 0}
                onClick={() => setSelectedSize(size.size)}
                className={`${
                  selectedSize === size?.size
                    ? "bg-black text-white border-black"
                    : " border-gray-300"
                } rounded-[5px] w-[60px] md:w-[80px] py-[12px] md:py-[8px] m-1 border-[1px] text-gray-500  text-[11px] md:text-[13px] hover:ring-2 transition-all duration-300 ${
                  size?.stock == 0
                    ? "opacity-50 cursor-not-allowed line-through"
                    : ""
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>
        )}

        {/* Actions  outOfStock*/}

        {item?.outOfStock ? (
          <div className="flex gap-4 mt-4 justify-center">
            <p className="text-red-500 text-[0.9rem] md:text-[1rem] uppercase ">
              This Item is Out of Stock
            </p>
          </div>
        ) : (
          <>
            {item?.specialSale == true && (
              <div className="text-purple-700 md:hidden text-[8px] sm:text-[10px] w-fit font-semibold px-2 py-2 mt-4 bg-[#f1e2f6] rounded-[5px] flex items-center gap-2">
                <BiSolidOffer className=" text-sm" />{" "}
                {item?.specialSaleDiscount}% SEPCIAL OFF ON THIS ITEM
              </div>
            )}
            <div className="flex items-center gap-2 md:mt-4">
              {item?.specialSale == true && (
                <div className="text-purple-700 hidden md:flex text-[9px] sm:text-[10px] w-fit font-semibold px-2 py-2 mt-4 mb-2 bg-[#f1e2f6] rounded-[5px] items-center gap-2">
                  <BiSolidOffer className=" text-sm" />{" "}
                  {item?.specialSaleDiscount}% SEPCIAL OFF ON THIS ITEM
                </div>
              )}
              <div className="text-green-700 text-[8px] sm:text-[10px] w-fit font-semibold px-2 py-2 mt-4 mb-2 bg-[#e2f6e2] rounded-[5px] flex items-center gap-2">
                <BiSolidOffer className=" text-sm" /> 10% OFF ON ORDERS ABOVE
                ₹1199
              </div>
              <div className="text-green-700 text-[8px] sm:text-[10px] w-fit font-semibold px-2 py-2 mt-4 mb-2 bg-[#e2f6e2] rounded-[5px] flex items-center gap-2">
                <BiSolidOffer className=" text-sm" /> 5% OFF ON ORDERS BELOW
                ₹1199
              </div>
              {item?.isFastDelivery == true && (
                <div className="text-purple-700 flex text-[9px] sm:text-[10px] w-fit font-semibold px-2 py-2 mt-4 mb-2 bg-[#f1e2f6] rounded-[5px] items-center gap-2">
                  <FaTruck className=" text-sm" />{" "}
                  SAME DAY DISPATCH
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-4">
              <button
                onClick={handleAddToCart}
                type="button"
                name="add-to-cart-button"
                className="rounded-md border-1 border-black px-4 py-5 text-xs md:py-5 w-full"
                disabled={!selectedSize}
                style={{
                  opacity: selectedSize ? 1 : 0.5,
                  cursor: selectedSize ? "pointer" : "not-allowed",
                }}
              >
                ADD TO CART
              </button>

              <div
                onClick={() => {
                  handleProceedToCheckout();
                }}
                className="w-full"
              >
                <MagicCheckoutButton
                  checkoutItem={{
                    _id: item?._id,
                    size: selectedSize,
                  }}
                  user={user}
                  disabled={!selectedSize}
                  buttonName={
                    !selectedSize
                      ? "SELECT SIZE TO BUY"
                      : item?.preBook && !item?.category?.includes("blind-drop")
                      ? "PREBOOK NOW"
                      : "BUY NOW"
                  }
                  type="Instant"
                  className={`text-white rounded-md px-4 py-5 md:py-5 text-xs w-full border-1 border-black bg-black ${
                    !selectedSize ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>
          </>
        )}
        {/* Services */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {/* Razorpay */}
          <div className="flex items-center justify-center gap-1 bg-gradient-to-t from-[#e3e3e3] to-[#f1f1f1] rounded-[5px] w-[70px] md:w-[85px] h-[55px]">
            <SiRazorpay className="text-gray-600" />
            <span className="font-semibold tracking-wider text-[8px] md:text-[10px] italic font-helvetica">
              Razorpay
            </span>
          </div>

          {/* Cash on Delivery */}
          <div className="flex items-center justify-center gap-2 bg-gradient-to-t from-[#e3e3e3] to-[#f1f1f1] border rounded-[5px] w-[70px] md:w-[85px] h-[55px]">
            <span className="font-semibold uppercase italic font-helvetica text-center text-[8px] md:text-[10px] tracking-wider">
              Cash on Delivery
            </span>
          </div>

          {/* Fast Shipping */}
          <div className="flex flex-col items-center justify-center gap-1 bg-gradient-to-t from-[#e3e3e3] to-[#f1f1f1] border rounded-[5px] w-[70px] md:w-[85px] h-[55px]">
            <FaTruck className="text-gray-700 text-lg" />
            <span className="font-semibold uppercase italic font-helvetica text-center text-[8px] md:text-[10px] tracking-wider">
              Fast <br /> Shipping
            </span>
          </div>

          {/* 100% Quality Guarantee */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-t from-[#e3e3e3] to-[#f1f1f1] border rounded-[5px] w-[70px] md:w-[85px] h-[55px] overflow-hidden">
            <img
              src="https://pub-047aa9653e2346718393f69be234faf1.r2.dev/100%25%20guarantee-imprv.jpg"
              alt="100% Quality Guarantee"
              className="h-[90px] "
            />
          </div>
        </div>
        {/* Product Short Description */}
        <div className="mt-4 ">{renderContent(item?.shortDescription)}</div>
      </div>

      {/* Size Chart Modal */}
      <Dialog open={openSizeChart} onOpenChange={setOpenSizeChart}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[40vw]  w-full bg-[white] text-black">
          <DialogHeader>
            <DialogTitle className="text-center"></DialogTitle>
          </DialogHeader>
          <img
            src="https://pub-047aa9653e2346718393f69be234faf1.r2.dev/newsie.JPG"
            alt="Size Chart"
            className="w-full h-auto object-cover"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
