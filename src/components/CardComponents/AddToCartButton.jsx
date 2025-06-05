"use client";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cartSlice";
const AddToCartButton = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [selectedSize, setSelectedSize] = useState(null);
  // const navigate = useNavigate();
  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart({ productId: item?._id, size: selectedSize }));
    } else if (typeof window !== "undefined") {
      // Add to local storage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItemIndex = cart.findIndex(
        (cartItem) =>
          cartItem.productId === item?._id && cartItem.size === selectedSize
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += 1;
      } else {
        // Add new item if it doesn't exist
        const newItem = {
          productId: item?._id,
          size: selectedSize,
          name: item?.name,
          discountedPrice: item?.discountedPrice,
          originalPrice: item?.originalPrice,
          images: item?.images,
          quantity: 1, // Initialize quantity
        };
        cart.push(newItem);
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        name="add-to-cart-hover-button"
        className="bg-black text-white px-10 py-3 rounded-3xl border-2 border-white"
      >
        <ShoppingCart size={20} />
      </button>
    </div>
  );
};

export default AddToCartButton;
