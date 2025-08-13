import FrequentlyBoughtSkeleton from "@/components/Skeleton/FrequentlyBoughtSkeleton";
import ImageCarouselSkeleton from "@/components/Skeleton/ImageCarouselSkeleton";
import ImageGallerySkeleton from "@/components/Skeleton/ImageGallerySkeleton";

export default function Loading() {
  return (
    <div className="p-10 text-center">
      <ImageGallerySkeleton />
      <FrequentlyBoughtSkeleton />
      <ImageCarouselSkeleton />
    </div>
  );
}
