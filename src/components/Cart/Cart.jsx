"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  updateCartItemQuantity,
  removeFromCart,
} from "@/features/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userLoading } = useSelector((state) => state.user);
  const { cartItems, error, quantityLoading, actionLoading, loading } =
    useSelector((state) => state.cart);
  const [localCart, setLocalCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user && typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setLocalCart(storedCart);
    } else {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  const itemsToRender = user ? cartItems : localCart;

  const handleQuantityChange = (productId, size, delta) => {
    if (user) {
      dispatch(updateCartItemQuantity({ productId, size, delta }));
    } else {
      const updatedCart = localCart.map((item) => {
        if (item.productId === productId && item.size === size) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      });
      setLocalCart(updatedCart);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }
  };

  const handleRemoveFromCart = (productId, size) => {
    if (user) {
      dispatch(removeFromCart({ productId, size }));
    } else {
      const updatedCart = localCart.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
      setLocalCart(updatedCart);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }
  };


  if (loading)
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (itemsToRender.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen px-4 md:px-6 py-10">
      {quantityLoading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {actionLoading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 min-h-screen">
        <div className="lg:col-span-2 md:pt-6">
          <h3 className="text-xl uppercase font-bold text-center md:mb-0 mb-4">
            YOUR CART
          </h3>

          <div className="space-y-6">
            { itemsToRender && itemsToRender.map((item, index) => (
              <>
                <CartItem
                  key={index}
                  item={item}
                  user={user}
                  handleQuantityChange={handleQuantityChange}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
                <hr />
              </>
            ))}
          </div>
        </div>
        <CartSummary
          user={user}
          cartItems={cartItems}
          localCart={localCart}
        />
      </div>
    </div>
  );
};

export default Cart;
