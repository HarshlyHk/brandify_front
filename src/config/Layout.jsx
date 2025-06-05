import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import useAuthHook from "../utils/useAuthHook";
const Layout = () => {
  useAuthHook(); // Call the custom hook to check authentication
  return (
    <div>
      <Navbar />
      <div className=" min-h-screen flex flex-col justify-between">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
