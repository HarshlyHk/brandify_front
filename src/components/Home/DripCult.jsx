import axiosInstance from "@/config/axiosInstance";
import DripCultSlider from "./DripCultSlider";
import API_URL from "@/config/API_URL";

const DripCult = async () => {
  try {
    const res = await fetch(
      `${API_URL}product/get-product-category/dripcult?limit=40&sort=relevance`,
      {
        next: { revalidate: 300 }, // Revalidate once every 5 minutes
      }
    );  
    const data = await res.json();
    const products = data?.data?.products || [];

    if (!products.length) {
      return (
        <div className="py-10 text-center text-gray-500">
          No products found in this category.
        </div>
      );
    }

    return (
      <section className="py-10 px-4 md:px-20 relative">
        <h2 className="text-center text-xl md:text-3xl font-bold mb-8">
          DRIPCULT - CERTIFIED HEAT
        </h2>
        <DripCultSlider products={products} />
      </section>
    );
  } catch (error) {
    console.error("Server fetch error:", error);
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }
};

export default DripCult;
