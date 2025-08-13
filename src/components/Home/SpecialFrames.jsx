"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialFrames } from "@/features/specialFramesSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const SpecialFrames = () => {
  const dispatch = useDispatch();
  const { specialFrames, loading } = useSelector(
    (state) => state.specialFrames
  );

  useEffect(() => {
    dispatch(fetchSpecialFrames());
  }, [dispatch]);

  return (
    <div className="special-frames-container">
      <h2 className="text-center">NO NOISE, JUST DRIP</h2>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        spaceBetween={0}
        style={{ paddingLeft: 0, paddingRight: 0 }}
        className=" special-frames-swiper "
      >
        {specialFrames.map((frame) => (
          <SwiperSlide key={frame._id}>
            <div
              className="block"
              style={{ aspectRatio: "5 / 7", position: "relative" }}
            >
              <Image
                src={frame.imageUrl}
                alt={frame.title || "Special Frame"}
                fill
                style={{ objectFit: "cover" }}
                // sizes="(max-width: 768px) 100vw, 1080px"
                priority
                quality={90} // <-- Add this line
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SpecialFrames;
