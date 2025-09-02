// app/providers.tsx or lib/providers.tsx
"use client";

import { Provider } from "react-redux";
import store from "@/store/index";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useEffect } from "react";
import useAuthHook from "@/utils/useAuthHook";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css"; // Copilot UI styles
import { Toaster } from "sonner";
import axiosInstance from "@/config/axiosInstance";

function AuthWrapper({ children }) {
  const fetchTrafficData = async () => {
    try {
      await axiosInstance.post("/traffic");
      if (typeof window !== "undefined") {
        localStorage.setItem("trafficPostRequested", "true");
      }
    } catch (error) {
      console.error("Error while posting traffic data:", error);
    }
  };
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("trafficPostRequested")
    ) {
      fetchTrafficData();
    }
  }, []);

  useAuthHook();
  return <>{children}</>;
}

export function ReduxProvider({ children }) {
  return (
    <GoogleOAuthProvider
      clientId={
        process.env.NEXT_GOOGLE_AUTH_CLIENT_ID ||
        "189482241004-eu9oc1ns0hsluvhsu7k1e5tpr56tv48v.apps.googleusercontent.com"
      }
    >
      <CopilotKit publicApiKey="ck_pub_6a24292ecfe13bda8330cc2fc15053fe">
        <Provider store={store}>
          <Toaster />
          <AuthWrapper>{children}</AuthWrapper>
        </Provider>
      </CopilotKit>
    </GoogleOAuthProvider>
  );
}
