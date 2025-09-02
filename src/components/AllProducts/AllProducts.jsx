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
import { VscSettings } from "react-icons/vsc";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [data, setData] = useState(null);
  const { category } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Local filter state
  const [filters, setFilters] = useState({
    minPrice: searchParams.get("price")?.split("-")[0] || "",
    maxPrice: searchParams.get("price")?.split("-")[1] || "",
    inStock: searchParams.get("inStock") === "true",
    size: searchParams.get("size") || "",
    color: searchParams.get("color") || "",
    sort: searchParams.get("sort") || "relevance",
  });

  // Pagination states
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Update local filter state when URL changes (for back/forward navigation)
  useEffect(() => {
    setFilters({
      minPrice: searchParams.get("price")?.split("-")[0] || "",
      maxPrice: searchParams.get("price")?.split("-")[1] || "",
      inStock: searchParams.get("inStock") === "true",
      size: searchParams.get("size") || "",
      color: searchParams.get("color") || "",
      sort: searchParams.get("sort") || "relevance",
    });
  }, [category, searchParams.toString()]);

  const getProduct = async (reset = true, pageNum = 1) => {
    if (reset) setLoading(true);
    try {
      const paramsObj = Object.fromEntries(searchParams.entries());
      let query = `product/get-product-category/${category}?limit=12&page=${pageNum}&sort=${
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
        if (reset) {
          setData(data.data.products);
        } else {
          setData((prev) => [...(prev || []), ...data.data.products]);
        }
        setTotalProducts(data?.data?.pagination?.totalProducts);
        setTotalPages(data?.data?.pagination?.totalPages || 1);
        setHasMore(
          (data?.data?.pagination?.currentPage || pageNum) <
            (data?.data?.pagination?.totalPages || 1)
        );
        setPage(data?.data?.pagination?.currentPage || pageNum);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (reset) setLoading(false);
      setIsPaginating(false);
    }
  };

  // Only fetch when category or searchParams change (not on filter change)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    setPage(1);
    setHasMore(true);
    setTotalPages(1);
    getProduct(true, 1);
  }, [category, searchParams.toString()]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (loading || isPaginating || !hasMore) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setIsPaginating(true);
        const nextPage = page + 1;
        getProduct(false, nextPage);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, isPaginating, hasMore, page, category, searchParams.toString()]);

  // Handler for Apply Filters button
  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (filters.minPrice || filters.maxPrice) {
      const min = filters.minPrice || 0;
      const max = filters.maxPrice || 2500;
      params.set("price", `${min}-${max}`);
    }
    if (filters.inStock) params.set("inStock", "true");
    if (filters.size) params.set("size", filters.size);
    if (filters.color) params.set("color", filters.color);
    if (filters.sort) params.set("sort", filters.sort);

    router.replace(`/all-products/${category}?${params.toString()}`);
    // getProduct will be triggered by useEffect above
  };

  // Handler for Reset Filters button
  const handleResetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      inStock: false,
      size: "",
      color: "",
      sort: "relevance",
    });
    router.replace(`/all-products/${category}?sort=relevance`);
    // getProduct will be triggered by useEffect above
  };

  return (
    <div className="prodcut-padding-2 relative">
      {/* Filter Button and Sheet */}

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
        {category === "steal-the-drip" && "SEASON CLOSURE - 50% OFF"}
        {category === "blind-drop" && "‘ PROJECT UNSEEN ’"}
      </h2>

      <p className="text-center text-[14px] md:text-[14px]   mb-10 px-4">
        {category === "dripcult" && "RARE PIECES ATTRACT RARE PERSONALITIES."}
      </p>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[5px] gap-y-[10px] md:gap-y-[30px]">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="w-full aspect-square">
              <Skeleton className="w-full h-full" />
              <div className="mt-4 px-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2 mb-1" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Sort by  */}
          <div className="flex items-center gap-4 justify-between mb-4">
            <div className=" hidden md:block w-full">
              <p className=" text-gray-700 w-full">
                {data ? `${totalProducts} Products` : "No products found"}
              </p>
            </div>
            <div className="flex items-center justify-between w-full md:justify-end gap-4">
              <div className="flex justify-end ">
                <Sheet>
                  <SheetTrigger asChild>
                    <button
                      className="text-sm md:text-base tracking-wider text-black flex items-center gap-2 "
                      aria-label="Filter"
                    >
                      <VscSettings />
                      Filter
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-screen overflow-scroll md:w-full text-black"
                  >
                    <SheetHeader>
                      <SheetTitle>
                        {category.replace(/-/g, " ").toUpperCase()}
                      </SheetTitle>
                      <SheetDescription>
                        Refine your search by selecting filters below.
                      </SheetDescription>
                    </SheetHeader>
                    <ProductFilters
                      category={category}
                      filters={filters}
                      resultCount={totalProducts}
                      setFilters={setFilters}
                    />
                    <SheetFooter>
                      <SheetClose asChild>
                        <button
                          className="flex justify-center items-center w-full py-[12px] px-[30px] text-[12px] tracking-[0.2em] uppercase bg-black text-white border-transparent border-[1px] "
                          onClick={handleApplyFilters}
                        >
                          Apply Filters
                        </button>
                      </SheetClose>
                      {/* Reset Filters Button */}
                      <SheetClose asChild>
                        <button
                          className="flex justify-center items-center w-full py-[12px] px-[30px] text-[12px] tracking-[0.2em] uppercase bg-white text-black border border-gray-300"
                          onClick={handleResetFilters}
                        >
                          Reset Filters
                        </button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="text-gray-400 hidden md:block border-l border-gray-300 h-6"></div>
              <SortSelector category={category} />
            </div>
          </div>

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
              {isPaginating && (
                <div className="col-span-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[5px] gap-y-[10px] md:gap-y-[30px] py-8">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="w-full aspect-square">
                      <Skeleton className="w-full h-full" />
                      <div className="mt-4 px-1">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2 mb-1" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
