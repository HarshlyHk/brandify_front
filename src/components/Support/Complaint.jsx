"use client"
import React, { useState } from "react";
import axiosInstance from "@/config/axiosInstance";

import Link from "next/link";

const ReturnExchange = () => {
  const [formData, setFormData] = useState({
    orderId: "",
    name: "",
    message: "",
    type: "Exchange",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");
    setSuccess("");

    const { orderId, name, message } = formData;

    if (!orderId || !name || !message) {
      setError("All fields are required.");
      return;
    }

    try {
      await axiosInstance.post("/support/return-exchange", formData);
      setSuccess(true);
      setLoading(false);
      setFormData({ orderId: "", name: "", message: "", type: "Exchange" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <>
      {success ? (
        <div className=" h-screen flex items-center justify-center px-4 ">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-xl font-semibold text-gray-800">
                Request Submitted Successfully.
              </h1>
            </div>
            <p className="text-sm text-gray-800 mb-2">
              Thank you for reaching out. We've received your exchange request.
            </p>
            <p className="text-sm text-gray-800 mb-8">
              Please check your email for confirmation and further instructions.
              We’ll get back to you as soon as possible.
            </p>
            <div className="text-center">
              <Link
                href="/"
                className="w-full bg-black text-white py-4 text-xs px-4 rounded-[5px] hover:bg-gray-800 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className=" md:w-[600px] w-full mx-auto mt-16 p-8 rounded-[10px] ">
          <h1 className="text-2xl font-semibold mb-6 text-center uppercase">
            Exchange Product
          </h1>
          <p className="text-sm text-gray-500 mb-2 text-center">
            Fill in the form below to submit exchange request.
          </p>
          <p className="text-sm text-gray-500 mb-8 text-center">
            ₹99 will be charged for exchange of product. This is to cover the
            shipping cost and handling fees.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order ID
                </label>
                <input
                  type="text"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                  placeholder="e.g., order_xY********qwbde"
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                placeholder="Describe the reason to exchange the product..."
                required
              ></textarea>
            </div>

            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-4 text-xs px-4 rounded-[5px] hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>

       
        </div>
      )}
    </>
  );
};

export default ReturnExchange;
