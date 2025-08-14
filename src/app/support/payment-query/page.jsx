import React from "react";
import PaymentQuery from "@/components/Support/PaymentQuery"

// metadata for the page
export const metadata = {
  title: "Payment Query | DRIP STUDIOS",
  description: "Get in touch with our support team regarding payment issues",
};

const page = () => {
  return (
    <div>
      <PaymentQuery />
    </div>
  );
};

export default page;
