"use client"

import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-semibold border-b border-gray-600 pb-2">
        Privacy Policy
      </h1>

      <p>
        This privacy policy sets out how DRIP CORPORATION uses and protects any
        information that you give DRIP CORPORATION when you use this website.
      </p>

      <p>
        DRIP CORPORATION is committed to ensuring that your privacy is
        protected. Should we ask you to provide certain information by which you
        can be identified when using this website, then you can be assured that
        it will only be used in accordance with this privacy statement.
      </p>

      <p>
        DRIP CORPORATION may change this policy from time to time by updating
        this page. You should check this page from time to time to ensure that
        you are happy with any changes.
      </p>

      <h2 className="text-xl font-semibold pt-4">Information We May Collect</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Name and job title</li>
        <li>Contact information including email address</li>
        <li>
          Demographic information such as postcode, preferences and interests
        </li>
        <li>Other information relevant to customer surveys and/or offers</li>
      </ul>

      <h2 className="text-xl font-semibold pt-4">
        What We Do With the Information
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Internal record keeping</li>
        <li>Improving our products and services</li>
        <li>Sending promotional emails using your provided email address</li>
        <li>Contacting for market research via email, phone, fax or mail</li>
        <li>Customizing the website according to your interests</li>
      </ul>

      <p>
        We are committed to ensuring that your information is secure. In order
        to prevent unauthorized access or disclosure, we have put in suitable
        measures.
      </p>

      <h2 className="text-xl font-semibold pt-4">How We Use Cookies</h2>
      <p>
        A cookie is a small file which asks permission to be placed on your
        computer’s hard drive. Once agreed, it helps analyze web traffic or
        notifies when you visit a site. Cookies allow web applications to tailor
        responses to you.
      </p>
      <p>
        We use traffic log cookies to identify which pages are being used. This
        helps us improve our website for customer needs. We only use this for
        statistical analysis and then remove the data from the system.
      </p>
      <p>
        Cookies help us provide a better website experience. A cookie does not
        give us access to your computer or any data you haven’t shared.
      </p>
      <p>
        You can choose to accept or decline cookies. Most browsers accept them
        automatically, but you can modify this setting. Disabling cookies may
        limit your site experience.
      </p>

      <h2 className="text-xl font-semibold pt-4">
        Controlling Your Personal Information
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          When filling a form, look for the option to opt out of direct
          marketing.
        </li>
        <li>
          If you’ve previously consented to marketing, you can opt out anytime
          by emailing us at{" "}
          <span className="text-gray-300 font-medium">ifeeldrip@gmail.com</span>
          .
        </li>
      </ul>

      <p>
        We will not sell, distribute, or lease your personal information unless
        required by law or with your permission. We may use it to send
        third-party promotions if you allow us to.
      </p>

      <p>
        If you believe any information we have is incorrect or incomplete,
        please email us as soon as possible. We will promptly correct it.
      </p>

      <p className="text-sm text-gray-600 italic">
        Disclaimer: The above content is created at DRIP CORPORATION’s sole
        discretion. Razorpay shall not be liable for any content provided here
        and shall not be responsible for any claims and liability that may arise
        due to merchant’s non-adherence to it.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
