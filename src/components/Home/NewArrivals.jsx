"use client"

import React, { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";


const NewArrivals = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState("");
  const router = useRouter();

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `product/get-product-category/steal-the-drip?limit=60&sort=relevance`
      );
      if (data?.data?.products) {
        setData(data.data.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);


  if (loading) {
    return <Skeleton className="w-full h-[500px] rounded-xl" />;
  }

  return (
    <div className="py-10 px-0 md:px-5 relative">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-center uppercase text-xl md:text-3xl font-bold text-red-500">
          End of Season Steals
        </h2>
      </div>

      <div className="flex overflow-x-scroll gap pl-4 pr-4 pt-4 pb-4 no-scrollbar">
        {data.map((product) => (
          <div
            key={product._id}
            onClick={() => router.push(`/product-details/${product._id}?name=${product?.name}`)}
            className="flex-shrink-0 w-[300px] h-[360px] flex flex-col items-center group relative"
          >
            {product?.specialSale && (
              <div className="absolute top-2 right-2 text-red-500 font-bold text-[10px] px-4 py-2 z-[1]">
                SALE
              </div>
            )}
            {product?.outOfStock && (
              <div className="absolute top-2 left-2 text-black font-bold text-[10px] px-4 py-2 z-[1]">
                OUT OF STOCK
              </div>
            )}
            <div className="relative w-full h-[300px] rounded-xl">
              <img
                src={product?.thumbnails[0]}
                alt={product?.name}
                className="h-full w-full object-cover absolute transition-opacity duration-500"
                loading="lazy"
              />
            </div>

            <p className="text-center text-xs md:text-sm font-semibold uppercase mt-2 text-nowrap">
              {product?.name}
            </p>
            <p className="text-center text-sm font-medium mt-0">
              ₹ {product?.discountedPrice}
            </p>
            <div className="absolute -bottom-4 w-full flex justify-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product?.sizeVariations?.slice(0, 5).map((size, index) => (
                <span
                  key={index}
                  className="bg-gray-300 text-black text-xs w-10 flex items-center justify-center py-1 hover:bg-black hover:text-white transition"
                >
                  {size.size}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-14">
        <Link
          href="/all-products/steal-the-drip"
          scroll={false}
          className="flex justify-center items-center w-fit py-[12px] px-[30px] text-[12px] tracking-[0.2em]  bg-black text-white border-transparent border-[1px] "
          onClick={() => window.scrollTo(0, 0)}
        >
          VIEW ALL PRODUCTS
        </Link>
      </div>
    </div>
  );
};

export default NewArrivals;
