import React from "react";
import PrivacyPolicy from "@/components/Legals/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy | DRIP STUDIOS",
  description: "Learn about our privacy policy and how it works.",
};
const page = () => {
  return (
    <>
      <PrivacyPolicy />
    </>
  );
};

export default page;
