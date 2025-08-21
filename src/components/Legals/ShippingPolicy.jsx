"use client"
import React, { useEffect } from "react";

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-semibold border-b border-gray-600 pb-2">
        Shipping & Delivery Policy
      </h1>

      <p className="text-sm text-gray-400">Last updated on Nov 9th, 2023</p>

      <p>
        For International buyers, orders are shipped and delivered through
        registered international courier companies and/or International speed
        post only. For domestic buyers, orders are shipped through registered
        domestic courier companies and/or speed post only.
      </p>

      <p>
        Orders are shipped within 6-8 days or as per the delivery date agreed at
        the time of order confirmation and delivering of the shipment subject to
        Courier Company / post office norms.
      </p>

      <p>
        DRIP CORPORATION is not liable for any delay in delivery by the courier
        company / postal authorities and only guarantees to hand over the
        consignment to the courier company or postal authorities within 6-8 days
        from the date of the order and payment or as per the delivery date
        agreed at the time of order confirmation.
      </p>

      <p>
        Delivery of all orders will be to the address provided by the buyer.
        Delivery of our services will be confirmed on your mail ID as specified
        during registration.
      </p>
      <p>
        
      </p>

      <p>
        For any issues in utilizing our services you may contact our helpdesk on{" "}
        <span className="text-blue-500 font-medium">8527877846</span> or email
        us at{" "}
        <span className="text-blue-500 font-medium">ifeeldrip@gmail.com</span>.
      </p>
    </div>
  );
};

export default ShippingPolicy;
