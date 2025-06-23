import React from "react";
import Categories from "@/components/Categories/Categories";
import Banner from "@/components/Home/Banner";
import BigCarousel from "@/components/Home/BigCarousel";
import { Comparison } from "@/components/Home/Comparison";
import DripCult from "@/components/Home/DripCult";
import HomeBlanks from "@/components/Home/HomeBlanks";
import HomeDripCult from "@/components/Home/HomeDripCult";
import Marquee from "@/components/Home/MarqueTop";
import PageLoader from "@/components/Home/PageLoader";
import Carousel from "@/components/Home/Carousel";
import { FaInstagram } from "react-icons/fa";
import { CopilotPopup } from "@copilotkit/react-ui";
import BottomsCarousel from "@/components/Home/BottomsCarousel";
import NewArrivals from "@/components/Home/NewArrivals";
import Lookbooks from "@/components/Home/Lookbooks";
import ThreeDOverlay from "@/components/Home/ThreeDOverlay";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <PageLoader />
      <div className="">
        <Marquee />
      </div>

      {/* Video only for mobile */}
      <div className="md:hidden relative z-[2]">
        <ThreeDOverlay />
      </div>
      <div className="md:block hidden">
        <Carousel />
      </div>

      <div className="mb-10">
        <Categories />
      </div>

      <div className="block md:hidden">
        <NewArrivals />
      </div>

      <div className="mb-10 block md:hidden">
        <Lookbooks />
      </div>

      <div className="prodcut-padding-2 mb-10">
        <HomeDripCult productLimit={6} />
      </div>

      <div className="prodcut-padding mb-10 md:hidden ">
        <Comparison />
      </div>

      <div className="mb-10 md:block hidden">
        <BottomsCarousel />
      </div>
      <div className=" lg:px-20 px-4 mb-10">
        <HomeBlanks />
      </div>
      <div className="prodcut-padding mb-10 md:block hidden">
        <Comparison />
      </div>

      <div className="mb-20 block ">
        <Banner />
      </div>
      <div className="mb-10 hidden md:block">
        <DripCult />
      </div>

      <div className="md:px-8 mb-10">
        <BigCarousel />
      </div>
      <CopilotPopup
        labels={{
          title: "DRIP STUDIOS",
          initial: `How can I help you today? Here are some things I can assist you with:
              - Track your order
              - Register a complaint
              - Check delivery time
              - Learn about our store location`,
        }}
        instructions="AI help that shows up right when you need it"
      />

      <div className="flex flex-col  items-center justify-center gap-28 mb-10 text-lg mt-20">
        <a
          href="https://www.instagram.com/drip.co.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-xl text-black" size={35} />
        </a>
        <span className="tracking-wide font-bold">PROUDLY MADE IN INDIA</span>
      </div>
    </div>
  );
};

export default HomePage;
