"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cartSlice";

const FrequentlyBought = ({ frequentlyBought }) => {
  const [selectedItems, setSelectedItems] = useState(
    frequentlyBought.map(() => true) // Select all by default
  );
  const [selectedSizes, setSelectedSizes] = useState(
    frequentlyBought.map((item) => item?.sizeVariations[0]?.size) // Default to the first size
  );
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  const toggleSelect = (index) => {
    const updatedSelection = [...selectedItems];
    updatedSelection[index] = !updatedSelection[index];
    setSelectedItems(updatedSelection);
  };

  const handleSizeChange = (index, size) => {
    const updatedSizes = [...selectedSizes];
    updatedSizes[index] = size;
    setSelectedSizes(updatedSizes);
  };

  const handleAddAllToCart = () => {
    frequentlyBought.forEach((item, index) => {
      if (selectedItems[index]) {
        const selectedSize = selectedSizes[index]; // Use the selected size
        if (user) {
          dispatch(addToCart({ productId: item._id, size: selectedSize }));
          router.push("/cart"); // Redirect to cart page
        } else {
          // Add to local storage
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          const existingItemIndex = cart.findIndex(
            (cartItem) =>
              cartItem.productId === item._id && cartItem.size === selectedSize
          );

          if (existingItemIndex !== -1) {
            // Update quantity if item exists
            cart[existingItemIndex].quantity += 1;
          } else {
            // Add new item if it doesn't exist
            const newItem = {
              productId: item._id,
              size: selectedSize,
              name: item.name,
              discountedPrice: item.discountedPrice,
              originalPrice: item.originalPrice,
              images: item.images,
              quantity: 1, // Initialize quantity
            };
            cart.push(newItem);
          }

          router.push("/cart"); // Redirect to cart page
          // Save updated cart to localStorage
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    });
  };

  return (
    <div className="w-full md:max-w-[700px] mx-auto pt-4 rounded-lg">
      <p className="md:text-[1.2rem] text-[1rem] md:text-center text-center mt-4  font-semibold mb-4">
        FREQUENTLY BOUGHT TOGETHER
      </p>
      {frequentlyBought.length > 0 ? (
        <div className="space-y-3">
          {frequentlyBought?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-1 border-[#7c7c7c] p-3 rounded-lg"
            >
              <input
                type="checkbox"
                checked={selectedItems[index]}
                onChange={() => toggleSelect(index)}
                className="mr-3 accent-red-500"
              />
              {/* Product Image */}
              <Link
                href={`/${item._id}?name=${item.name.replace(/[\s–]+/g, "-")}`}
              >
                <img
                  src={item?.images[0]}
                  alt={item?.name}
                  className="md:w-20 w-14 h-14   md:h-20 rounded object-cover"
                />
              </Link>

              {/* Product Details */}
              <div className="flex-1 px-2">
                <p className="md:text-[13px] text-[11px] w-[110px] md:w-[300px] truncate mb-2">
                  {item.name}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-[12px]">₹{item.discountedPrice}</p>
                  <p className="text-[12px] line-through">
                    ₹{item.originalPrice}
                  </p>
                </div>
              </div>

              {/* Size Selector */}
              <Select
                className="w-20 text-red-500"
                onValueChange={(value) => handleSizeChange(index, value)}
                name="size-selector"
              >
                <SelectTrigger
                  className="w-20 bg-white text-red-500"
                  name="size-trigger"
                >
                  <SelectValue
                    placeholder={selectedSizes[index]}
                    className="placeholder:text-red-500"
                  />
                </SelectTrigger>
                <SelectContent className="" name="size-content">
                  {item?.sizeVariations.map((size, idx) => (
                    <SelectItem
                      key={idx}
                      value={size.size}
                      name="size-item"
                      className={`$${
                        size.stock === 0 ? "text-gray-400 line-through" : ""
                      }`}
                    >
                      {size?.size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-white">Loading...</p>
        </div>
      )}

      {/* Add All to Cart Button */}
      <button
        onClick={handleAddAllToCart}
        className="rounded-md px-4 py-5 md:py-5 text-xs w-full border-1 border-[#7c7c7c] mt-4"
        name="add-all-to-cart-button"
      >
        ADD ALL TO CART
      </button>
    </div>
  );
};

export default FrequentlyBought;
