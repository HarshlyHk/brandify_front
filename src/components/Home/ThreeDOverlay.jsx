"use client";
import React from "react";
import Link from "next/link";
import ThreeDLogo from "./ThreeDLogo";
import { MdKeyboardArrowDown } from "react-icons/md";

const ThreeDOverlay = () => (
  <div className="relative w-full h-[80vh] overflow-hidden">
    <video
      playsInline
      autoPlay
      loop
      muted
      preload="metadata"
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source
        src="https://pub-047aa9653e2346718393f69be234faf1.r2.dev/0714.mp4"
        type="video/mp4"
      />
    </video>

    {/* 3‑D logo */}
    <div className="absolute top-1/2 left-1/2 z-20 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
      <ThreeDLogo />
    </div>

    {/* CTA */}
    <Link
      href="/all-products/all-products"
      className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center border border-transparent bg-white px-8 py-3 text-[12px] tracking-[0.2em] text-black"
    >
      SHOP ALL
    </Link>

    {/* Scroll arrow */}
    <button
      type="button"
      className="absolute bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center w-12 h-12 bg-transparent"
      onClick={() =>
        document
          .getElementById("fix-your-drip")
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <MdKeyboardArrowDown className="w-10 h-10 text-white" />
    </button>
  </div>
);

export default ThreeDOverlay;
