"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import Link from "next/link";
import Image from "next/image";

const Lookbooks = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await axiosInstance.get("/lookbooks/get");
        setCarouselData(response.data.data.lookBooks);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };
    fetchCarouselData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12 py-10">
      {carouselData.map((item, index) => (
        <div
          key={index}
          className="relative h-full w-full group overflow-hidden shadow-md"
        >
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={500}
            height={500}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20  transition duration-300"></div>

          <div className="absolute bottom-6 left-6 text-white z-10">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <Link
              href={item.productUrl}
              className="inline-block mt-4 px-[30px] py-[12px] text-[11px] bg-white text-black hover:bg-gray-200 transition tracking-[0.2em] border-[1px] border-transparent"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lookbooks;
