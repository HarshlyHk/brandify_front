import React from "react";
import "./Marquee.css"; // Import the CSS file

const Marquee = () => {
  const features = [
    "5% Off for orders below ₹1199",
    "Free Shipping on Prepaid Orders",
    "10% Off for orders above ₹1199",
    "COD Available",
    "10000+ Trusted Customers",
    "Exchanges Available",
    "5% Off for orders below ₹1199",
    "Free Shipping on Prepaid Orders",
    "10% Off for orders above ₹1199",
    "COD Available",
    "10000+ Trusted Customers",
    "Exchanges Available",
    "5% Off for orders below ₹1199",
    "Free Shipping on Prepaid Orders",
    "10% Off for orders above ₹1199",
    "COD Available",
    "10000+ Trusted Customers",
    "Exchanges Available",
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {features.map((feature, index) => (
          <span
            key={index}
            className={`marquee-item ${feature.includes('%') ? 'text-red-500' : ''}`}
          >
            {feature}
          </span>
        ))}
        {features.map((feature, index) => (
          <span
            key={`dup-${index}`}
            className={`marquee-item ${feature.includes('%') ? 'text-red-500' : ''}`}
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
