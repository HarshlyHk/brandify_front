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
import { createAbandonedCart } from "@/features/abandonedCartSlice";
import MagicCheckoutButton from "@/components/MagicCheckout/MagicCheckout";

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
      <ImageCarousel images={item?.images} loading={loading} />
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
                ₹{item?.discountedPrice}
              </p>
              <p className="line-through text-[1rem] md:text-[1.4rem] opacity-75">
                ₹{item?.originalPrice}
              </p>
            </div>
            {item?.isSpecial && (
              <div className="flex items-center gap-2">
                <p>|</p>
                <p className="text-[0.9rem] md:text-[1rem] font-semibold text-purple-500">
                  BEST SELLER
                </p>
              </div>
            )}
          </div>
          <p className="text-[11px] md:text-[12px] mt-2 text-gray-500">
            Shipping Calculated at Checkout
          </p>
        </div>

        {/* {item?.preeBook && (
          <div className="text-gray-700 text-sm w-fit font-semibold px-2 py-1 mt-4 mb-2 bg-gray-200 rounded-[2px]">
            PREBOOK NOW
          </div>
        )} */}

        <div className=" hidden md:block">
          {item?.preeBook && (
            <div className="top-2 text-xs text-start font-semibold py-2 text-gray-700">
              <p>* THIS ITEM IS LIMITED TO 50 PIECES ONLY. *</p>
            </div>
          )}
        </div>

        <div className="">
          {item?.preeBook && (
            <div className="top-2 text-[10px] text-start font-semibold py-2 text-gray-700">
              <p>PREBOOKING ITEMS ARE AVAILABLE FOR PREPAID PURCHASES ONLY.</p>
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
                    : item?.preeBook
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
        )}

        {/* Product Short Description */}
        <div className="mt-4 ">{renderContent(item?.shortDescription)}</div>
      </div>

      {/* Size Chart Modal */}
      <Dialog open={openSizeChart} onOpenChange={setOpenSizeChart}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[40vw]  w-full bg-[#000000] text-white">
          <DialogHeader>
            <DialogTitle className="text-center"></DialogTitle>
          </DialogHeader>
          <img
            src={SizeChartImg}
            alt="Size Chart"
            className="w-full h-auto object-cover"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
