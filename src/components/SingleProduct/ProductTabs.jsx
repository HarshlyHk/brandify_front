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
      <div className="mt-2 leading-relaxed text-sm">
        <h1 className=" text-[16px]  tracking-wider  md:text-[24px] font-bold font-helvetica mb-4 uppercase">
          {text === description
            ? "Description"
            : text === coreFeatures
            ? "Core Features"
            : text === careGuide
            ? "Care Guide"
            : ""}
        </h1>
        <ol className="font-helvetica">{parse(formatted)}</ol>
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
      <div className="flex md:flex-row flex-col md:gap-6 md:border-b px-1 md:px-4 pt-4 justify-center">
        {tabs.map((label, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`relative p-5 text-[12px]  md:w-[200px] md:rounded-none md:text-[14px] uppercase font-helvetica font-medium tracking-wider transition-all ${
              tabIndex === index
                ? "text-white bg-black  "
                : "text-[#6d6c6c] hover:text-black"
            }`}
          >
            {label}
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
              <h1 className="text-[16px] tracking-wider md:text-[24px] font-bold font-helvetica mb-4 uppercase">
                Reviews
              </h1>
              <Reviews productId={productId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
