"use client";
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder, updateOrderDetails } from "@/features/OrderSlice";
import Lottie from "lottie-react"; // Import Lottie
import successAnimation from "@/assets/lottie/Success.json"; // Import your animation JSON file
import { useState } from "react"; // Import useState
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // If you have a Button component
import axiosInstance from "@/config/axiosInstance";
import { toast } from "sonner";
import OrderProgressBar from "@/components/Order/OrderProgressBar";
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
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // const referralCode = localStorage.getItem("referralCode");
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

  const handleCancelOrder = async () => {
    setCancelLoading(true);
    try {
      // Replace with your actual API endpoint
      const res = await axiosInstance.post(
        `/orders/${order._id}/cancel-cod-within-30-mins`
      );
      const data = res.data;
      if (data.status == 200) {
        await dispatch(getSingleOrder(order._id)); // Refresh order details
        toast.success("Order cancelled successfully.");
        setCancelDialogOpen(false);
      } else {
        toast.error(data.message || "Failed to cancel order.");
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
      toast.error("An error occurred while cancelling the order.");
    }
    setCancelLoading(false);
  };

  if (!order) return null;

  if (order.status === "Cancelled") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10 text-gray-900 bg-white">
        <div className="w-full max-w-md mx-auto p-8 rounded-[5px] flex flex-col items-center bg-gray-50 shadow">
          <div className="w-24 h-24 mb-4 flex items-center justify-center rounded-full bg-red-100">
            <svg
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 24 24"
              stroke="red"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <line x1="8" y1="8" x2="16" y2="16" strokeWidth="2" />
              <line x1="16" y1="8" x2="8" y2="16" strokeWidth="2" />
            </svg>
          </div>
          <h1 className="text-2xl text-red-600 mb-2 font-helvetica">
            Order Cancelled
          </h1>
          <p className="text-center text-gray-700 font-helvetica">
            Your order has been cancelled.
            <br />
            If you have any questions, please contact support.
          </p>
          <button
            onClick={() => navigate.shop("/")}
            className="mt-8 w-full flex items-center justify-center gap-2 text-xs text-white bg-black hover:bg-gray-800 py-4 rounded-[5px] transition-all uppercase font-helvetica"
          >
            Continue Shopping <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10  text-gray-900">
      <div className="w-full max-w-4xl  p-6 sm:p-10 rounded-[5px] ">
        {/* Success Message */}
        <div className=" mb-8">
          <div className="w-32 h-32 mx-auto mb-4 flex flex-col items-center justify-center rounded-full bg-green-100">
            <Lottie animationData={successAnimation} loop={true} />
          </div>

          <div className="flex flex-col gap-4 font-helvetica">
            <h1 className="text-xl uppercase text-center font-bold  font-helvetica">
              Thank you!
            </h1>
            <h3 className="text-lg font-semibold uppercase text-center font-helvetica">
              Your order has been placed.
            </h3>
            <p className="text-sm  font-helvetica">
              We’ve received your order and will keep you updated on
              <span className=" text-black"> {order?.email}</span>
            </p>
            <p className="text-sm  font-helvetica">
              You can track your order status by logging into your account or by
              using your Order ID.
            </p>
            {order?.preBook && (
              <p className="text-sm text-red-500 font-helvetica">
                Your order is expected to be delivered within 7–10 business
                days.
              </p>
            )}
          </div>
        </div>

        {order.paymentMethod === "COD" &&
          (!order.shippingAddress.landmark ||
            !order.shippingAddress.alternatePhoneNumber) && (
            <div className="mb-8">
              <h3 className="md:text-sm text-xs text-center text-red-500 font-semibold mb-4 border-b pb-1 uppercase font-helvetica">
                For a hassle-free delivery, do provide us your landmark and
                alternative phone number
              </h3>
              <div className="grid gap-4 text-sm text-gray-700">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  {!order.shippingAddress.landmark && (
                    <div className="w-full">
                      <label
                        htmlFor="landmark"
                        className="block text-sm font-medium text-gray-700 mb-1 font-helvetica"
                      >
                        Landmark (optional)
                      </label>
                      <input
                        type="text"
                        id="landmark"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition font-helvetica"
                        placeholder="Landmark"
                        required
                      />
                    </div>
                  )}

                  {!order.shippingAddress.alternatePhoneNumber && (
                    <div className="w-full">
                      <label
                        htmlFor="alternatePhone"
                        className="block text-sm font-medium text-gray-700 mb-1 font-helvetica"
                      >
                        Alternative Phone Number (optional)
                      </label>
                      <input
                        type="text"
                        id="alternatePhone"
                        value={alternatePhone}
                        onChange={(e) => setAlternatePhone(e.target.value)}
                        className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition font-helvetica"
                        placeholder="Alternative phone number"
                        required
                      />
                    </div>
                  )}

                  {!order.insta_handle && (
                    <div className="w-full">
                      <label
                        htmlFor="Insta Handle"
                        className="block text-sm font-medium text-gray-700 mb-1 font-helvetica"
                      >
                        Insta Handle (optional)
                      </label>
                      <input
                        type="text"
                        id="instaHandle"
                        value={instaHandle}
                        onChange={(e) => setInstaHandle(e.target.value)}
                        className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition font-helvetica"
                        placeholder="Your Instagram handle"
                        required
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 text-xs text-white bg-black hover:bg-gray-800 py-5 rounded-[5px] transition-all uppercase font-helvetica"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

        <OrderProgressBar createdAt={order.createdAt} />
        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-1 uppercase font-helvetica">
            Order Summary
          </h3>
          <div className="grid gap-2 text-sm text-gray-700 font-helvetica">
            <p className="font-helvetica">
              <strong className="font-helvetica">Order ID:</strong>{" "}
              {order.transactionId}
            </p>
            <p className="font-helvetica">
              <strong className="font-helvetica">Payment Method:</strong>{" "}
              {order.paymentMethod}
            </p>
            <p className="font-helvetica">
              <strong className="font-helvetica">Payment Status:</strong>{" "}
              {order.paymentStatus}
            </p>
            <p className="font-helvetica">
              <strong className="font-helvetica">Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="font-helvetica">
              <strong className="font-helvetica">Total:</strong> ₹
              {order.totalAmount}
            </p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-1 uppercase font-helvetica">
            Shipping Address
          </h3>
          <div className="text-sm space-y-2 text-gray-700">
            <p className="font-helvetica">
              <strong className="font-helvetica">Name:</strong>{" "}
              {order.shippingAddress.fullName}
            </p>
            <p className="font-helvetica">
              <strong className="font-helvetica">Phone:</strong>{" "}
              {order.shippingAddress.phoneNumber}
            </p>
            {order.shippingAddress.alternatePhoneNumber && (
              <p className="font-helvetica">
                <strong className="font-helvetica">Alternate:</strong>{" "}
                {order.shippingAddress.alternatePhoneNumber}
              </p>
            )}
            <p className="font-helvetica">
              <strong className="font-helvetica">Address:</strong>{" "}
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
          <h3 className="text-lg font-semibold mb-4 border-b pb-1 uppercase font-helvetica">
            Ordered Products
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {order.products.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg p-4  border-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="md:w-20 md:h-20 h-16 w-16 object-cover rounded-md"
                />
                <div className="flex-1 text-sm">
                  <div className="flex justify-between font-medium font-helvetica">
                    <p>{product.name}</p>
                    <p className="text-gray-500 uppercase text-xs font-helvetica">
                      Size: {product.size}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-600 ">
                    <p className="font-helvetica">Qty: {product.quantity}</p>
                    <p className="font-helvetica">Price: ₹{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Continue Shopping */}
        <button
          onClick={() => navigate.shop("/")}
          className="w-full flex items-center justify-center gap-2 text-xs text-white bg-black hover:bg-gray-800 py-5 rounded-[5px] transition-all uppercase font-helvetica"
        >
          Continue Shopping <ArrowRight size={16} />
        </button>

        {/* Cancel Order Button for COD orders */}
        {order.paymentMethod === "COD" && order.status !== "Cancelled" && (
          <div className="mt-8 flex justify-center">
            <button
              className="w-full flex items-center justify-center gap-2 text-xs text-white bg-[red] hover:bg-red-800 py-5 rounded-[5px] transition-all uppercase font-helvetica"
              onClick={() => setCancelDialogOpen(true)}
            >
              Cancel Order
            </button>
          </div>
        )}

        {/* Cancel Confirmation Dialog */}
        <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="!text-lg !mb-0 !text-start">
                <p className="font-helvetica">Cancel Order?</p>
              </DialogTitle>
            </DialogHeader>
            <div className="">
              <p className="mb-4 text-sm">
                Are you sure you want to cancel this order? This action cannot
                be undone.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  className="px-4 py-2 rounded bg-green-500 hover:bg-green-700 text-sm text-white"
                  onClick={() => setCancelDialogOpen(false)}
                  disabled={cancelLoading}
                >
                  Keep Order
                </button>
                <button
                  className="px-4 text-sm py-2 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={handleCancelOrder}
                  disabled={cancelLoading}
                >
                  {cancelLoading ? "Cancelling..." : " Cancel Order"}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OrderSuccess;
