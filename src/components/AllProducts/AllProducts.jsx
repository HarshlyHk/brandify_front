"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import { Skeleton } from "../ui/skeleton";
import ProductCard from "../CardComponents/ProductCard";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductFilters from "./ProductFilters";
import SortSelector from "./SortSelector";
import { FaFilter } from "react-icons/fa";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { category } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Local filter state
  const [filters, setFilters] = useState({
    price: searchParams.get("price") || "",
    inStock: searchParams.get("inStock") === "true",
    size: searchParams.get("size") || "",
    color: searchParams.get("color") || "",
    sort: searchParams.get("sort") || "relevance",
  });

  // Update local filter state when URL changes (for back/forward navigation)
  useEffect(() => {
    setFilters({
      price: searchParams.get("price") || "",
      inStock: searchParams.get("inStock") === "true",
      size: searchParams.get("size") || "",
      color: searchParams.get("color") || "",
      sort: searchParams.get("sort") || "relevance",
    });
  }, [category, searchParams.toString()]);
  const getProduct = async () => {
    setLoading(true);
    try {
      const paramsObj = Object.fromEntries(searchParams.entries());

      let query = `product/get-product-category/${category}?limit=100&sort=${
        paramsObj.sort || "relevance"
      }`;
      if (paramsObj.price)
        query += `&price=${encodeURIComponent(paramsObj.price)}`;
      if (paramsObj.inStock === "true") query += `&inStock=true`;
      if (paramsObj.size)
        query += `&size=${encodeURIComponent(paramsObj.size)}`;
      if (paramsObj.color)
        query += `&color=${encodeURIComponent(paramsObj.color)}`;
      query += `&_=${Date.now()}`;

      const { data } = await axiosInstance.get(query);
      if (data?.data?.products) {
        setData(data.data.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Only fetch when category or searchParams change (not on filter change)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    getProduct();
  }, [category, searchParams.toString()]);

  // Handler for Apply Filters button
  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (filters.price) params.set("price", filters.price);
    if (filters.inStock) params.set("inStock", "true");
    if (filters.size) params.set("size", filters.size);
    if (filters.color) params.set("color", filters.color);
    if (filters.sort) params.set("sort", filters.sort);

    router.replace(`/all-products/${category}?${params.toString()}`);
    // getProduct will be triggered by useEffect above
  };

  return (
    <div className="prodcut-padding-2 relative">
      {/* Filter Button and Sheet */}
      <div className="flex justify-end mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              aria-label="Filter"
            >
              <FaFilter />
              Filter
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="max-w-xs w-full">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Refine your search by selecting filters below.
              </SheetDescription>
            </SheetHeader>
            <ProductFilters
              category={category}
              filters={filters}
              resultCount={data?.length}
              setFilters={setFilters}
            />
            <SheetFooter>
              <SheetClose asChild>
                <button
                  className="mt-4 w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

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
        {category === "steal-the-drip" && "FESTIVE SALE - UPTO 50% OFF"}
        {category === "blind-drop" && "‘ PROJECT UNSEEN ’"}
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
        <>
          {/* Sort by  */}
          <SortSelector category={category} />

          {data.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters or search criteria
              </p>
            </div>
          ) : (
            <div
              key={filters.sort}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[5px] gap-y-[10px] md:gap-y-[30px]"
            >
              {data.map((item) => (
                <ProductCard
                  id={item?._id}
                  imageUrl={item?.images[0]}
                  secondImageUrl={item?.images[1]}
                  title={item?.title}
                  price={item?.price}
                  name={item?.name?.replace(/[\s–]+/g, "-")}
                  key={item?._id + filters.sort}
                  item={item}
                />
              ))}
            </div>
          )}
        </>
      )}

      <div className=" uppercase text-[12px] px-4 text-center my-10">
        We’ve dropped the heat, <br /> now it’s your turn to catch up.
      </div>
    </div>
  );
};

export default AllProducts;
