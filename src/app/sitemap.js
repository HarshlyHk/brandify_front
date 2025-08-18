import { MetadataRoute } from "next";

export default async function sitemap() {
  const response = await fetch(
    "https://api.dripdrip.in/api/product/get-product-category/all-products?limit=200&sort=relevance",
    { next: { revalidate: 0 } }
  );
  const data = await response.json();
  console.log("Sitemap data:", data?.data?.products);
  const postEntries =
    data?.data?.products?.map((item) => ({
      url: `https://www.dripdrip.in/product-details/${item._id}?name=${item.name
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
      lastModified: item.createdAt
        ? new Date(item.createdAt).toISOString()
        : new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.7,
    })) || [];
  return [
    {
      url: "https://www.dripdrip.in/all-products/featured",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://www.dripdrip.in/all-products/fear-no-one",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://www.dripdrip.in/all-products/dripcult",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://www.dripdrip.in/all-products/oversized-tees",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://www.dripdrip.in/support/contact-us",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
    {
      url: "https://www.dripdrip.in/support/payment-query",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
    {
      url: "https://www.dripdrip.in/support/return-refund",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
    {
      url: "https://www.dripdrip.in/support/track-order",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
    {
      url: "https://www.dripdrip.in/legals/story-behind-drip",
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
    ...postEntries,
  ];
}
