"use client";
import React, { use } from "react";
import Wishlist from "./wishlist-client";
import Lottie from "lottie-react";
import WorkFromHome from "@/assets/lottie/work-from-home.json"; // Import your animation JSON file

const page = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <Lottie animationData={WorkFromHome} loop={true} />
            {/* <Wishlist /> */}
        </div>
    );
};

export default page;
