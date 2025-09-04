"use client";
import { useEffect, useState } from "react";
import {
  loadRazorpayScript,
  loadRazorpayMagicScript,
} from "../../utils/loadRazorpay";
import axiosInstance from "@/config/axiosInstance";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import paymentAnimation from "@/assets/lottie/Payment.json";

const MagicCheckoutCombo = ({
  checkoutItem,
  user,
  className,
  buttonName = "CHECKOUT",
  disabled = false,
  setDrawerOpen,
  resetSelectedSizes,
}) => {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [fullPageLoading, setFullPageLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadRazorpayMagicScript().then((loaded) => setIsRazorpayLoaded(loaded));
    }
  }, []);
  const router = useRouter();

  const handlePayment = async () => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      const referralCode = localStorage.getItem("referralCode");
      const utmParams = {
        Source: localStorage.getItem("Source"),
        Placement: localStorage.getItem("Placement"),
        CampaignName: localStorage.getItem("CampaignName"),
        AdSetName: localStorage.getItem("AdSetName"),
        AdName: localStorage.getItem("AdName"),
        CampaignID: localStorage.getItem("CampaignID"),
        Term: localStorage.getItem("Term"),
        Fbclid: localStorage.getItem("Fbclid"),
      };

      const orderPayload = {
        comboId: checkoutItem.comboId,
        products: checkoutItem.products.map((product) => ({
          productId: product.productId,
          size: product.size,
        })),
        utmParams,
        referal: referralCode,
      };

      setLoadingOrder(true);

      const orderResponse = await axiosInstance.post(
        "/razorpay/create-magic-combo-order",
        orderPayload
      );
      setDrawerOpen(false);
      setLoadingOrder(false);
      resetSelectedSizes();

      const order = orderResponse.data.data;
      const orderId = order.id;

      const options = {
        key: "rzp_live_ENHisQBraHHqUK",
        one_click_checkout: true,
        name: "DRIP STUDIOS",
        order_id: orderId,
        show_coupons: true,
        handler: function (response) {
          toast.loading("Verifying payment...");
          axiosInstance
            .post(
              "/razorpay/verify-payment",
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              if (res.data.status === 200) {
                toast.success("Order Placed Successfully!");
                navigate.push(
                  "/order-success/" + res?.data?.data?.navigateOrderId
                );
              } else {
                toast.error("Payment verification failed");
              }
            })
            .catch((error) => {
              setLoadingOrder(false);
              console.error("Error:", error);
              toast.error("Error verifying payment");
            });
        },
        prefill: {
          email: "",
          contact: "",
        },
        notes: {
          address: "Demo address",
        },
      };

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", function (response) {
          console.error("Payment failed", response);
          alert("Payment Failed: " + response.error.description);
        });
        razorpay.open();
      } else {
        toast.error("Razorpay SDK not loaded");
      }
    }
  };

  if (!isRazorpayLoaded) {
    return <div>Loading Razorpay...</div>;
  }

  return (
    <button
      className={` ${className} flex items-center justify-center gap-2 `}
      onClick={handlePayment}
      disabled={disabled || loadingOrder}
    >
      <p>{loadingOrder ? "PROCESSING..." : buttonName}</p>
      {!disabled && (
        <div className="w-10 absolute h-10 translate-x-16 translate-y-2">
          <Lottie animationData={paymentAnimation} loop={true} />
        </div>
      )}
    </button>
  );
};

export default MagicCheckoutCombo;
