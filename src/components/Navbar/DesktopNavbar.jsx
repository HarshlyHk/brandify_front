import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../Logo/Logo";

const navItems = [
  { name: "HOME", link: "/" },
  {
    name: "COLLECTION",
    link: "#",
    expandable: true,
    children: [
      { name: "OVERSIZED TEES", link: "/all-products/oversized-tees" },
      { name: "VEST", link: "/all-products/vest" },
      { name: "HOODIES", link: "/all-products/hoodies" },
      { name: "BOTTOMS", link: "/all-products/bottoms" },
      { name: "BLANKS", link: "/all-products/blanks" },
      { name: "FEAR NO ONE COLLECTION", link: "/all-products/fear-no-one" },
    ],
  },
  { name: "DRIPCULT - OG", link: "/all-products/dripcult" },
  {
    name: "FESTIVE SALE",
    link: "/all-products/steal-the-drip",
    color: "text-red-500",
  },
  { name: "BLIND DROP", link: "/all-products/blind-drop" },

  // { name: "COMBO | UPTO 50% OFF", link: "/combo-page" },
];

const DesktopNavbar = ({ user, handleLogout }) => {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  const handleToggle = (name) => {
    setExpandedCategory((prev) => (prev === name ? null : name));
  };

  return (
    <div className="">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <div className="navbar-ham-container cursor-pointer">
            <a id="hamburger-icon" title="Menu">
              <span className="line line-1"></span>
              <span className="line line-2"></span>
              <span className="line line-3"></span>
            </a>
          </div>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="md:min-w-[500px] min-w-full  bg-[#aeaeae69] backdrop-blur-[20px] p-0 shadow-md  overflow-y-auto z-[500000] text-white"
        >
          <SheetHeader className="px-6 pb-3">
            <Link
              href="/"
              className="  "
              onClick={() => {
                window.scrollTo(0, 0);
                setIsOpen(false);
              }}
            >
              <Logo className="text-white text-xl" />
            </Link>
            <SheetDescription />
          </SheetHeader>

          <div className="flex flex-col mt-2 text-sm ">
            {navItems.map((item, index) => (
              <div key={index}>
                <div
                  className={`group flex items-center justify-between px-6 py-3 cursor-pointer transition-all ${
                    activePage === item.link ? "text-white" : "text-neutral-100"
                  }`}
                  onClick={() => item.expandable && handleToggle(item.name)}
                >
                  <Link
                    href={item.link}
                    onClick={() => {
                      if (!item.expandable) {
                        setIsOpen(false);
                        setActivePage(item.link);
                        setExpandedCategory(null);
                      }
                    }}
                    className={`relative w-fit block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all after:duration-500 group-hover:after:w-full ${
                      item.name === "FESTIVE SALE"
                        ? "text-red-500 font-bold"
                        : activePage === item.link
                        ? " after:w-full text-white font-bold"
                        : "hover:text-[#FFF] transition-all duration-300 font-medium"
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.expandable &&
                    (expandedCategory === item.name ? (
                      <ChevronUp className="w-4 h-4 text-gray-100" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-100" />
                    ))}
                </div>

                <AnimatePresence initial={false}>
                  {item.expandable && expandedCategory === item.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text- text-neutral-100 space-y-2  ">
                        {item.children.map((child, idx) => (
                          <Link
                            href={child.link}
                            onClick={() => {
                              setIsOpen(false);
                              setActivePage(child.link);
                            }}
                            key={idx}
                            className={`relative w-fit py-1 transition-all hover:text-[#FFF] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all after:duration-500 hover:after:w-full flex gap-4 ${
                              activePage === child.link
                                ? "text-white font-medium after:w-full"
                                : ""
                            }`}
                          >
                            <p>{child.name}</p>
                          </Link>
                        ))}
                        <div className="border-b-2 border-gray-300 mt-4"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="flex flex-col gap-4 mt-10 px-6 text-sm">
              <Link
                href="/wishlist"
                onClick={() => {
                  setActivePage("/wishlist");
                  window.scrollTo(0, 0);
                  setIsOpen(false);
                }}
                className={`relative w-fit py-1 transition-all text-[#FFF] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all uppercase after:duration-500 hover:after:w-full flex gap-4 ${
                  activePage === "/wishlist"
                    ? "text-white font-medium after:w-full"
                    : ""
                }`}
              >
                <p>Wishlist</p>
              </Link>
              <Link
                href="/support/contact-us"
                onClick={() => {
                  setActivePage("/contact-us");
                  window.scrollTo(0, 0);
                  setIsOpen(false);
                }}
                className={`relative w-fit py-1 transition-all text-[#FFF] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all uppercase after:duration-500 hover:after:w-full flex gap-4 ${
                  activePage === "/contact-us"
                    ? "text-white font-medium after:w-full"
                    : ""
                }`}
              >
                <p>Contact Us</p>
              </Link>

              <Link
                href="/support/track-order"
                onClick={() => {
                  setActivePage("/track-order");
                  window.scrollTo(0, 0);
                  setIsOpen(false);
                }}
                className={`relative w-fit py-1 transition-all text-[#FFF] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all uppercase after:duration-500 hover:after:w-full flex gap-4 ${
                  activePage === "/track-order"
                    ? "text-white font-medium after:w-full"
                    : ""
                }`}
              >
                <p>Track Your Order</p>
              </Link>
              <Link
                href="/support/return-and-refund"
                onClick={() => {
                  setActivePage("/support/return-and-refund");
                  window.scrollTo(0, 0);
                  setIsOpen(false);
                }}
                className={`relative w-fit py-1 transition-all text-[#FFF] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all uppercase after:duration-500 hover:after:w-full flex gap-4 ${
                  activePage === "/support/return-and-refund"
                    ? "text-white font-medium after:w-full"
                    : ""
                }`}
              >
                <p>Request Exchange</p>
              </Link>
              <a
                href="https://www.instagram.com/drip.co.in/"
                onClick={() => setIsOpen(false)}
                target="_blank"
                className={`mb-10 relative w-fit py-1 transition-all text-[#FFF] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all after:duration-500 uppercase hover:after:w-full flex gap-4 ${
                  activePage === "/login"
                    ? "text-white font-medium after:w-full"
                    : ""
                }`}
              >
                <p>INSTAGRAM</p>
              </a>
              <Link
                href="/legals/story-behind-drip"
                onClick={() => {
                  setActivePage("/legals/story-behind-drip");
                  window.scrollTo(0, 0);
                  setIsOpen(false);
                }}
                className={`relative w-fit py-1 transition-all text-[#FFF] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all uppercase after:duration-500 hover:after:w-full flex gap-4 ${
                  activePage === "/legals/story-behind-drip"
                    ? "text-white font-medium after:w-full"
                    : ""
                }`}
              >
                <p>Story Behind Drip</p>
              </Link>
              <Link
                href="/legals/what-makes-us-different"
                onClick={() => {
                  setActivePage("/legals/what-makes-us-different");
                  window.scrollTo(0, 0);
                  setIsOpen(false);
                }}
                className={`relative w-fit py-1 transition-all text-[#FFF] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all uppercase after:duration-500 hover:after:w-full flex gap-4 ${
                  activePage === "/legals/what-makes-us-different"
                    ? "text-white font-medium after:w-full"
                    : ""
                }`}
              >
                <p>What Makes Us Different </p>
              </Link>

              {user ? (
                <>
                  <div>
                    <p className=" uppercase md:hidden text-white">
                      Hello, {user.name}
                    </p>
                  </div>
                  <Link
                    href="/orders"
                    onClick={() => setIsOpen(false)}
                    className={`relative w-fit py-1 transition-all hover:text-[#FFF] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all text-white after:duration-500 hover:after:w-full flex gap-4 ${
                      activePage === "/orders"
                        ? "text-white font-medium after:w-full"
                        : ""
                    }`}
                  >
                    <p>YOUR ORDERS</p>
                  </Link>
                  <div>
                    <p
                      className="relative w-fit py-1 text-red-500 cursor-pointer transition-all after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all after:duration-500 hover:after:w-full flex gap-4"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      LOGOUT
                    </p>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className={`relative w-fit py-1 transition-all text-[#FFF] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FFF] after:transition-all after:duration-500 hover:after:w-full flex gap-4 ${
                    activePage === "/login"
                      ? "text-white font-medium after:w-full"
                      : ""
                  }`}
                >
                  <p>LOGIN</p>
                </Link>
              )}
            </div>
          </div>

          <SheetFooter className="mt-auto px-6 py-10 text-center">
            <p className="text-[11px] text-white font-bold">
              © 2025 DRIP. All Rights Reserved.
            </p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DesktopNavbar;
