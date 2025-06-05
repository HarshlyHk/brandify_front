import React from "react";
import Link from "next/link";
import ImageComparison from "./ImageComparison";

export function Comparison() {
  return (
    <div className="h-fit md:h-fit">
      <h2 className=" text-center">MUST HAVE BOTTOMS</h2>
      <div className="flex md:flex-row flex-col justify-center md:justify-start items-center w-full md:gap-10  mt-0 ">
        <div className="rounded-t-3xl dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 md:w-[600px] w-[370px] md:h-[600px] h-[370px] overflow-hidden">
          <ImageComparison
            leftImage="https://pub-047aa9653e2346718393f69be234faf1.r2.dev/PantPic-Front.webp"
            rightImage="https://pub-047aa9653e2346718393f69be234faf1.r2.dev/PantPic-Backt.webp"
          />
        </div>
        <div className="flex flex-col items-center justify-center px-2 md:w-[500px] mt-6 md:mt-0 md:gap-2 gap-2">
          <h1 className="text-center text-[1.2rem] md:text-[25px] font-montserrat font-bold text-gray-800 dark:text-white mt-4">
            CARPENTER PANTS
          </h1>
          <p className="text-center text-[16px] md:text-[15px] px-4 font-figtree md:mt-0 mt-4 ">
            Ideal for daily tasks, these pants combine practicality with a
            stylish silhouette that transitions seamlessly from work to weekend.
          </p>
          <Link
            href="/CARPENTER-PANTS/67f193a560a3350fcca11148"
            className=" md:px-6 md:py-3 px-6 py-3 rounded-none bg-[#323232] text-white  font-figtree text-[12px] hover:bg-transparent ease-in-out hover:rounded-[50px] border-2 border-[#4b4b4b] transition-all duration-500 hover:text-black mt-4 "
          >
            BUY NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
