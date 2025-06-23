"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AddToCartButton from "../CardComponents/AddToCartButton";
import AddToWishlistButton from "../CardComponents/AddToWishlistButton";

const RelatedProducts = ({ item, linkPrefix }) => {
  useEffect(() => {
    // Dynamically preload the first image
    if (item?.images?.[0]) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = item.images[0];
      document.head.appendChild(link);
    }
  }, [item]);

  return (
    <Link
      href={`/${linkPrefix}/${item?._id}`}
      key={item?._id}
      className="relative group"
    >
      <div className="md:w-[250px] md:h-[250px] w-[180px] h-[180px] relative overflow-hidden">
        {/* First Image (Default) */}
        <motion.img
          src={item?.images[0]}
          alt={item?.name}
          height={350}
          width={350}
          className="w-full h-full object-cover absolute transition-opacity duration-500 group-hover:opacity-0"
        />
        {/* Second Image (On Hover) */}
        <motion.img
          src={item?.images[1]}
          alt={item?.name}
          height={350}
          width={350}
          className="w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      {/* Buttons (Visible on Hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
        <AddToCartButton />
        <AddToWishlistButton />
      </div>

      {/* Product Info */}
      <div className="text-start mt-4 mb-6 px-2">
        <h3 className="text-lg font-semibold text-[12px] md:text-[16px] md:w-[200px] w-[120px] truncate">
          {item?.name}
        </h3>
        <div className="flex justify-start items-center gap-2">
          <p className="md:text-[12px] text-[11px] ">
            ₹{item?.discountedPrice}
          </p>
          <p className="line-through md:text-[12px] text-[11px]">
            ₹{item?.originalPrice}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RelatedProducts;
