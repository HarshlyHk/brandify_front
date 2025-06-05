import React from "react";
import { Skeleton } from "../ui/skeleton";
import FrequentlyBoughtSkeleton from "./FrequentlyBoughtSkeleton";
import ImageCarouselSkeleton from "./ImageCarouselSkeleton";

const ImageGallerySkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 pt-10 px-2 w-full">
      {/* Left Panel Skeleton */}
      <ImageCarouselSkeleton />

      {/* Right Panel Skeleton */}
      <div className="flex-1 space-y-4">
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2 " />

        {/* Frequently Bought Skeleton */}
        <FrequentlyBoughtSkeleton />

        {/* Size Selector Skeleton */}
        <div className="flex gap-2">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="w-[60px] md:w-[80px] h-10 rounded-lg"
              />
            ))}
        </div>

        {/* Actions Skeleton */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ImageGallerySkeleton;
