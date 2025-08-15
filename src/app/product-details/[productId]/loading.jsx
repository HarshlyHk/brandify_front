"use client";
import FrequentlyBoughtSkeleton from "@/components/Skeleton/FrequentlyBoughtSkeleton";
import ImageCarouselSkeleton from "@/components/Skeleton/ImageCarouselSkeleton";
import ImageGallerySkeleton from "@/components/Skeleton/ImageGallerySkeleton";
import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <ImageGallerySkeleton />
      <FrequentlyBoughtSkeleton />
      <ImageCarouselSkeleton />
    </div>
  );
}
