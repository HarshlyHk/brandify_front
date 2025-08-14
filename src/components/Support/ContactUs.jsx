"use client"
import React, { useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import Link from "next/link";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/contact-us/add", formData);
      setSuccess(true);
      setLoading(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <>
      {success ? (
        <div className="h-screen flex items-center justify-center px-4">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-xl font-semibold text-gray-800">
                Message Sent Successfully.
              </h1>
            </div>
            <p className="text-sm text-gray-800 mb-2">
              Thank you for reaching out. We’ve received your message.
            </p>
            <p className="text-sm text-gray-800 mb-8">
              We’ll get back to you as soon as possible via email.
            </p>
            <div className="text-center">
              <Link
                to="/"
                className="w-full bg-black text-white py-4 text-xs px-4 rounded-[5px] hover:bg-gray-800 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:w-[600px] w-full mx-auto mt-16 p-8 rounded-[10px]">
          <h1 className="text-2xl font-semibold mb-6 text-center uppercase">
            Contact Us
          </h1>
          <p className="text-sm text-gray-500 mb-2 text-center">
            Fill in the form below to send us a message.
          </p>

          <div className="mb-8 text-center text-sm">
            <p className=" text-gray-500 text-center">
              Payment completed but didn’t receive a confirmation?
            </p>

            <Link href="/support/payment-query" className="text-blue-600 hover:underline">
              Click here to submit a payment query.
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex gap-4 flex-col md:flex-row">
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

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                  placeholder="e.g., john.doe@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                placeholder="e.g., +1234567890"
                required
              />
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
                placeholder="Write your message here..."
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
              {loading ? "Submitting..." : "Submit Message"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ContactUs;
