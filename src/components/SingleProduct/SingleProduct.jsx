import axiosInstance from "@/config/axiosInstance";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import ImageGallery from "./ImageGallery";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
import { Skeleton } from "../ui/skeleton";
import { trackPixelEvent } from "@/utils/trackPixelEvent";
import { Comparison } from "../Home/Comparison";
import Categories from "../Categories/Categories";

const SingleProduct = () => {
  const { category, productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [frequentlyBought, setFrequentlyBought] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const getProduct = async () => {
    setLoading(true);
    try {
      const getAllDetails = await axiosInstance.get(
        "product/get-product-all-details/" + productId
      );
      setRelatedProducts(getAllDetails?.data?.data?.relatedProducts);
      setFrequentlyBought(getAllDetails?.data?.data?.frequentlyBoughtTogether);
      setData(getAllDetails?.data?.data?.product);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to the top of the page whenever the component mounts or productId changes
    window.scrollTo(0, 0);
    getProduct();
  }, [productId]);

  useEffect(() => {
    if (data) {
      trackPixelEvent("ViewContent", {
        content_ids: [data?._id],
        content_name: data?.name,
        content_category: category,
        content_type: "product",
        value: data?.discountedPrice,
        currency: "INR",
      });
    }
  }, [data]);


  return (
    <>
      <Categories page="single-product" />

      <div className="md:px-4 md:py-10 py-5">

        <ImageGallery
          item={data}
          loading={loading}
          frequentlyBought={frequentlyBought}
        />
        <ProductTabs
          description={data?.description}
          coreFeatures={data?.coreFeatures}
          careGuide={data?.careGuide}
          reviews={data?.reviews}
          loading={loading}
        />

        <div className=" mb-20">
          {loading ? (
            <div className="flex flex-wrap justify-center gap-[5px]">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="w-[250px] h-[250px]">
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <h2 className="text-center mt-8">YOU MAY ALSO LIKE</h2>
              <div className="flex flex-wrap justify-center gap-[5px]">
                {relatedProducts &&
                  relatedProducts.map((item) => (
                    <RelatedProducts
                      item={item}
                      linkPrefix={item?.name?.replace(/[\s–]+/g, "-")}
                      key={item?._id}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
        <div className="md:px-40 ">
          <Comparison />
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
