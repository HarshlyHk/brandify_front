import React from "react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4 uppercase">Your Cart is Empty</h1>
      <Link href="/" className="bg-black text-white px-6 py-2 rounded">
        Shop Now
      </Link>
    </div>
  );
};

export default EmptyCart;
