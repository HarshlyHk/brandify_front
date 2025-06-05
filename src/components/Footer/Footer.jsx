import React from "react";
import { Link } from "react-router";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer className=" absolute text-center py-6 text-sm font-medium tracking-widest z-50 left-[50%] translate-x-[-50%] w-full bg-[#f9f9f9]">
      <p className="mb-8 text-[11px]">
        Copyright © 2025, DRIP. All Rights Reserved.
      </p>
      <div className="flex md:justify-center justify-between px-2 gap-4 flex-wrap text-gray-600 md:text-xs text-[11px]">
        <Link
          to="/terms-and-conditions"
          onClick={scrollToTop}
          className="hover:text-black transition"
        >
          Terms and Conditions
        </Link>

        <Link
          to="/privacy-policy"
          onClick={scrollToTop}
          className="hover:text-black transition"
        >
          Privacy Policy
        </Link>
        <Link
          to="/shipping-policy"
          onClick={scrollToTop}
          className="hover:text-black transition"
        >
          Shipping Policy
        </Link>
        <Link
          to="/cancellation-policy"
          onClick={scrollToTop}
          className="hover:text-black transition"
        >
          Refund Policy
        </Link>
        <Link
          to="/cancellation-policy"
          onClick={scrollToTop}
          className="hover:text-black transition"
        >
          Return Policy
        </Link>
        <Link
          to="/contact-us"
          onClick={scrollToTop}
          className="hover:text-black transition"
        >
          Contact Us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
