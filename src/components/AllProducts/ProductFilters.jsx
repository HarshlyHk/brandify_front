"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductFilters = ({ category, resultCount, filters, setFilters }) => {
  const [openSections, setOpenSections] = useState({
    price: true,
    availability: false,
    size: false,
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

  const handlePriceInput = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value.replace(/\D/, ""), // only numbers
    }));
  };

  const filterSections = [
    {
      id: "price",
      title: "Price",
      content: (
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center gap-4 text-sm text-gray-600">
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="minPrice" className="text-xs text-gray-500">
                Min
              </label>
              <input
                id="minPrice"
                name="minPrice"
                type="number"
                min={0}
                max={filters.maxPrice || 2500}
                value={filters.minPrice || ""}
                onChange={handlePriceInput}
                placeholder="₹0"
                className="w-20 px-2 py-2 border border-gray-300 rounded focus:outline-none "
              />
            </div>
            <span className="mx-2 text-gray-400">—</span>
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="maxPrice" className="text-xs text-gray-500">
                Max
              </label>
              <input
                id="maxPrice"
                name="maxPrice"
                type="number"
                min={filters.minPrice || 0}
                max={2500}
                value={filters.maxPrice || ""}
                onChange={handlePriceInput}
                placeholder="₹2500"
                className="w-20 px-2 py-2 border border-gray-300 rounded focus:outline-none "
              />
            </div>
          </div>
          <div className="text-xs text-center text-gray-700">
            Selected: ₹{filters.minPrice || 0} — ₹{filters.maxPrice || 2500}
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
              className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
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
                className={`py-2 text-sm transition-colors border ${
                  selected
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => handleFilterChange("size", size.toLowerCase())}
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
    <div className="w-full px-4 bg-white ">
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
