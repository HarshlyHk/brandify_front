"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { FiChevronDown, FiCheck } from "react-icons/fi";

const SortSelector = ({ category }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "popularity", label: "Popularity" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "rating", label: "Top Rated" },
  ];

  const currentSort = searchParams.get("sort") || "relevance";
  const currentLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || "Relevance";

  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`/all-products/${category}?${params.toString()}`);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-end items-center mb-5">
      <div className="relative" ref={dropdownRef}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-200  shadow-xs hover:shadow-sm transition-all duration-200 min-w-[200px]"
        >
          <div className="flex items-center">
            <span className="text-base font-thin tracking-wider text-gray-700 font-madefor">
              {currentLabel}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown className="w-4 h-4 text-gray-500" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 mt-2 w-full origin-top-right bg-white shadow-lg z-50 border border-gray-100 overflow-hidden"
              layout
            >
              <motion.ul
                className="py-1"
                initial={false}
                animate="open"
                exit="closed"
              >
                {sortOptions.map((option) => (
                  <motion.li
                    key={option.value}
                    className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors duration-100 ${
                      currentSort === option.value
                        ? "bg-blue text-black font-medium"
                        : "text-gray-700"
                    } `}
                    onClick={() => handleSortChange(option.value)}
                  >
                    <span
                      className={
                        currentSort === option.value
                          ? "font-medium text-gray-900 font-madefor tracking-wide"
                          : "text-gray-700 font-madefor tracking-wide"
                      }
                    >
                      {option.label}
                    </span>
                    {currentSort === option.value && (
                      <FiCheck className="w-4 h-4 text-blue-500" />
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SortSelector;
