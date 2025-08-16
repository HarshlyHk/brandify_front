import React from 'react'
import ShippingPolicy from '@/components/Legals/ShippingPolicy'
export const metadata = {
  title: "Shipping Policy | DRIP STUDIOS",
  description: "Learn about our shipping policy and how it works.",
};
const page = () => {
  return (
    <>
      <ShippingPolicy />
    </>
  );
};

export default page