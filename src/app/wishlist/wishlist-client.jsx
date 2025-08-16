"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cartSlice";
import Image from "next/image";
import { formatIndianPrice } from "@/utils/formatPrice";
import { MdDelete } from "react-icons/md";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const stored =
      typeof window !== "undefined" && localStorage.getItem("wishlist");
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch {
        setWishlist([]);
      }
    }
  }, []);

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart({ productId: item?._id, size: selectedSize }));
    } else {
      const cart =
        (typeof window !== "undefined" &&
          JSON.parse(localStorage.getItem("cart"))) ||
        [];
      const existingItemIndex = cart.findIndex(
        (cartItem) =>
          cartItem.productId === item?._id && cartItem.size === selectedSize
      );

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        const newItem = {
          productId: item?._id,
          size: selectedSize,
          name: item?.name,
          discountedPrice: item?.discountedPrice,
          originalPrice: item?.originalPrice,
          images: item?.images,
          quantity: 1,
        };
        cart.push(newItem);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }

    // 📌 Facebook Pixel Event: AddToCart
    window.fbq &&
      window.fbq("track", "AddToCart", {
        content_name: item?.name,
        content_ids: [item?._id],
        content_type: "product",
        value: item?.discountedPrice,
        currency: "INR",
      });

    router.push("/cart");
  };

  const handleRemove = (idx) => {
    const updated = wishlist.filter((_, i) => i !== idx);
    setWishlist(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4 uppercase">
          Your Wishlist is Empty
        </h1>
        <button
          onClick={() => router.push("/all-products/all-products")}
          className="bg-black text-white text-base px-6 py-3 rounded-[5px] hover:opacity-90 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8 uppercase text-center md:text-start">
        Wishlist
      </h2>
      <div className="w-full md:max-w-4xl grid gap-6">
        {wishlist.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 p-5 border-b mb-2 relative"
          >
            {/* //! For Desktop */}
            <div className="items-center w-full hidden md:flex">
              <button
                className=" absolute top-10 right-4 z-[10]"
                onClick={() => handleRemove(idx)}
              >
                <MdDelete className="text-black text-[24px]" />
              </button>
              {/* Product Image */}
              <div className="flex flex-1">
                <Link
                  href={`/product-details/${item.productId}`}
                  className="cursor-pointer flex-shrink-0 relative h-[80px] w-[80px]  md:w-[200px] md:h-[200px]"
                >
                  <div className="">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      quality={100}
                      className=" aspect-square"
                    />
                  </div>
                </Link>
              </div>

              {/* Product Info */}
              <div className="flex-1 flex-col md:flex-row relative w-full">
                <h3 className="text-[12px] sm:text-[16px] font-semibold mb-2 font-helvetica">
                  {item.name || "Unnamed Product"}
                </h3>
                {item.size && (
                  <p className="text-[12px] text-gray-600 uppercase mb-2 font-helvetica">
                    Size: {item.size}
                  </p>
                )}
                <div className=" text-[12px] md:text-[17px] font-medium text-black font-helvetica">
                  ₹{formatIndianPrice(item.price)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end gap-2 min-w-[120px]">
                <button
                  className="bg-black text-white px-4 py-2 tracking-wider border-transparent border-1 transition font-helvetica text-sm "
                  onClick={() => handleAddToCart(item)}
                >
                  {item.size ? "Add to Cart" : "Select Size"}
                </button>
              </div>
            </div>
            {/* //! For Mobile */}
            <div className="items-center w-full flex flex-col  md:hidden">
              <button
                className=" absolute top-10 right-4 z-[10]"
                onClick={() => handleRemove(idx)}
              >
                <MdDelete className="text-black text-[24px]" />
              </button>
              {/* Product Image */}
              <div className="flex flex-1 flex-col items-center">
                <Link
                  href={`/product-details/${item.productId}`}
                  className="cursor-pointer flex-shrink-0 relative h-[140px] w-[140px]  md:w-[200px] md:h-[200px]"
                >
                  <div className="">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      quality={100}
                      className=" aspect-square"
                    />
                  </div>
                </Link>
                <h3 className="text-[12px] sm:text-[16px] font-semibold mb-2 font-helvetica">
                  {item.name || "Unnamed Product"}
                </h3>
              </div>

              {/* Product Info */}
              <div className="flex-1 flex gap-4 items-center justify-center mb-4 relative w-full">
                {item.size && (
                  <p className="text-[12px] text-gray-600 uppercase  font-helvetica">
                    Size: {item.size}
                  </p>
                )}
                <div className=" text-[12px] md:text-[17px] font-medium text-black font-helvetica">
                  ₹{formatIndianPrice(item.price)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end gap-2 min-w-[120px]">
                <button
                  className="bg-black text-white px-4 py-2 tracking-wider border-transparent border-1 transition font-helvetica text-sm "
                  onClick={() => handleAddToCart(item)}
                >
                  {item.size ? "Add to Cart" : "Select Size"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
