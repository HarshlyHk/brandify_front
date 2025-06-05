import React from "react";
import "./Loader.css"; // Add this for styling

const Loader = ({ successMessage, isLoading }) => {
  return (
    <div>
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Loader;
