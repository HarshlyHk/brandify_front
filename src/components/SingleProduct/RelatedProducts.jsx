import React from "react";
import Link from "next/link";
import { formatIndianPrice } from "@/utils/formatPrice";
import Image from "next/image";
const RelatedProducts = ({ item, linkPrefix }) => {
  return (
    <div className="relative group transition-all duration-500 product-card cursor-default">
      {/* Product Image with Link */}
      <Link
        href={`/product-details/${item?._id}?name=${linkPrefix}`}
        className="w-full aspect-square block relative overflow-hidden"
      >
        <Image
          src={item?.images[0]}
          fill
          quality={75}
          alt={item?.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </Link>

      {/* Hover Buttons */}
      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

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
            ₹{formatIndianPrice(item?.discountedPrice)}
          </p>
          <p className="line-through text-[10px] md:text-[12px] text-gray-500">
            ₹{formatIndianPrice(item?.originalPrice)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
