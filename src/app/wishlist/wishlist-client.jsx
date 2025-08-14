"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cartSlice";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch {
        setWishlist([]);
      }
    }
  }, []);

  const handleAddToCart = (item) => {
    if (!item.size || item.size === "") {
      router.push(`/product/${item.productId}?name=${item.name}`);
      return;
    }
    dispatch(
      addToCart({
        productId: item.productId,
        size: item.size,
      })
    );
    router.push("/cart");
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4 uppercase">
          Your Wishlist is Empty
        </h1>
        <button
          onClick={() => router.push("/product-category/all-products")}
          className="bg-black text-white text-base px-6 py-3 rounded-[5px] hover:opacity-90 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8 uppercase text-center">
        Wishlist
      </h2>
      <div className="w-full max-w-2xl grid gap-6">
        {wishlist.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start justify-between py-6 text-sm w-full bg-white  mb-2"
          >
            {/* Product Image */}
            <Link
              href={`/product/${item.productId}`}
              className="w-[90px] sm:w-[110px] flex-shrink-0"
            >
              <div className="aspect-[2/3] relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute h-full w-full object-cover"
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="flex flex-col justify-start flex-1 px-4 text-left">
              <h3 className="text-lg font-medium text-black">
                {item.name || "Unnamed Product"}
              </h3>
              {item.size && (
                <p className="text-sm text-gray-600 mt-1 font-helvetica tracking-wide">
                  Size - {item.size}
                </p>
              )}
            </div>

            {/* Price & Add to Cart */}
            <div className="flex flex-col items-end gap-4 min-w-[120px]">
              <div className="text-right whitespace-nowrap text-[17px] font-medium text-black">
                ₹ {item.price}
              </div>
              <button
                className="bg-black text-white px-4 py-2 border border-transparent transition"
                onClick={() => handleAddToCart(item)}
              >
                {item.size ? "Add to Cart" : "Select Size"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
