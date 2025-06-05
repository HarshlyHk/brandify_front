"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "../Logo/Logo"; // update as per your actual path

const PageLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-gradient-to-b from-[#f5f5f5] to-[#ffffff]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          <Logo className="text-xl font-bold text-center mt-10 relative -top-[10%]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
