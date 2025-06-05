"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { CopilotKit } from "@copilotkit/react-core";
import { Provider } from "react-redux";
import "@copilotkit/react-ui/styles.css"; // Copilot UI styles
import store from "@/store";

export default function ClientProviders({ children }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <CopilotKit publicApiKey="ck_pub_6a24292ecfe13bda8330cc2fc15053fe">
        <Provider store={store}>{children}</Provider>
      </CopilotKit>
    </GoogleOAuthProvider>
  );
}
