"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}

const SortSelector = ({ category }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isMobile = useIsMobile();

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

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    if (!isMobile) {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile]);

  return (
    <div className="flex justify-end items-center ">
      {!isMobile ? (
        // Desktop/tablet dropdown
        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-2 py-2 transition-all duration-200"
          >
            <div className="flex items-center">
              <span className="text-sm md:text-base tracking-wider text-black ">
                <span className=" text-gray-700">Sort By:</span> {currentLabel}
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
                className="absolute right-0 mt-2 w-[200px] origin-top-right bg-white shadow-lg z-10 border border-gray-100 overflow-hidden"
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
                        <FiCheck className="w-4 h-4 text-red-500" />
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Mobile Drawer
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <button
              className="flex items-center gap-2 py-2 px-3 "
              onClick={() => setIsOpen(true)}
            >
              <span className="text-sm text-gray-700">Sort By:</span>
              <span className="text-sm font-medium">{currentLabel}</span>
              <FiChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Sort By</DrawerTitle>
            </DrawerHeader>
            <ul className="py-2">
              {sortOptions.map((option) => (
                <li
                  key={option.value}
                  className={`px-4 py-3 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors duration-100 font-helvetica-nue ${
                    currentSort === option.value
                      ? "bg-blue text-black font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => handleSortChange(option.value)}
                >
                  <span
                    className={
                      currentSort === option.value
                        ? " text-gray-900 tracking-wide "
                        : "text-gray-500 tracking-wide"
                    }
                  >
                    {option.label}
                  </span>
                  {currentSort === option.value && (
                    <FiCheck className="w-4 h-4 text-red-500" />
                  )}
                </li>
              ))}
            </ul>
            <DrawerClose asChild>
              <button
                className="w-full py-6 mt-2 text-center text-red-600 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default SortSelector;
