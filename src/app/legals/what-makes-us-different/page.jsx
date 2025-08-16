import React from "react";
export const metadata = {
  title: "What Makes Us Different | DRIP STUDIOS",
  description: "Learn about what makes us different.",
};
const page = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center">
        What Makes Us Different
      </h2>
      <p className="text-base text-black mb-8">
        At Drip Studios, your satisfaction is our top priority. We believe in
        transparency and fairness, which is why our return and exchange policy
        is designed to protect both you and our brand.
      </p>

      <h3 className="text-[18px] font-bold mb-4">
        1. Clear Return & Refund Policy
      </h3>
      <ul className="list-disc list-inside mb-4">
        <li className="px-4">
          <strong>No refunds are offered under any circumstances.</strong>
        </li>
        <li className="px-4">
          All eligible return requests (in special cases) are compensated only
          through <strong>store credits</strong>, which can be used for future
          purchases.
        </li>
      </ul>

      <h3 className="text-[18px] font-bold mb-4">2. When Can You Return?</h3>
      <ul className="list-disc list-inside mb-4">
        <li className="px-4">
          Returns are strictly allowed only if the product is{" "}
          <strong>damaged or defective upon arrival</strong> (e.g., torn
          clothing, manufacturing defects, ink stains, or misprints).
        </li>
        <li className="px-4">
          Return requests must be made within{" "}
          <strong>2 days of delivery</strong>.
        </li>
      </ul>

      <h3 className="text-[18px] font-bold mb-4">3. How to Request a Return</h3>
      <ul className="list-disc list-inside mb-4">
        <li className="px-4">
          You must submit a <strong>clear unboxing video</strong> of the
          product, showing the full packaging and product as received (unedited
          and continuous).
        </li>
        <li className="px-4">
          Return requests without an unboxing video will not be accepted.
        </li>
        <li className="px-4">
          Email us at <span className="text-blue-500">ifeeldrip@gmail.com</span>{" "}
          with your order details and video.
        </li>
      </ul>

      <h3 className="text-[18px] font-bold mb-4">
        4. If Your Return is Approved
      </h3>
      <ul className="list-disc list-inside mb-4">
        <li className="px-4">
          The entire amount will be credited to your account as{" "}
          <strong>store credits</strong>.
        </li>
        <li className="px-4">
          There will be no extra charge for returns that qualify due to defects.
        </li>
        <li className="px-4">
          Store credits do not expire and can be used anytime.
        </li>
      </ul>

      <h3 className="text-[18px] font-bold mb-4">5. Important Notes</h3>
      <ul className="list-disc list-inside mb-4">
        <li className="px-4">
          Items sent for return must be unused, unwashed, and in original
          packaging.
        </li>
        <li className="px-4">
          Return and exchange rights will be forfeited in case of late requests,
          lack of required proof, or if the product is not in its original
          condition.
        </li>
      </ul>

      <h3 className="text-[18px] font-bold mb-4">6. Customer Care Support</h3>
      <ul className="list-disc list-inside mb-4">
        <li className="px-4">
          Text us via SMS or WhatsApp only (calls are not accepted directly).
        </li>
        <li className="px-4">
          Customer care working hours: Tuesday to Saturday, 10:00 AM – 8:00 PM.
        </li>
        <li className="px-4">
          We will respond within 24 hours. If you request a callback, we will
          call you back within 24 hours.
        </li>
      </ul>

      <p className="text-sm text-gray-500 italic mt-6">
        <strong>Disclaimer:</strong> This policy is determined solely by DRIP
        CORPORATION. Razorpay is not liable for any content or claims related to
        this policy and assumes no responsibility for the merchant's compliance
        with the terms outlined above.
      </p>
    </div>
  );
};

export default page;
