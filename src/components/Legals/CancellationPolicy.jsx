"use client";

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
                <li>
                  To initiate a request, contact us via{" "}
                  <a
                    href="https://wa.me/919971741201"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 text-green-500"
                  >
                    WhatsApp us +91 99717 41201
                  </a> {" "}
                  or{" "}
                  <a
                    href="mailto:dripstudios09@gmail.com?subject=Exchange%20Request"
                    target="_blank"
                    className="underline underline-offset-2 text-blue-500"
                  >
                    email at dripstudios09@gmail.com
                  </a>
                  .
                </li>
                We will arrange a pickup, and once collected, the replacement
                will be dispatched within <strong>48 hours</strong>.
              </li>
              <li>
                A nominal <strong>₹150 exchange fee</strong> will be applicable
                per article.
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
            </ul>
            <p className="mt-2">
              In such cases, customers can opt for a{" "}
              <strong>return or exchange</strong>, and{" "}
              <strong>all logistics charges (both ways)</strong> will be covered
              by us.
            </p>
          </div>
        </div>
      </section>

      {/* Discounted Articles */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">2. Discounted Articles</h3>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium">Return & Exchange</h3>
            <p className="mt-2">
              Returns and exchanges are <strong>not applicable</strong> on
              discounted/sale items, as they are already offered at up to{" "}
              <strong>50% off</strong>.
            </p>
            <p className="mt-2">
              In exceptional cases (e.g., <strong>first-time customers</strong>
              ), an <strong>exchange may be permitted</strong> under these
              conditions:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                Only for a <strong>different size of the same article</strong>.
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
                <strong>quality check</strong>; otherwise, the same article will
                be returned.
              </li>
            </ul>
            <p className="mt-2 font-semibold">
              ⚠️ All handling, return, and reshipment charges are to be borne by
              the customer.
            </p>
          </div>
        </div>
      </section>

      {/* Address */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">
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
              Do not dispatch articles without prior confirmation from our team.
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
