import React from "react";
import Complaint from "@/components/Support/Complaint"

// metadata for the page
export const metadata = {
  title: "Exchange Product | DRIP STUDIOS",
  description: "Get in touch with our support team regarding product exchanges",
};

const page = () => {
  return (
    <div>
      <Complaint />
    </div>
  );
};

export default page;
