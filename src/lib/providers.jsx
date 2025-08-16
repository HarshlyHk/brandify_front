// app/providers.tsx or lib/providers.tsx
"use client";

import { Provider } from "react-redux";
import store from "@/store/index";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import useAuthHook from "@/utils/useAuthHook";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css"; // Copilot UI styles
import { Toaster } from "sonner";

function AuthWrapper({ children }) {
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
