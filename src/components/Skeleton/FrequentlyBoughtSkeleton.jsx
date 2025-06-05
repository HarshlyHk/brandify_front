import React from "react";
import { Skeleton } from "../ui/skeleton";

const FrequentlyBoughtSkeleton = () => {
  return (
    <div className="w-ful pt-4 rounded-lg space-y-3">
      <Skeleton className="h-6 w-1/2" />
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg"
          >
            <Skeleton className="w-20 h-20" />
            <div className="flex-1 px-2">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="w-20 h-8 rounded-lg" />
          </div>
        ))}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
};

export default FrequentlyBoughtSkeleton;