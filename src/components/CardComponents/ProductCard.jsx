"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import HeartIcon from "@/assets/images/HEART.png";

const ProductCard = ({ item, linkPrefix }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative group transition-all duration-500 product-card cursor-default">
      {/* Product Image with Link */}
      <Link
        href={`/product-details/${item?._id}?name=${linkPrefix}`}
        className="w-full aspect-square block relative overflow-hidden"
      >
        <img
          src={item?.thumbnails[0]}
          alt={item?.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {item?.isSpecial && (
          <img
            src={HeartIcon.src}
            alt="Special"
            title="BEST SELLER"
            className="absolute top-2 left-2 h-4"
          />
        )}
        {item?.preeBook && (
          <div className="absolute top-2 right-2 text-[10px] font-bold px-2 py-1 text-gray-700 bg-white/80 rounded">
            <p>PRE-BOOK</p>
          </div>
        )}
      </Link>

      {/* Hover Buttons */}
      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    
      </div>

      {/* Product Info */}
      <div className="text-start mt-4 px-1">
        {/* Name Clickable */}
        <Link
          href={`/${linkPrefix}/${item?._id}`}
          className="font-semibold text-[12px] md:text-[14px] lg:text-[16px] truncate block hover:underline"
        >
          {item?.name}
        </Link>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-[11px] md:text-[13px] font-medium text-black">
            ₹{item?.discountedPrice}
          </p>
          <p className="line-through text-[10px] md:text-[12px] text-gray-500">
            ₹{item?.originalPrice}
          </p>
        </div>

        <div className="flex items-center gap-1 mt-1 md:hidden">
          {item?.isSpecial && (
            <p className="text-[8px] text-gray-500 ">BEST SELLER</p>
          )}

          {item?.isSpecial && item?.specialSale && (
            <p className="text-[8px] text-gray-500 ">-</p>
          )}

          {item?.specialSale && (
            <p className="text-[8px] text-gray-500 ">
              <span className=" text-red-500 font-bold">
                {item?.specialSaleDiscount}% SALE
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
