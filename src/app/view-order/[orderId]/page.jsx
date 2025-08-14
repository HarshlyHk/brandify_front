import ViewOrder from "@/components/Order/ViewOrder";
import React from "react";

export const metadata = {
  title: "View Order",
  description: "Detailed view of a specific order",
};

const page = () => {
  return (
    <div>
      <ViewOrder />
    </div>
  );
};

export default page;
