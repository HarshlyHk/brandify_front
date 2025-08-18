"use client";
import React, { Suspense, useEffect, useState } from "react";
import { UserRound, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle, logout } from "@/features/userSlice";
import { fetchAddresses } from "@/features/addressSlice";
import DesktopNavbar from "./DesktopNavbar";
import "./Navbar.css";
import { GoogleLogin } from "@react-oauth/google";
import { addBulkToCart, fetchCart } from "@/features/cartSlice";
import Logo from "../Logo/Logo";
import ProductSearch from "./ProductSearch";
import { IoMdHeartEmpty } from "react-icons/io";

const navItems = [
  { name: "HOME", link: "/shop-all" },
  {
    name: "CATEGORIES",
    link: "/",
    children: ["OVERSIZED TEES", "VEST", "HOODIES", "BOTTOMS"],
  },
  { name: "BLANKS", link: "/all-products/blanks" },
  { name: "DRIPCULT", link: "/all-products/dripcult" },
  { name: "FEAR NO ONE", link: "/all-products/fear-no-one" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { addresses } = useSelector((state) => state.address);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const userToken =
    typeof window !== "undefined" && localStorage.getItem("drip_access_token");

  useEffect(() => {
    const token =
      typeof window !== "undefined" &&
      localStorage.getItem("drip_access_token");
    if (token) {
      if (!cartItems.length) {
        dispatch(fetchCart());
      }
      setTotalCartItems(cartItems.length);
      if (!addresses.length) {
        dispatch(fetchAddresses());
      }
    } else {
      const storedCart =
        (typeof window !== "undefined" &&
          JSON.parse(localStorage.getItem("cart"))) ||
        [];
      setTotalCartItems(storedCart.length);
    }
  }, [user]);

  useEffect(() => {
    const referralCode = searchParams.get("utm_medium");
    if (referralCode) {
      typeof window !== "undefined" &&
        localStorage.setItem("referralCode", "meta");
    }
  }, [searchParams]);

  useEffect(() => {
    const params = searchParams;

    const queryParams = {
      Source: params.get("utm_source"),
      Placement: params.get("utm_medium"),
      CampaignName: params.get("utm_campaign"),
      AdSetName: params.get("utm_content"),
      AdName: params.get("AD NAME"),
      CampaignID: params.get("utm_id"),
      Term: params.get("utm_term"),
      Fbclid: params.get("fbclid"),
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) {
        typeof window !== "undefined" && localStorage.setItem(key, value);
      }
    });
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    const res = await dispatch(loginWithGoogle(credentialResponse.credential));
    if (res.meta.requestStatus === "fulfilled") {
      setOpen(false); // Close the dialog after successful login
      const cartItems =
        (typeof window !== "undefined" &&
          JSON.parse(localStorage.getItem("cart"))) ||
        [];
      if (cartItems.length > 0) {
        const itemsToAdd = cartItems.map((item) => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
        }));
        const cartRes = await dispatch(addBulkToCart(itemsToAdd));
        if (cartRes.meta.requestStatus === "fulfilled") {
          typeof window !== "undefined" && localStorage.removeItem("cart");
        }
      }
    } else {
      console.error("Google login failed");
    }
  };
  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <>
      <nav className="backdrop-blur-[10px]  shadow-md w-full sticky top-0 z-10 border-b border-white">
        <div className=" px-6 md:px-20 h-[80px] flex justify-between items-center">
          {/* Logo */}

          <div>
            <DesktopNavbar user={user} handleLogout={handleLogout} />
          </div>

          <Link href="/" className=" absolute left-[50%] -translate-x-1/2">
            <div className="font-phonk md:text-lg text-sm">
              <Logo className="text-black" />
            </div>
          </Link>

          <div className="md:hidden flex gap-3 ">
            <Link
              href="/cart"
              className="flex items-center space-x-2 relative text-sm"
            >
              <span className="absolute -top-2 -right-3 text-[12px] ">
                {totalCartItems > 0 ? totalCartItems : ""}
              </span>
              <ShoppingBag
                size={18}
                className="transition-all cursor-pointer"
              />
            </Link>

            {user ? (
              ""
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 text-sm"
              >
                <UserRound
                  size={18}
                  className="transition-all cursor-pointer"
                />
              </Link>
            )}
            <ProductSearch size={18} />
          </div>

          <div className="hidden md:flex items-center relative gap-4">
            <div className="hidden md:flex items-center relative gap-4">
              <Link
                href="/cart"
                title="Cart"
                className="flex items-center space-x-2 relative text-sm"
              >
                <span className="absolute -top-2 -right-3 text-[12px] ">
                  {totalCartItems > 0 ? totalCartItems : ""}
                </span>{" "}
                <ShoppingBag
                  size={20}
                  className="transition-all cursor-pointer"
                />
              </Link>

              <Link
                href="/wishlist"
                title="Wishlist"
                className="flex items-center space-x-2 relative text-sm"
              >
                <IoMdHeartEmpty
                  size={20}
                  className="transition-all cursor-pointer"
                />
              </Link>

              <div className="relative group cursor-pointer">
                {user ? (
                  <p className="text-sm after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#000] after:transition-all after:duration-500 group-hover:after:w-full relative w-fit block text-black font-medium uppercase">
                    {user?.name}
                  </p>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center space-x-2 text-sm"
                  >
                    <UserRound
                      size={22}
                      className="transition-all cursor-pointer"
                    />
                  </Link>
                )}
              </div>
            </div>
            <ProductSearch size={22} />
          </div>
        </div>
      </nav>

      {!userToken && (
        <div className="hidden justify-center items-center gap-10 bg-white py-2">
          <GoogleLogin
            id="google-login-button"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
