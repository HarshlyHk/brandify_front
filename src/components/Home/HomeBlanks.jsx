"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import { Skeleton } from "../ui/skeleton";
import ProductCard from "../CardComponents/ProductCard";
import Link from "next/link";

const HomeBlanks = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        "product/get-product-category/blanks?limit=6&filter=priority"
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
  }, []);

  return (
    <div>
      <h2 className="text-center mb-4">BLANKS COLLECTION</h2>

      {loading ? (
        <div className="flex flex-wrap justify-center gap-[5px]">
          {Array.from({ length: 6 }).map((_, index) => (
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
          href="/all-products/blanks"
          onClick={() => window.scrollTo(0, 0)}
          className="flex justify-center items-center mt-4 py-2 px-4 rounded-md underline underline-offset-4 "
        >
          VIEW ALL
        </Link>
      </div>
    </div>
  );
};

export default HomeBlanks;
