"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "keen-slider/keen-slider.min.css";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const categoriesRow1 = [
  "TEES",
  "VESTS",
  "BOTTOMS",
  "HOODIES",
  "DRIPCULT",
  "BLANKS",
  "FEAR NO ONE COLLECTION",
];

const Categories = ({ page = "shop-all" }) => {
  const navigate = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavigation = (category) => {
    const categoryMap = {
      TEES: "/all-products/oversized-tees",
      VESTS: "/all-products/vest",
      BOTTOMS: "/all-products/bottoms",
      HOODIES: "/all-products/hoodies",
      DRIPCULT: "/all-products/dripcult",
      BLANKS: "/all-products/blanks",
      "FEAR NO ONE COLLECTION": "/all-products/fear-no-one",
    };
    return categoryMap[category] || "#";
  };

  return (
    <div
      className={`border-t border-b border-black ${
        page == "shop-all" ? "md:mt-16 mt-12" : " mt-0"
      } `}
    >
      {isMobile ? (
        <div className="">
          <div className="z-50">
            <SimpleBar
              forceVisible="x"
              color="#e5e5e5"
              autoHide={false}
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              <div className="flex gap-10 min-w-fit py-5 px-6">
                {categoriesRow1.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(handleNavigation(category))}
                    className="text-sm whitespace-nowrap hover:underline"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </SimpleBar>
          </div>
        </div>
      ) : (
        <div className="flex md:justify-center justify-between md:px-20 px-10 md:gap-24 py-4">
          {categoriesRow1.map((category, index) => (
            <button
              onClick={() => navigate(handleNavigation(category))}
              key={index}
              className="text-[12px] tracking-wide transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300 text-nowrap"
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
