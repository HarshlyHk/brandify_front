import React, { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import { Skeleton } from "../ui/skeleton";
import { Link, useParams } from "react-router";
import ProductCard from "../CardComponents/ProductCard";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { category } = useParams();
  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `product/get-product-category/${category}?limit=100&filter=priority`,
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
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    getProduct();
  }, [category]);

  return (
    <div className="prodcut-padding relative">
      {/* Breadcrumb Navigation */}
      {/* <div className="flex gap-2 absolute top-0 left-4 mt-6 mb-2 px-2">
        <Link
          to="/shop-all"
          className="text-[12px] tracking-wide transition-all duration-500 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-500 uppercase cursor-pointer"
        >
          Home
        </Link>
        <span className="text-sm text-gray-500">/</span>
        <Link
          to={`#`}
          className="text-[12px] tracking-wide transition-all duration-500 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-500 uppercase cursor-pointer"
        >
          {category === "oversized-tees" && "OVERSIZED TEES"}
          {category === "bottoms" && "BOTTOMS"}
          {category === "vest" && "VEST"}
          {category === "hoodies" && "HOODIES"}
          {category === "featured" && "FIX YOUR DRIP HERE"}
          {category === "all-products" && "ALL PRODUCTS"}
          {category === "dripcult" && "DRIPCULT CERTIFIED HEAT"}
          {category === "blanks" && "BLANKS"}
          {category === "fear-no-one" && "FEAR NO ONE"}
        </Link>
      </div> */}
      <h2 className="text-center mb-4 mt-10 ">
        {category === "oversized-tees" && "OVERSIZED TEES"}
        {category === "bottoms" && "BOTTOMS"}
        {category === "vest" && "VEST"}
        {category === "hoodies" && "HOODIES"}
        {category === "featured" && "FIX YOUR DRIP HERE"}
        {category === "all-products" && "ALL PRODUCTS"}
        {category === "dripcult" && "DRIPCULT CERTIFIED HEAT"}
        {category === "blanks" && "BLANKS"}
        {category === "fear-no-one" && "FEAR NO ONE"}
        {category === "catalog_1" && "THE HEAT LIST"}
        {category === "all" && "THE HEAT LIST"}
      </h2>

      <p className="text-center text-[14px] md:text-[14px]   mb-10 px-4">
        {category === "dripcult" && "RARE PIECES ATTRACT RARE PERSONALITIES."}
      </p>

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

      <div className=" uppercase text-[12px] px-4 text-center my-10">
        We’ve dropped the heat, <br /> now it’s your turn to catch up.
      </div>
    </div>
  );
};

export default AllProducts;
