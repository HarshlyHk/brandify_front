"use client"

import React, { useEffect } from "react";
import Link from "next/link";

const CancellationPolicy = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold border-b border-gray-300 pb-3">
        Exchange Policy
      </h1>

      <p className="text-sm text-gray-500">Last updated on November 9, 2023</p>

      <p>
        At <strong>DRIP CORPORATION</strong>, customer satisfaction is our top
        priority. We strive to ensure that every product meets your
        expectations. In case you're not completely satisfied, our refund and
        cancellation policy provides a fair resolution process.
      </p>

      <div className=" border-l-4 p-4 mb-6">
        <p className="">
          <strong>Important Notice:</strong> All prepaid orders cannot be cancelled once the payment has been processed. This policy ensures efficient order processing and inventory management.
        </p>
      </div>

      <p className="font-semibold">
        We offer exchanges under the following conditions:
      </p>
      <ul className="list-disc list-inside space-y-3">
        <li>
          Articles purchased under the "Blind Drop", "Festive Sale", or "Drip Under
          ₹1199" categories are not eligible for return. However, exchanges will
          be accepted only in case of a defective item.
        </li>
        <li>
          Eligibility Timeframe: Exchange requests must be made within 2 days of
          the delivery date.
        </li>
        <li className=" font-semibold">How to Request:</li>
        <p className="px-5">
          Customers can initiate an exchange through any of the following
          methods:
        </p>
        <ul style={{ listStyleType: "disc" }} className="ml-10">
          <li>
            The{" "}
            <Link href="/support/return-and-refund" className="text-blue-500">
              Exchange Panel
            </Link>{" "}
            on our website
          </li>
          <li>
            The{" "}
            <Link href="/support/contact-us" className="text-blue-500">
              {" "}
              Contact Us{" "}
            </Link>
            section on our website
          </li>
          <li>
            Email us directly at{" "}
            <span className="text-blue-500"> ifeeldrip@gmail.com</span>{" "}
          </li>
        </ul>
        <li className=" font-semibold">What Can Be Exchanged:</li>
        <ul style={{ listStyleType: "disc" }} className="ml-10">
          <li>
            You can exchange your product for a different size of the same item
            (subject to availability).
          </li>
          <li>You can also exchange it for a different product.</li>
          <ul className="list-disc list-inside ">
            <li>
              If the new product has a lower value, the difference will be
              credited to your account as store credits
            </li>
            <li>
              If the new product has a higher value, you will be required to pay
              the additional amount.
            </li>
          </ul>
        </ul>
        <li className=" font-semibold">Exchange Fee:</li>
        <p className="pl-5">
          A fixed charge of ₹149 will be applicable on all exchange requests.
          This fee covers handling and shipping.
        </p>
        <li className="font-semibold">Processing Time for Exchanges</li>
        <ul className="list-disc list-inside pl-5">
          <li>
            Please allow up to 7 business days for processing return or exchange
            requests.
          </li>
          <li>
            Each request is reviewed individually and handled step-by-step to
            ensure fair resolution.
          </li>
          <li>
            We request you to maintain patience while our team ensures your
            issue is handled with care and urgency.
          </li>
        </ul>
        <li className=" font-semibold">Customer Care Support</li>
        <p>
          If you have any doubts, issues, or questions related to return or
          exchange:
        </p>
        <ul className="list-disc list-inside pl-5">
          <li>
            Text us via SMS or WhatsApp only (Calls are not accepted directly).
          </li>
          <li>
            Customer care working hours: Tuesday to Saturday, 10:00 AM – 8:00 PM
          </li>
          <li>We will respond within 24 hours.</li>
          <li>
            If you request a callback, we will call you back within 24 hours
            from the time of your request.
          </li>
        </ul>
        <li className=" font-semibold">Important Notes</li>
        <ul className="list-disc list-inside pl-5">
          <li>
            Items sent for exchange must be unused, unwashed, and in original
            packaging.
          </li>
          <li>
            Store credits issued against returns can be used anytime; they do
            not expire.
          </li>
          <li>Return and exchange rights will be forfeited in case of:</li>
          <ul className="list-disc list-inside pl-5">
            <li>Late requests (after 2 days of delivery)</li>
            <li>Lack of required proof (like unboxing video for return)</li>
            <li>
              If the product is not in its original condition, is damaged, or is
              missing parts for reasons not due to our error.
            </li>
          </ul>
        </ul>
      </ul>

      <p className="text-sm text-gray-500 italic">
        <strong>Disclaimer:</strong> This policy is determined solely by DRIP
        CORPORATION. Razorpay is not liable for any content or claims related to
        this policy and assumes no responsibility for the merchant's compliance
        with the terms outlined above.
      </p>
    </div>
  );
};

export default CancellationPolicy;
