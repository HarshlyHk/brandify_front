import React from "react";
import Wishlist from "./wishlist-client";

export const metadata = {
  title: "My Wishlist",
  description: "View and manage your wishlist",
};

const page = () => {
  return (
  
      <div>
        <Wishlist />
      </div>
  );
};

export default page;
