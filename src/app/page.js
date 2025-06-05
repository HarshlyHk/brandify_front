import React from "react";
import Categories from "../components/Categories/Categories";
import Banner from "../components/Home/Banner";
import BigCarousel from "../components/Home/BigCarousel";
import { Comparison } from "../components/Home/Comparison";
import DripCult from "../components/Home/DripCultSlider";
import HomeBlanks from "../components/Home/HomeBlanks";
import HomeDripCult from "../components/Home/HomeDripCult";
import Marquee from "../components/Home/MarqueTop";
import PageLoader from "../components/Home/PageLoader";
import Carousel from "../components/Home/Carousel";
import { FaInstagram } from "react-icons/fa";
import { CopilotPopup } from "@copilotkit/react-ui";
import ClientProviders from "@/components/ClientProvider/ClientProvider";

const HomePage = () => {
  return (
    <ClientProviders>
      <div className="flex flex-col">
        <PageLoader />
        <div className="">
          <Marquee />
        </div>
        <div>
          <Carousel />
        </div>
        <div className="my-10 hidden md:block">
          <Banner />
        </div>
        <div className="mb-10">
          <Categories />
        </div>
        <div className="prodcut-padding mb-10">
          <HomeDripCult />
        </div>
        <div className="md:px-40 mb-10">
          <BigCarousel />
        </div>
        <div className="prodcut-padding mb-10 ">
          <Comparison />
        </div>

        <div className="prodcut-padding mb-10 ">
          <HomeBlanks />
        </div>
        <div className="mb-20 block md:hidden">
          <Banner />
        </div>
        <div className="mb-10">
          <DripCult />
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
    </ClientProviders>
  );
};

export default HomePage;
