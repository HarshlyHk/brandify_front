// components/CopilotActions.jsx
import { useCopilotAction } from "@copilotkit/react-core";
import axiosInstance from "@/config/axiosInstance";

export default function CopilotActions() {
  useCopilotAction({
    name: "getOrderStatus",
    description: "Gets the status of an order given an order ID",
    parameters: [
      {
        name: "orderId",
        type: "string",
        description: "The ID of the order",
        required: true,
      },
    ],
    handler: async ({ orderId }) => {
      console.log("Fetching order status for ID:", orderId);
      const res = await axiosInstance.post("/copilot/get-order-status", {
        transactionId: orderId,
      });
      return res.data.message;
    },
  });

  useCopilotAction({
    name: "registerComplaint",
    description: "Registers a complaint with user details",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "Customer's name",
        required: true,
      },
      {
        name: "orderId",
        type: "string",
        description: "Order ID",
        required: true,
      },
      {
        name: "message",
        type: "string",
        description: "Complaint details",
        required: true,
      },
      {
        name: "type",
        type: "string",
        description: "Type of complaint (e.g., Return, Exchange)",
        required: false,
      },
    ],
    handler: async ({ name, orderId, message, type }) => {
      const res = await axiosInstance.post("/support/return-exchange", {
        orderId,
        name,
        message,
        type,
      });
      const result = await res.data;
      console.log("Complaint registration response:", result);
      return result.status == 201
        ? `Thanks ${name}, your complaint has been registered for order ${orderId}.`
        : `Failed to register complaint. Please try again later.`;
    },
  });

  // Adding questions from ChatModal
  useCopilotAction({
    name: "deliveryTime",
    description: "Provides information about delivery time",
    parameters: [],
    handler: async () => {
      return "Our order processing time is 24 hrs. Once shipped it takes 3-7 days to get delivered, depending on location.";
    },
  });

  useCopilotAction({
    name: "trackOrder",
    description: "Explains how to track an order",
    parameters: [],
    handler: async () => {
      return `If you haven't received your tracking ID within 24 hours, share your order ID here, and we'll provide it within 1-2 hours. Already have tracking details? Use the links below to track your order:
      - [Shiprocket](https://www.shiprocket.in/shipment-tracking/)
      - [Shree Maruti](https://www.shreemaruti.com/track-your-shipment/)`;
    },
  });

  useCopilotAction({
    name: "contactInfo",
    description: "Provides contact information",
    parameters: [],
    handler: async () => {
      return "You can reach us through Instagram DM @drip.co.in or email us at ifeeldrip@gmail.com. We aim to respond within 24 hours.";
    },
  });

  useCopilotAction({
    name: "storeLocation",
    description: "Provides information about the store location",
    parameters: [],
    handler: async () => {
      return "We do not have an offline store, but we are based in Delhi. If you have any doubts about the product, feel free to DM us on Instagram at @drip.co.in. We can arrange a live video call to assist you.";
    },
  });

  return null;
}
