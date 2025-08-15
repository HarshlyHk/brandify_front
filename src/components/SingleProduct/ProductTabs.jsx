"use client";
import React, { useState } from "react";
import parse from "html-react-parser";
import { Skeleton } from "../ui/skeleton";
import { useSelector } from "react-redux";
import Reviews from "./Reviews";
const tabs = ["Description", "Core Features", "Care Guide", "Reviews"];

const ProductTabs = ({
  productId,
  description,
  coreFeatures,
  careGuide,
  reviews = [],
  loading,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const user = useSelector((state) => state.user.user);
  const handleTabChange = (index) => setTabIndex(index);
  const renderContent = (text) => {
    const formatted = (text || "").replace(/\r\n/g, "<br/>");
    return (
      <div className="mt-6 leading-relaxed text-sm">
        <h2 className="text-lg font-semibold mb-4 uppercase">
          {text === description
            ? "Description"
            : text === coreFeatures
            ? "Core Features"
            : text === careGuide
            ? "Care Guide"
            : ""}
        </h2>
        <ol className="">{parse(formatted)}</ol>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full mt-10 rounded-md p-4">
        <div className="flex gap-6 border-b border-gray-100">
          {tabs.map((label, index) => (
            <button
              key={index}
              className="px-4 py-3 text-sm font-medium text-gray-600 cursor-not-allowed"
              disabled
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-6 px-4">
          <Skeleton className="h-[200px] w-full rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-10 rounded-[5px]">
      {/* Tabs */}
      <div className="flex md:flex-row flex-col md:gap-6  border-b px-4 pt-4 justify-center">
        {tabs.map((label, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`relative p-5 text-[12px] rounded-[5px] md:rounded-none md:text-[14px] uppercase font-medium transition-all ${
              tabIndex === index
                ? "text-white bg-[#323232]  "
                : "text-[#6d6c6c] hover:text-black"
            }`}
          >
            {label === "Reviews" ? `${label}` : label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6">
        {tabIndex === 0 && renderContent(description)}
        {tabIndex === 1 && renderContent(coreFeatures)}
        {tabIndex === 2 && renderContent(careGuide)}
        {tabIndex === 3 && (
          <div className="">
            <div className="w-full ">
              <h2 className="font-semibold !mb-4 ">Reviews</h2>
              <Reviews productId={productId} />
            </div>
            <div className="w-full  border-l border-gray-100 pl-4">
              <p className="text-sm text-gray-100">
                You must be logged in to post a review.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
