"use client";
import React from "react";
import { motion } from "framer-motion";

const AnimatedSlider = ({ min = 0, max = 2500, step = 50, value, onChange }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full relative h-8 flex items-center">
      {/* Track */}
      <div className="absolute w-full h-[4px] bg-gray-200 rounded-full" />
      
      {/* Filled Track */}
      <motion.div
        className="absolute h-[4px] bg-black rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.2 }}
      />

      {/* Thumb */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-black rounded-full shadow-md cursor-pointer"
        style={{ left: `${percentage}%`, translateX: "-50%" }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1 }}
      />

      {/* Hidden Native Range Input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute w-full h-8 opacity-0 cursor-pointer z-10"
      />
    </div>
  );
};

export default AnimatedSlider;
