import FrequentlyBoughtSkeleton from "@/components/Skeleton/FrequentlyBoughtSkeleton";
import ImageCarouselSkeleton from "@/components/Skeleton/ImageCarouselSkeleton";
import ImageGallerySkeleton from "@/components/Skeleton/ImageGallerySkeleton";

export default function Loading() {
  window.scrollTo(0, 0); // Scroll to top on loading
  return (
    <div className="">
      <ImageGallerySkeleton />
      <FrequentlyBoughtSkeleton />
      <ImageCarouselSkeleton />
    </div>
  );
}
