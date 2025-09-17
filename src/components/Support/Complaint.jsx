"use client";
import React, { useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";

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
        <div className=" md:w-[800px] w-full mx-auto mt-6 md:mt-16 p-8 rounded-[10px] ">
          <h1 className="text-2xl font-semibold mb-6 text-center uppercase">
            Exchange Product
          </h1>
          {/* contact us icons for whatsapp and email */}
          <div className=" w-full mb-8">
            <p className="text-base text-gray-500 mb-6 flex items-center justify-center gap-4">
              <a
                href="https://wa.me/919971741201"
                target="_blank"
                rel="noopener noreferrer"
                className=" flex items-center "
              >
                <IoLogoWhatsapp
                  className="inline-block mr-1 text-green-500"
                  size={24}
                />
                WhatsApp{" "}
              </a>{" "}
              <a
                href="mailto:dripstudios09@gmail.com?subject=Exchange%20Request"
                target="_blank"
                className="flex items-center "
              >
                <MdEmail
                  className="inline-block mr-1 text-blue-500"
                  size={24}
                />
                Email
              </a>
            </p>
          </div>

          <section>
            <h3 className="text-2xl font-semibold mb-4">
              1. Normal Priced Articles
            </h3>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium">Exchange</h3>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>
                    Exchanges are accepted within{" "}
                    <strong>3 days of delivery</strong>.
                  </li>
                  <li>
                    To initiate a request,{" "}
                    <a
                      href="https://wa.me/919971741201"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 text-green-500"
                    >
                      WhatsApp us at +91 99717 41201
                    </a>
                  </li>
                  <li>
                    Our team will respond within <strong>24 hours</strong>.
                  </li>
                  <li>
                    We will arrange a pickup, and once collected, the
                    replacement will be dispatched within{" "}
                    <strong>48 hours</strong>.
                  </li>
                  <li>
                    A nominal <strong>₹150 exchange fee</strong> will be
                    applicable per article.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium">Return</h3>
                <p className="mt-2">Returns are accepted only if:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Incorrect product delivered</li>
                  <li>Defective or damaged article</li>
                  <li>Visible stains or quality issues</li>
                  <li>Wrong size delivered (different from the order)</li>
                  <li>
                    If you have received a wrong product or incorrect size and
                    contact us within <strong>3 days of delivery</strong>, we
                    will gladly exchange it for the correct product or size at
                    no additional cost. Please note that only exchange is
                    available in such cases, and returns are not applicable.
                  </li>
                </ul>
                <p className="mt-2">
                  In such cases, customers can opt for a{" "}
                  <strong>return or exchange</strong>, and{" "}
                  <strong>all logistics charges (both ways)</strong> will be
                  covered by us.
                </p>

                <p className="mt-2 font-semibold">
                  ⚠️ Customers must provide a clear{" "}
                  <strong>unboxing video</strong> as proof for any return or
                  exchange request.
                </p>
              </div>
            </div>
          </section>

          {/* Discounted Articles */}
          <section>
            <h3 className="text-2xl font-semibold mb-4 mt-4">
              2. Discounted Articles
            </h3>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium">Return & Exchange</h3>
                <p className="mt-2">
                  Returns and exchanges are <strong>not applicable</strong> on
                  discounted/sale items, as they are already offered at up to{" "}
                  <strong>50% off</strong>.
                </p>
                <p className="mt-2">
                  In exceptional cases (e.g.,{" "}
                  <strong>first-time customers</strong>
                  ), an <strong>exchange may be permitted</strong> under these
                  conditions:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>
                    Only for a{" "}
                    <strong>different size of the same article</strong>.
                  </li>
                  <li>If unavailable, swap for another product in stock.</li>
                  <li>
                    Request must be raised within{" "}
                    <strong>48 hours of delivery</strong> via WhatsApp or email.
                  </li>
                  <li>
                    Customer must ship the article back and share valid tracking
                    details within <strong>7 working days</strong>.
                  </li>
                  <li>
                    Exchange will be processed only if the article passes a{" "}
                    <strong>quality check</strong>; otherwise, the same article
                    will be returned.
                  </li>
                </ul>
                <p className="mt-2 font-semibold">
                  ⚠️ All handling, return, and reshipment charges are to be
                  borne by the customer.
                </p>
              </div>
            </div>
          </section>

          {/* Address */}
          <section>
            <h3 className="text-2xl font-semibold mb-4 mt-4">
              Return / Exchange Address
            </h3>
            <p className="mt-2">
              <strong>S-1/201, Old Mahavir Nagar, New Delhi – 110018</strong>
              <br />
              <span>(Landmark: Near Aggarwal Sweets)</span>
            </p>

            <div className="mt-4 space-y-2">
              <p className="font-semibold">⚠️ Important:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Do not dispatch articles without prior confirmation from our
                  team.
                </li>
                <li>
                  Articles sent without approval will be{" "}
                  <strong>returned to the sender</strong> and will{" "}
                  <strong>not be processed</strong>.
                </li>
                <li>
                  All complaints/requests must be raised only via{" "}
                  <strong>WhatsApp (+91 99717 41201)</strong> or{" "}
                  <strong>email (dripstudios09@gmail.com)</strong>.
                </li>
                <li>
                  ⚠️ Complaints on any other number or email ID will{" "}
                  <strong>not be entertained</strong>.
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ReturnExchange;
