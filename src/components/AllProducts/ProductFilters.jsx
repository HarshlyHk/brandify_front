"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductFilters = ({ category, resultCount, filters, setFilters }) => {
  const [openSections, setOpenSections] = useState({
    price: true,
    availability: true,
    size: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const filterSections = [
    {
      id: "price",
      title: "Price",
      content: (
        <div className="mt-4 space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹0</span>
            <span>₹2500</span>
          </div>
          <input
            type="range"
            min={0}
            max={2500}
            step={50}
            value={filters.price || 0}
            onChange={(e) => handleFilterChange("price", e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
          <div className="text-sm text-center text-gray-700">
            Selected: ₹{filters.price || 0}
          </div>
        </div>
      ),
    },
    {
      id: "availability",
      title: "Availability",
      content: (
        <div className="mt-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange("inStock", e.target.checked)}
              className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
            />
            <span className="text-sm text-gray-700">In Stock</span>
          </label>
        </div>
      ),
    },
    {
      id: "size",
      title: "Size",
      content: (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size, idx) => {
            const selected = filters.size === size.toLowerCase();
            return (
              <button
                key={idx}
                type="button"
                className={`py-2 text-sm transition-colors rounded-md ${
                  selected
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() =>
                  handleFilterChange("size", size.toLowerCase())
                }
                aria-pressed={selected}
              >
                {size}
              </button>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full px-4 py-6 bg-white md:w-80 md:sticky md:top-20 md:h-fit md:px-0 md:py-0 md:ml-4 md:mt-10">
      <p className="pb-4 mb-6 text-sm text-gray-600 border-b">
        {resultCount} Results
      </p>

      <div className="space-y-6">
        {filterSections.map((section) => (
          <div
            key={section.id}
            className="pb-4 border-b border-gray-200 last:border-0"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full"
            >
              <h3 className="text-sm font-medium uppercase text-gray-900">
                {section.title}
              </h3>
              {openSections[section.id] ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            <AnimatePresence>
              {openSections[section.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;