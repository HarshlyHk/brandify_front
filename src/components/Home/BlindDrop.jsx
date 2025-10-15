"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const formatIndianPrice = (price) => {
  if (typeof price !== "number") price = Number(price);
  return price.toLocaleString("en-IN");
};

// Add mapping for specific product IDs to the 4 custom thumbnails
const customThumbnails = {
  "68ee8add695367824282da94": // Gray Basic Bottoms
    "https://pub-047aa9653e2346718393f69be234faf1.r2.dev/IMG_1350_3_11zon.webp",
  "68ee8ace695367824282d619": // Luxe Bottoms
    "https://pub-047aa9653e2346718393f69be234faf1.r2.dev/IMG_1323.WEBP",
  "68ee8aab695367824282d2df": // Apex God
    "https://pub-047aa9653e2346718393f69be234faf1.r2.dev/IMG_1321_5_11zon.webp",
  "68ee8a43695367824282babc": // Hply Flex
    "https://pub-047aa9653e2346718393f69be234faf1.r2.dev/IMG_1327_7_11zon.webp",
};

const BlindDrop = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [timer, setTimer] = useState("");
  const [limit, setLimit] = useState(8);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const router = useRouter();

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `product/get-product-category/reign?limit=${limit}&sort=relevance`
      );
      setData(data.data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [limit]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center md:mt-10">
        <h2 className="text-center text-xl md:text-3xl font-bold">
          ‘ COLD REIGN ’
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-wrap justify-center gap-[5px]">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="w-[350px] h-[350px]">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[5px] gap-y-[30px] md:gap-y-[30px]">
          {data &&
            data.map((item) => (
              <ProductCard
                item={item}
                linkPrefix={item?.name?.replace(/[\s–]+/g, "-")}
                key={item?._id}
              />
            ))}
        </div>
      )}
      <div className="flex justify-center items-center mt-8 md:gap-1 flex-col md:flex-row">
        <p className="text-center text-[14px] md:text-base font-semibold text-gray-600 ">
          RARE PIECES, SLASHED PRICES, NO RESTOCK,
        </p>
        <p className="text-center text-[14px] md:text-base font-semibold text-gray-600 ">
          NO SECOND CHANCE.
        </p>
      </div>
    </div>
  );
};

export default BlindDrop;

const ProductCard = ({ item, linkPrefix }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const productUrl = `/product-details/${item?._id}?name=${linkPrefix}`;

  // helper to pick custom thumbnail if mapping exists
  const getThumbnail = () => {
    if (!item) return "";
    const id = item?._id;
    if (id && customThumbnails[id]) return customThumbnails[id];
    // fallback to the first API thumbnail (if available)
    return item?.thumbnails && item.thumbnails.length ? item.thumbnails[0] : "";
  };

  return (
    <div className="relative group transition-all duration-500 product-card cursor-default">
      {/* Product Image with Link */}
      <Link
        href={productUrl}
        className="w-full block relative overflow-hidden"
        // enforce 5:7 aspect ratio: height = width * 7/5 => padding-top: 140%
        style={{ paddingTop: "140%" }}
      >
        <img
          src={getThumbnail()}
          alt={item?.name}
          loading="lazy"
          // absolutely position the image to fill the padded container and maintain cover
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-800 ease-out"
        />
      </Link>

      {/* Hover Buttons */}
      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Product Info */}
      <div className="text-start mt-4 px-1">
        {/* Name Clickable */}
        <Link
          href={productUrl}
          className="font-semibold text-[12px] md:text-[14px] lg:text-[16px] truncate block hover:underline"
        >
          {item?.name}
        </Link>

        <div className="flex items-center gap-2 mt-1">
          <p className="text-[11px] md:text-[13px] font-medium text-red-500 ">
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
