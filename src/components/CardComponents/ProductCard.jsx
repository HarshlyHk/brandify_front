import React from "react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";
import HeartIcon from "@/assets/images/HEART.png";
import Image from "next/image";

const ProductCard = ({ item, linkPrefix }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <div className="relative group">
      {/* Product Image */}
      <div
        className={`relative overflow-hidden ${
          isMobile
            ? "block w-[175px] h-[175px]"
            : "hidden md:block md:w-[350px] md:h-[350px] w-[180px] h-[180px]"
        }`}
      >
        <Link href={`/${linkPrefix}/${item?._id}`} >
          <Image
            src={item?.images[0]}
            alt={item?.name}
            height={350}
            width={350}
            loading="lazy"
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </Link>
        {item?.isSpecial && (
          <Image
            src={HeartIcon}
            alt="Special"
            title="BEST SELLER"
            className={`absolute top-3 left-1 ${isMobile ? "h-3" : "h-4"} ml-2`}
          />
        )}
        {item?.preeBook && (
          <div
            className={`absolute top-2 right-2 font-bold px-2 py-1 text-gray-700 ${
              isMobile ? "text-[9px]" : "text-xs"
            }`}
          >
            <p>PRE-BOOK</p>
          </div>
        )}
      </div>

      {/* Hover Buttons */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
        <AddToCartButton />
        <AddToWishlistButton />
      </div>

      {/* Product Info */}
      <div className="text-start mt-4 mb-6 px-2">
        <h3 className="truncate font-semibold text-[12px] md:text-[16px] md:w-[300px] w-[120px]">
          {item?.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-[11px] md:text-[12px]">₹{item?.discountedPrice}</p>
          <p className="line-through text-[11px] md:text-[12px]">
            ₹{item?.originalPrice}
          </p>
        </div>
        {item?.isSpecial && (
          <p className="text-gray-500 text-[8px] md:hidden">BEST SELLER</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
