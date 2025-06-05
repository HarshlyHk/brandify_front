"use client";

import React from "react";
import { Heart } from "lucide-react";
const AddToWishlistButton = () => {
  return (
    <div>
      <button name="add-to-wishlist-hover-button" className="bg-black text-white px-3 py-3 rounded-full border-2 border-white">
        <Heart size={20} />
      </button>
    </div>
  );
};

export default AddToWishlistButton;
