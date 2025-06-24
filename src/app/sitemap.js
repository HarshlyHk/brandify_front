import axiosInstance from "@/config/axiosInstance";

export default async function sitemap() {
  const staticUrls = [
    {
      url: "https://dripdrip.in",
      lastModified: new Date(),
    },
    {
      url: "https://dripdrip.in/all-products/oversized-tees",
      lastModified: new Date(),
    },
    {
      url: "https://www.dripdrip.in/bottoms",
      lastModified: new Date(),
    },
    {
      url: "https://www.dripdrip.in/vests",
      lastModified: new Date(),
    },
  ];

  let dynamicUrls = [];

  try {
    const response = await axiosInstance.get(
      "product/get-product-category/all?limit=100"
    );
    const products = response?.data?.data || [];

    dynamicUrls = products.map((product) => ({
      url: `https://dripdrip.in/product/${product.name.replace(/\s+/g, "-")}`,
      lastModified: new Date(),
    }));
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  return [...staticUrls, ...dynamicUrls];
}
