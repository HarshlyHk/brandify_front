import React, { useState, useEffect } from "react";
import MagicCheckoutButton from "../MagicCheckout/MagicCheckout"; // Import MagicCheckoutButton
import { Link } from "react-router";
import { FaGreaterThan } from "react-icons/fa6";

const CartSummary = ({
  user,
  cartItems,
  localCart,
  coupon,
  setCoupon,
  orderNotes,
  setOrderNotes,
  handleProceedToCheckout,
}) => {
  const getTotal = (items) =>
    items.reduce((total, item) => {
      const price =
        item?.discountedPrice || item?.product?.discountedPrice || 0;
      return total + price * item?.quantity;
    }, 0);

  const getOriginalPrice = (items) =>
    items.reduce((total, item) => {
      const price = item?.originalPrice || item?.product?.originalPrice || 0;
      return total + price * item?.quantity;
    }, 0);

  const getDiscount = (items) =>
    items.reduce((sum, item) => {
      const originalPrice =
        item?.originalPrice || item?.product?.originalPrice || 0;
      const discountedPrice =
        item?.discountedPrice || item?.product?.discountedPrice || 0;
      return sum + (originalPrice - discountedPrice) * item?.quantity;
    }, 0);

  const couponCode = sessionStorage.getItem("coupon");

  const items = user ? cartItems : localCart;
  const total = getTotal(items);
  const originalPrice = getOriginalPrice(items);
  const discount = getDiscount(items);
  const [instaHandle, setInstaHandle] = useState(
    (typeof window !== "undefined" && localStorage.getItem("instaHandle")) || ""
  );
  const [discountedTotal, setDiscountedTotal] = useState(total);

  const applyCoupon = () => {
    if (total < 2999) {
      alert("Minimum order value for coupon is ₹2999");
      return 0;
    }

    if (coupon === "DRIP10") {
      const discountAmount = total * 0.1; // 10% off on the total discounted price
      sessionStorage.setItem("coupon", coupon); // Store the coupon in sessionStorage
      setDiscountedTotal(total - discountAmount); // Update the discounted total
      return discountAmount;
    }
    alert("Invalid coupon code or no discount available.");
    return 0;
  };

  useEffect(() => {
    sessionStorage.removeItem("coupon");
  }, []);

  useEffect(() => {
    getTotal(items);
    getOriginalPrice(items);
    getDiscount(items);
    setDiscountedTotal(total);
  }, [items, total, cartItems, localCart]);

  return (
    <div className="p-6 flex flex-col justify-between">
      <div className=" flex flex-col gap-6">
        <h3 className="text-xl uppercase font-bold">Summary</h3>
        <hr />
        <div className="  flex flex-col gap-4 text-sm sm:text-sm text-[12px]">
          <div className="flex justify-between">
            <span>PRICE</span>
            <span className="sm:text-sm text-[12px]">
              ₹{originalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between sm:text-sm text-[12px] mt-4">
            <span>DISCOUNT</span>
            <span className=" text-purple-500 sm:text-sm text-[12px]">
              -₹{discount.toFixed(2)}
            </span>
          </div>
          {couponCode && (
            <div className="flex justify-between  ">
              <span className="sm:text-[12px] text-[12px]">
                COUPON DISCOUNT
              </span>
              <span className="font-semibold text-orange-400 sm:text-sm text-[12px]">
                -₹{(total * 0.1).toFixed(2)}
              </span>
            </div>
          )}

          <hr />
          <div className="flex sm:text-sm text-[12px] justify-between pt-4">
            <span>TOTAL AMOUNT</span>
            <span>₹{discountedTotal.toFixed(2)}</span>
          </div>
        </div>
        <hr />
        {/* <div className="mt-4 flex gap-4">
          <div className="relative w-full bg-transparent">
            <input
              type="text"
              id="coupon"
              name="coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full p-3 border-2 rounded-[5px] focus:outline-none focus:ring-[#FFF] peer bg-transparent bor text-[14px]"
            />
            <label
              htmlFor="coupon"
              className={`absolute text-[12px] left-3 top-4 transition-all duration-200 transform ${
                coupon
                  ? "-translate-y-10 -translate-x-2 text-sm text-[#000000]"
                  : "peer-focus:-translate-y-10 peer-focus:text-[12px] peer-focus: peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[12px] text-[#6d6d6d]"
              }`}
            >
              Coupon Code
            </label>
          </div>
          <button
            className="text-white bg-black px-3 py-2 rounded-[5px] hover:bg-gray-700 transition w-1/2 text-[12px] sm:text-xs"
            onClick={() => {
              const discountAmount = applyCoupon();
              if (discountAmount > 0) {
                alert(
                  `Coupon applied! You saved an additional ₹${discountAmount.toFixed(
                    2
                  )}`
                );
              }
            }}
          >
            Apply Coupon
          </button>
        </div> */}
      </div>
      <div className=" mt-10">
        <div className="relative w-full bg-transparent">
          <input
            type="text"
            id="instaHandle"
            name="instaHandle"
            value={instaHandle}
            onChange={(e) => setInstaHandle(e.target.value)}
            className="w-full p-3 border-2 rounded-[5px] focus:outline-none focus:ring-[#FFF] peer bg-transparent bor text-[14px]"
          />
          <label
            htmlFor="instaHandle"
            className={`absolute text-[12px] left-3 top-4 transition-all duration-200 transform ${
              instaHandle
                ? "-translate-y-10 -translate-x-2 text-sm text-[#000000]"
                : "peer-focus:-translate-y-10 peer-focus:text-[12px] peer-focus: peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[12px] text-[#6d6d6d]"
            }`}
          >
            Instagram Handle (optional)
          </label>
        </div>
      </div>
      {/* Add Magic Checkout Button */}
      <button
        className="mt-4"
        onClick={() => {
          if (instaHandle && typeof window !== "undefined") {
            localStorage.setItem("instaHandle", instaHandle);
          }
        }}
        name="proceed-to-checkout-button"
      >
        <MagicCheckoutButton
          checkoutItem={user ? cartItems : localCart}
          user={user}
          type="Cart"
          buttonName="CHECKOUT"
          className={`text-white md:rounded-md px-4 py-5 md:py-5 text-xs w-full border-1 border-black bg-black md:static fixed bottom-0 left-0 right-0 rounded-none z-[1000]`}
        />
      </button>
      <Link
        className="text-xs mt-4 flex items-center justify-start gap-2"
        to="/shop-all"
      >
        <p>Continue Shopping</p>
        <FaGreaterThan className="text-xs" />
      </Link>
    </div>
  );
};

export default CartSummary;
