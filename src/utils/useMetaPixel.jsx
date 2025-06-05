// utils/useMetaPixel.jsx
import { useEffect } from "react";
import { useLocation } from "react-router";

const useMetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.fbq) return;

    // Track PageView on route change
    window.fbq("track", "PageView");
  }, [location.pathname]); // only trigger when the path changes
};

export default useMetaPixel;
