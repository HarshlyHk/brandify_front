// app/product/[productId]/page.tsx

import React from "react";
import axiosInstance from "@/config/axiosInstance";
import ImageGallery from "@/components/SingleProduct/ImageGallery";
import ProductTabs from "@/components/SingleProduct/ProductTabs";
import RelatedProducts from "@/components/SingleProduct/RelatedProducts";
import { Comparison } from "@/components/Home/Comparison";
import Categories from "@/components/Categories/Categories";

export async function generateMetadata({ params }) {
  const res = await axiosInstance.get(
    `product/get-product-all-details/${params.productId}`
  );
  const product = res.data.data.product;

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      images: [product.images[0]],
    },
  };
}

const SingleProductPage = async ({ params, searchParams }) => {
  const productId = params.productId;
  const category = searchParams.category || "default";

  let product = null;
  let relatedProducts = [];
  let frequentlyBought = [];

  try {
    const response = await axiosInstance.get(
      `product/get-product-all-details/${productId}`
    );
    const data = response?.data?.data;

    product = data?.product;
    relatedProducts = data?.relatedProducts || [];
    frequentlyBought = data?.frequentlyBoughtTogether || [];
  } catch (error) {
    console.error("Error loading product:", error);
    return (
      <div className="p-10 text-center text-red-600">Product not found</div>
    );
  }

  return (
    <>
      <Categories page="single-product" />

      <div className="md:px-4 md:py-10 py-5">
        <ImageGallery
          item={product}
          loading={false}
          frequentlyBought={frequentlyBought}
        />

        <ProductTabs
          description={product?.description}
          coreFeatures={product?.coreFeatures}
          careGuide={product?.careGuide}
          reviews={product?.reviews}
          loading={false}
        />

        <div className="prodcut-padding-2 mb-20">
          <h2 className="text-center mt-8">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-[5px] gap-y-[10px] md:gap-y-[30px]">
            {relatedProducts.map((item) => (
              <RelatedProducts
                item={item}
                linkPrefix={item?.name?.replace(/[\s–]+/g, "-")}
                key={item?._id}
              />
            ))}
          </div>
        </div>

        <div className="md:px-40">
          <Comparison />
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
