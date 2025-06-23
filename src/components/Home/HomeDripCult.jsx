"use client"
import React, { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import ProductCard from "../CardComponents/ProductCard";
import Link from "next/link";

const HomeDripCult = ({ productLimit = 16 }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [limit, setlimit] = useState(productLimit);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 1024) {
      } else {
        setlimit(16);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [router]);

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `product/get-product-category/featured?limit=${limit}&filter=priority`
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
  }, [limit]);

  return (
    <div>
      <h2 className="text-center mb-4 " id="fix-your-drip">
        FIX YOUR DRIP HERE
      </h2>

      {loading ? (
        <div className="flex flex-wrap justify-center gap-[5px]">
          {Array.from({ length: 12 }).map((_, index) => (
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
      <div className="flex justify-center items-center  mt-8">
        <Link
          href="/all-products/featured"
          onClick={() => window.scrollTo(0, 0)}
          className="flex justify-center items-center w-fit py-[12px] px-[30px] text-[12px] tracking-[0.2em]  bg-black text-white border-transparent border-[1px] "
        >
          VIEW ALL PRODUCTS
        </Link>
      </div>
    </div>
  );
};

export default HomeDripCult;
