"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/config/axiosInstance";
import { Card, Carousel } from "../ui/bigCarousel";
import { Skeleton } from "../ui/skeleton";
const BigCarousel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get("collabos/get");
        setItems(response.data?.data?.collabos);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex flex-col gap-4 md:px-40">
          <div className="flex flex-col gap-4 md:px-40">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        </div>
      ) : (
        <Carousel
          items={items?.map((card, index) => (
            <Card card={card} index={index} key={index} />
          ))}
        />
      )}
    </div>
  );
};

export default BigCarousel;
