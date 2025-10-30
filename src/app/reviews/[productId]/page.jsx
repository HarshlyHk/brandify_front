import React from "react";
import ReviewClient from "@/components/Reviews/ReviewClient";
import API_URL from "@/config/API_URL";
export async function generateMetadata({ params }) {
    const res = await fetch(
        `${API_URL}review/${params.productId}?page=1&limit=1&sort=newest`,
        {
            // Cache for 1 day (in seconds)
            next: { revalidate: 86400 }, // 24 * 60 * 60
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch product data");
    }

    const data = await res.json();
    const product = data.product;

    return {
        title: product?.name ? `${product.name} Reviews` : "Product Reviews",
        description: `See reviews for ${product?.name} at Brandify`,
        openGraph: {
            title: product?.name
                ? `${product.name} Reviews`
                : "Product Reviews",
            images: [
                {
                    url: product?.thumbnail,
                    width: 1200,
                    height: 630,
                    alt: product?.name,
                },
            ],
        },
    };
}

const ReviewsPage = () => {
    return (
        <>
            <ReviewClient />
        </>
    );
};

export default ReviewsPage;
