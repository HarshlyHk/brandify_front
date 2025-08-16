"use client";

import React, { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-semibold border-b border-gray-600 pb-2">
        Terms & Conditions
      </h1>

      <p className="text-sm text-gray-600">Last updated on Nov 9th, 2023</p>

      <p>
        The Website Owner, including subsidiaries and affiliates (“Website” or
        “Website Owner” or “we” or “us” or “our”) provides the information
        contained on the website or any of the pages comprising the website
        (“website”) to visitors (“you” or “your”) subject to the terms and
        conditions set out in these terms, the privacy policy and other relevant
        notices applicable to sections of the website.
      </p>

      <p>
        Welcome to our website. If you continue to browse and use this website,
        you are agreeing to comply with and be bound by the following terms and
        conditions of use, which, along with our privacy policy, govern DRIP
        CORPORATION’s relationship with you regarding this website.
      </p>

      <p>
        The term ‘DRIP CORPORATION’ or ‘us’ or ‘we’ refers to the owner of the
        website whose office is located at:
      </p>
      <p className="text-gray-600 italic">
        S-1/201 Old Mahavir Nagar, Tilak Nagar, West Delhi, DELHI 110018
      </p>
      <p>The term ‘you’ refers to the user or viewer of our website.</p>

      <h2 className="text-xl font-semibold pt-4">Terms of Use</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          The content on this website is for general information and use only.
          It is subject to change without notice.
        </li>
        <li>
          We or any third parties do not provide any warranty or guarantee as to
          the accuracy, performance, completeness or suitability of the content.
          You acknowledge that such content may contain inaccuracies or errors,
          and we expressly exclude liability for these to the fullest extent
          permitted by law.
        </li>
        <li>
          Your use of any content is entirely at your own risk. It is your
          responsibility to ensure that any services or information meet your
          specific requirements.
        </li>
        <li>
          This website contains material owned by or licensed to us. This
          includes but is not limited to the design, layout, look, appearance,
          and graphics. Reproduction is prohibited except in accordance with the
          copyright notice.
        </li>
        <li>
          All trademarks reproduced in this website which are not our property
          are acknowledged on the site.
        </li>
        <li>
          Unauthorized use of this website may result in a claim for damages
          and/or be a criminal offense.
        </li>
        <li>
          Occasionally, this website may include links to other websites. These
          are provided for your convenience and do not signify our endorsement.
        </li>
        <li>
          You may not create a link to this website without prior written
          consent from DRIP CORPORATION.
        </li>
        <li>
          Your use of this website and any disputes are subject to the laws of
          India or other applicable regulatory authority.
        </li>
      </ul>

      <h2 className="text-xl font-semibold pt-4">Merchant Disclaimer</h2>
      <p>
        We, as a merchant, shall not be held liable for any loss or damage
        arising directly or indirectly due to a declined transaction, which may
        occur if the Cardholder has exceeded the preset limit agreed with the
        acquiring bank.
      </p>
    </div>
  );
};

export default TermsAndConditions;
