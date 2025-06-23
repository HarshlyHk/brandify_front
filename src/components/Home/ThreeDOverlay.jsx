import React from "react";
import Link from "next/link";
import ThreeDLogo from "./ThreeDLogo"; // adjust path as necessary

const ThreeDOverlay = () => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        playsInline
        preload="auto"
      >
        <source
          src="https://pub-047aa9653e2346718393f69be234faf1.r2.dev/10mbb.mp4"
          type="video/mp4"
        />
      </video>

      {/* 3D Logo Overlay */}
      <div className="absolute top-1/2 left-1/2 z-20 w-[300px] h-[300px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <ThreeDLogo />
      </div>

      {/* Button */}
      <Link
        href="/all-products/all-products"
        className="flex justify-center items-center w-fit py-[12px] px-[30px] text-[12px] tracking-[0.2em] bg-white text-black border-transparent border-[1px] absolute left-1/2 transform -translate-x-1/2 z-10 bottom-8"
      >
        SHOP ALL
      </Link>
    </div>
  );
};

export default ThreeDOverlay;
