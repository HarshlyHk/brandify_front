import React from "react";
import "./Marquee.css"; // Import the CSS file

const Marquee = () => {
  const features = [
    "Free Shipping on Prepaid Orders",
    "COD Available",
    "3000+ Trusted Customers",
    "Exchanges Available",
    "Free Shipping on Prepaid Orders",
    "COD Available",
    "3000+ Trusted Customers",
    "Exchanges Available",
    "Free Shipping on Prepaid Orders",
    "COD Available",
    "3000+ Trusted Customers",
    "Exchanges Available",
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {features.map((feature, index) => (
          <span key={index} className="marquee-item">
            {feature}
          </span>
        ))}
        {/* Duplicate the content for seamless looping */}
        {features.map((feature, index) => (
          <span key={`dup-${index}`} className="marquee-item">
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
