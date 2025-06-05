import React, { useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import dayjs from "dayjs";
import { Link } from "react-router";

const tabs = [
  { label: "Email", value: "email" },
  { label: "Phone Number", value: "phoneNumber" },
  { label: "Order ID", value: "order_id" },
];

const TrackOrder = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [input, setInput] = useState("");
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const handleTabChange = (index) => {
    setTabIndex(index);
    setInput("");
    setOrders([]);
    setStatus("idle");
    setError("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const getPlaceholder = () => {
    if (tabs[tabIndex].value === "email") return "Enter your email";
    if (tabs[tabIndex].value === "phoneNumber")
      return "Enter your phone number";
    return "Enter your order ID";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setOrders([]);
    try {
      const paramKey = tabs[tabIndex].value;
      const res = await axiosInstance.get(
        `/user/get-orders?${paramKey}=${encodeURIComponent(input)}`
      );
      setOrders(res.data.data || []);
      setStatus("success");
      if (!res.data.data || res.data.data.length === 0) {
        setError("No orders found.");
      }
    } catch (err) {
      setStatus("error");
      setError(
        err.response?.data?.message ||
          "Failed to fetch orders. Please try again."
      );
    }
  };

  return (
    <div className="md:w-[600px] w-full  mx-auto mt-16 p-8 ">
      <h1 className="text-2xl font-semibold mb-6 text-center uppercase">
        Track Your Order
      </h1>
      {/* Tabs */}
      <div className="flex md:flex-row flex-col md:gap-6 border-b px-4 pt-4 justify-center mb-6">
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(index)}
            className={`relative p-4 text-[12px] rounded-[5px] md:rounded-none md:text-[14px] uppercase font-medium transition-all ${
              tabIndex === index
                ? "text-white bg-[#323232]"
                : "text-[#6d6c6c] hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <input
          type={tabIndex === 1 ? "tel" : "text"}
          value={input}
          onChange={handleInputChange}
          placeholder={getPlaceholder()}
          className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-4 mt-8 text-xs px-4 rounded-[5px] hover:bg-gray-800 transition"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Searching..." : "Track Order"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="text-red-500 text-center mb-4 text-sm">{error}</div>
      )}

      {/* Orders */}
      {status === "success" && orders.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Your Orders
          </h2>
          {orders.map((order) => (
            <div key={order._id} className="mb-8 p-6 rounded-[5px]">
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 justify-between text-sm text-zinc-700">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-zinc-800 uppercase">
                      Order ID:
                    </div>
                    <div>{order.transactionId}</div>
                  </div>
                  <div>
                    {dayjs(order.createdAt).format("DD MMM YYYY, hh:mm A")}
                  </div>
                </div>
                <div className="flex flex-wrap justify-between text-sm mt-2 ">
                  <span>
                    Delivery Status:{" "}
                    <span className="font-medium">{order.status}</span>
                  </span>
                  <span>
                    Payment: {order.paymentMethod}{" "}
                    <span
                      className={`${
                        order.paymentStatus === "Completed"
                          ? "text-green-700"
                          : "text-red-500"
                      } font-medium`}
                    >
                      ({order.paymentStatus})
                    </span>
                  </span>
                  <span>Total: ₹{order.totalAmount}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.products.map((product, idx) => (
                  <div
                    key={idx}
                    className="flex border border-zinc-200 rounded-[5px] p-3 space-x-4 items-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="md:w-20 md:h-20 h-14 w-14 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold md:text-base text-sm">
                        {product.name}
                      </h4>
                      <p className="text-xs md:text-sm text-zinc-500">
                        ₹{product.price} × {product.quantity} — Size:{" "}
                        {product.size}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <button className="mt-6 w-full bg-zinc-800 text-white py-4 text-xs px-4 rounded-[5px] hover:bg-zinc-700 transition md:w-[300px]">
                  <Link to={`/view-order/${order._id}`}>View Order</Link>
                </button>
              </div>
              <hr className="mt-10" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
