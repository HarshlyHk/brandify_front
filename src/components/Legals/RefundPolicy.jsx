"use client"

import React, { useEffect } from "react";

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold border-b border-gray-300 pb-3">
        Return Policy
      </h1>

      <p className="text-sm text-gray-500">Last updated on November 9, 2023</p>

      <p>
        At <strong>DRIP CORPORATION</strong>, customer satisfaction is our top
        priority. We strive to ensure that every product meets your
        expectations.
      </p>

      <p className="font-semibold">
        We do not offer refunds under any circumstances.
      </p>
      <p>
        All eligible return requests (in special cases) will be compensated only
        through store credits, which can be used on future purchases with us.
      </p>

      <ul className="list-disc list-inside space-y-3">
        <li className="font-semibold">
          Returns are strictly allowed only if the product is damaged or
          defective upon arrival. This includes:
        </li>
        <ul className="list-disc list-inside pl-5">
          <li>Torn or ripped clothing</li>
          <li>Products with visible manufacturing defects</li>
          <li>Ink stains or misprints</li>
        </ul>
        <li className=" font-semibold">To request a return:</li>
        <ul style={{ listStyleType: "disc" }} className="ml-10">
          <li>
            You must submit a clear unboxing video of the product. This video
            must show the full packaging and product as received, it should be
            unedited and continuous.
          </li>
          <li>
            Return requests without an unboxing video will not be accepted.
          </li>
          <li>
            Email us directly at{" "}
            <span className="text-blue-500"> ifeeldrip@gmail.com</span>{" "}
          </li>
        </ul>
        <li className=" font-semibold">If the return is approved:</li>
        <ul style={{ listStyleType: "disc" }} className="ml-10">
          <li>
            The entire amount will be credited to your account as store credits.
          </li>
          <li>
            There will be no extra charge for returns that qualify due to
            defects. .
          </li>
        </ul>
        <li className="font-semibold">Processing Time for Return</li>
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
            Items sent for return must be unused, unwashed, and in original
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

export default RefundPolicy;
