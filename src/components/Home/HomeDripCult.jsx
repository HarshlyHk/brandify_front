"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import ProductCard from "../CardComponents/ProductCard";

const HomeDripCult = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        "product/get-product-category/featured?limit=12&filter=priority"
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
        <div className="flex flex-wrap justify-center gap-[5px]">
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
      <div>
        <Link
          href="/all-products/featured"
          onClick={() => window.scrollTo(0, 0)}
          className="flex justify-center items-center mt-4 py-2 px-4 rounded-md underline underline-offset-4 "
        >
          VIEW ALL
        </Link>
      </div>
    </div>
  );
};

export default HomeDripCult;
