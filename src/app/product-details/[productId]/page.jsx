// app/product/[productId]/page.tsx

import React, { Suspense } from "react";
import ImageGallery from "@/components/SingleProduct/ImageGallery";
import ProductTabs from "@/components/SingleProduct/ProductTabs";
import RelatedProducts from "@/components/SingleProduct/RelatedProducts";
import { Comparison } from "@/components/Home/Comparison";
import Categories from "@/components/Categories/Categories";
import CollaboVideo from "@/components/SingleProduct/CollaboVideo";
import API_URL from "@/config/API_URL";

export async function generateMetadata({ params: asyncParams }) {
    const params = await asyncParams;
    const res = await fetch(
        `${API_URL}product/get-product-all-details/${params.productId}`,
        { next: { revalidate: 6000 } }
    );
    const data = await res.json();
    const product = data.data.product;

    return {
        title: product.name,
        description: product.shortDescription,
        openGraph: {
            title: product.name,
            images: [
                {
                    url: product.thumbnails[0],
                    width: 1200,
                    height: 630,
                    alt: product.name,
                },
            ],
        },
    };
}

const SingleProductPage = async ({ params: asyncParams }) => {
    const params = await asyncParams;
    const productId = params.productId;

    let product = null;
    let relatedProducts = [];
    let frequentlyBought = [];

    try {
        console.log("Loading product details for ID:", productId);
        const response = await fetch(
            `${API_URL}product/get-product-all-details/${productId}`,
            {
                next: { revalidate: 60 },
            }
        );
        const data = await response.json();

        product = data?.data?.product;
        relatedProducts = data?.data?.relatedProducts || [];
        frequentlyBought = data?.data?.frequentlyBoughtTogether || [];
    } catch (error) {
        console.error("Error loading product:", error);
        return (
            <div className="p-10 text-center text-red-600">
                Product not found
            </div>
        );
    }

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
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
                </div>
            </Suspense>
        </>
    );
};

export default SingleProductPage;
