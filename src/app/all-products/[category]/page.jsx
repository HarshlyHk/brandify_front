import AllProducts from "@/components/AllProducts/AllProducts";
import React from "react";

// metadata for the page
export const metadata = {
  title: "All Products",
  description: "Explore our wide range of products",
};

const page = () => {
  return (
    <div>
      <AllProducts />
    </div>
  );
};

export default page;
