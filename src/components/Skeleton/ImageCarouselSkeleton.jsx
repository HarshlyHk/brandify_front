import React from "react";
import { Skeleton } from "../ui/skeleton";

const ImageCarouselSkeleton = () => {
  return (
    <div className="flex md:flex-row flex-col gap-10">
      {/* Main Image Skeleton */}
      <div className="w-full md:w-[600px] h-[400px] md:h-[600px] overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Mobile Pagination Skeleton */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <Skeleton key={idx} className="w-3 h-3 rounded-full" />
          ))}
      </div>

      {/* Desktop Thumbnails Skeleton */}
      <div className="hidden md:flex md:flex-col justify-start gap-2">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <Skeleton key={idx} className="w-32 h-32" />
          ))}
      </div>
    </div>
  );
};

export default ImageCarouselSkeleton;