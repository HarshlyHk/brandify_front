import React, { useState, useEffect } from "react";
import axiosInstance from "@/config/axiosInstance";
import { FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { IoMdClose } from "react-icons/io";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router";

const TYPING_PLACEHOLDERS = [
  "Search for products...",
  "Vests",
  "Bottoms",
  "Fear No one",
  "Carpenter Pants",
];

const ProductSearch = ({ size }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) fetchProducts();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get(
        `/product/search?query=${query}`
      );
      const fetchedProducts = response.data?.data?.products?.slice(0, 6);
      setProducts(fetchedProducts);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <FiSearch
          className=" text-gray-700 cursor-pointer hover:text-black"
          onClick={() => {
            setShowSearchBar(true);
            // make the body unscrollable
            document.body.style.overflow = "hidden";
          }}
          size={size ? 20 : 24}
        />
      </div>

      <AnimatePresence>
        {showSearchBar && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center gap-4 ${
              query ? "h-screen bg-[#f9f9f9]" : " h-[200vh] bg-[3f9f9f9]"
            }`}
          >
            <div
              className={`flex items-center ${
                query ? "" : "shadow-2xl"
              } justify-center w-full px-4 py-20 bg-[#f9f9f9] `}
            >
              <div className="flex items-center w-full max-w-3xl border-b border-gray-300 px-6 py-4 bg-[#f9f9f9] relative">
                <FiSearch className="text-xl text-gray-500 mr-4" />
                <input
                  autoFocus
                  type="text"
                  placeholder=""
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-[16px] font-light text-gray-800 placeholder:text-gray-400 focus:outline-none "
                />
                {!query && (
                  <span className="absolute left-18 text-gray-600 pointer-events-none font-helvetica">
                    <TypeAnimation
                      sequence={TYPING_PLACEHOLDERS.flatMap((text) => [
                        text,
                        2000,
                      ])}
                      wrapper="span"
                      cursor={true}
                      repeat={Infinity}
                    />
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setShowSearchBar(false);
                document.body.style.overflow = "auto";
                setQuery("");
                setProducts([]);
                setError("");
                setLoading(false);
              }}
              className="text-sm mt-2 text-gray-600 hover:text-black transition absolute right-4 top-4 "
            >
              <IoMdClose size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-fit w-full md:top-40 top-32 z-50 fixed left-1/2 -translate-x-1/2 flex items-center justify-center ">
        {showSearchBar && query && (
          <div className="mt-10 px-4 z-50 max-h-[70vh] overflow-y-auto no-scrollbar">
            {loading && <p className="text-gray-500 text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
      
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-2 w-full px-6">
              {products.map((product) => (
                <div
                  onClick={() => {
                    navigate(`/${product.name}/${product._id}`);
                    setShowSearchBar(false);
                    document.body.style.overflow = "auto";
                    setQuery("");
                    setProducts([]);
                    setError("");
                    setLoading(false);
                  }}
                  key={product._id}
                  className="flex items-center space-x-4 bg-[#f9f9f9] rounded-[5px] border-b-1 md:border-1 hover:shadow-md transition-shadow p-4 cursor-pointer md:w-[400px] w-[320px]"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="md:w-24 md:h-24 h-12 w-12 object-cover rounded-[5px]"
                  />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      {product.brand || "DRIP STUDIOS"}
                    </p>
                    <h3 className="text-[14px] font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-900">
                      Rs. {product.discountedPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductSearch;
