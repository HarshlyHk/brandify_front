"use client"
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder, updateOrderDetails } from "@/features/OrderSlice";
import Lottie from "lottie-react"; // Import Lottie
import successAnimation from "@/assets/lottie/Success.json"; // Import your animation JSON file
import { useState } from "react"; // Import useState
const OrderSuccess = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useRouter();
  const order = useSelector((state) => state.orders?.singleOrder);
  const [landmark, setLandmark] = useState(
    order?.shippingAddress?.landmark || ""
  );
  const [alternatePhone, setAlternatePhone] = useState(
    order?.shippingAddress?.alternatePhoneNumber || ""
  );
  const [instaHandle, setInstaHandle] = useState(
    order?.shippingAddress?.insta_handle || ""
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    const referralCode = localStorage.getItem("referralCode");
    const fetchOrder = async () => {
      try {
        if (orderId) {
          await dispatch(getSingleOrder(orderId));
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrder();
  }, [orderId, dispatch]);

  const handleSubmit = () => {
    if (!landmark && !alternatePhone && !instaHandle) {
      alert(
        "Please provide at least one detail (landmark, alternate phone, or Instagram handle)."
      );
      return;
    }

    if (
      alternatePhone.slice(-10) === order.shippingAddress.phoneNumber.slice(-10)
    ) {
      alert(
        "Alternate phone number cannot be the same as the primary phone number."
      );
      return;
    }
    dispatch(
      updateOrderDetails({
        orderId: order._id,
        landmark: landmark,
        alternatePhone: alternatePhone,
        insta_handle: instaHandle,
      })
    );
    setLandmark("");
    setAlternatePhone("");
    setInstaHandle("");
  };

  if (!order) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50 text-gray-900">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-[5px] border-1">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4 flex flex-col items-center justify-center rounded-full bg-green-100">
            <Lottie animationData={successAnimation} loop={true} />
          </div>

          <div className="flex flex-col items-center gap-4">
            <h1 className="text-xl uppercase font-bold ">Thank you!</h1>
            <h3 className="text-lg font-semibold uppercase">
              Your order has been placed.
            </h3>
            <p className="text-sm text-gray-700">
              We’ve received your order and will keep you updated on
              <span className=" text-black"> {order?.email}</span>
            </p>
            <p className="text-sm text-gray-600">
              You can track your order status by logging into your account or by
              using your Order ID.
            </p>
          </div>
        </div>

        {order.paymentMethod === "COD" &&
          (!order.shippingAddress.landmark ||
            !order.shippingAddress.alternatePhoneNumber) && (
            <div className="mb-8">
              <h3 className="md:text-sm text-xs text-center text-red-500 font-semibold mb-4 border-b pb-1 uppercase">
                For a hassle-free delivery, do provide us your landmark and
                alternative phone number
              </h3>
              <div className="grid gap-4 text-sm text-gray-700">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  {!order.shippingAddress.landmark && (
                    <div className="w-full">
                      <label
                        htmlFor="landmark"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Landmark (optional)
                      </label>
                      <input
                        type="text"
                        id="landmark"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                        placeholder="Landmark"
                        required
                      />
                    </div>
                  )}

                  {!order.shippingAddress.alternatePhoneNumber && (
                    <div className="w-full">
                      <label
                        htmlFor="alternatePhone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Alternative Phone Number (optional)
                      </label>
                      <input
                        type="text"
                        id="alternatePhone"
                        value={alternatePhone}
                        onChange={(e) => setAlternatePhone(e.target.value)}
                        className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                        placeholder="Alternative phone number"
                        required
                      />
                    </div>
                  )}

                  {!order.insta_handle && (
                    <div className="w-full">
                      <label
                        htmlFor="Insta Handle"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Insta Handle (optional)
                      </label>
                      <input
                        type="text"
                        id="instaHandle"
                        value={instaHandle}
                        onChange={(e) => setInstaHandle(e.target.value)}
                        className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                        placeholder="Your Instagram handle"
                        required
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 text-xs text-white bg-black hover:bg-gray-800 py-5 rounded-[5px] transition-all uppercase"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-1 uppercase">
            Order Summary
          </h3>
          <div className="grid gap-2 text-sm text-gray-700">
            <p>
              <strong>Order ID:</strong> {order.transactionId}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-1 uppercase">
            Shipping Address
          </h3>
          <div className="text-sm space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {order.shippingAddress.fullName}
            </p>
            <p>
              <strong>Phone:</strong> {order.shippingAddress.phoneNumber}
            </p>
            {order.shippingAddress.alternatePhoneNumber && (
              <p>
                <strong>Alternate:</strong>{" "}
                {order.shippingAddress.alternatePhoneNumber}
              </p>
            )}
            <p>
              {order.shippingAddress.street}, {order.shippingAddress.locality},
              {order.shippingAddress.landmark &&
                ` ${order.shippingAddress.landmark}, `}
              {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
              {order.shippingAddress.zipCode}, {order.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Ordered Products */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-1 uppercase">
            Ordered Products
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {order.products.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg p-4 bg-[white] border-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="md:w-20 md:h-20 h-16 w-16 object-cover rounded-md"
                />
                <div className="flex-1 text-sm">
                  <div className="flex justify-between font-medium">
                    <p>{product.name}</p>
                    <p className="text-gray-500 uppercase text-xs">
                      Size: {product.size}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-600">
                    <p>Qty: {product.quantity}</p>
                    <p>Price: ₹{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Shopping */}
        <button
          onClick={() => navigate.shop("/")}
          className="w-full flex items-center justify-center gap-2 text-xs text-white bg-black hover:bg-gray-800 py-5 rounded-[5px] transition-all uppercase"
        >
          Continue Shopping <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
