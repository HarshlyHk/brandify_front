import { useEffect, useState } from "react";
import {
  loadRazorpayScript,
  loadRazorpayMagicScript,
} from "../../utils/loadRazorpay";
import axiosInstance from "@/config/axiosInstance";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import Lottie from "lottie-react"; // Import Lottie
import paymentAnimation from "@/assets/lottie/Payment.json"; // Import your animation JSON file

const MagicCheckoutCombo = ({
  checkoutItem,
  user,
  className,
  buttonName = "CHECKOUT",
  disabled = false,
  setDrawerOpen,
}) => {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  useEffect(() => {
    loadRazorpayMagicScript().then((loaded) => setIsRazorpayLoaded(loaded));
  }, []);
  const navigate = useNavigate();

  const handlePayment = async () => {
    const referralCode =
      typeof window !== "undefined" && localStorage.getItem("referralCode");
    const utmParams = {
      Source: typeof window !== "undefined" && localStorage.getItem("Source"),
      Placement: typeof window !== "undefined" && localStorage.getItem("Placement"),
      CampaignName: typeof window !== "undefined" && localStorage.getItem("CampaignName"),
      AdSetName: typeof window !== "undefined" && localStorage.getItem("AdSetName"),
      AdName: typeof window !== "undefined" && localStorage.getItem("AdName"),
      CampaignID: typeof window !== "undefined" && localStorage.getItem("CampaignID"),
      Term: typeof window !== "undefined" && localStorage.getItem("Term"),
      Fbclid: typeof window !== "undefined" && localStorage.getItem("Fbclid"),
    };

    const orderPayload = {
      comboId: checkoutItem.comboId,
      products: checkoutItem.products.map((product) => ({
        productId: product.productId,
        size: product.size,
      })),
      utmParams,
      referal: referralCode,
      insta_handle: instaHandle,
    };

    setLoadingOrder(true);
    try {
      const orderResponse = await axiosInstance.post(
        "/razorpay/create-magic-combo-order",
        orderPayload
      );
      setDrawerOpen(false);
      setLoadingOrder(false);

      const order = orderResponse.data.data;
      const orderId = order.id;

      const options = {
        key: "rzp_live_ENHisQBraHHqUK",
        one_click_checkout: true,
        name: "DRIP STUDIOS",
        order_id: orderId,
        show_coupons: true,
        handler: function (response) {
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
                const order = res.data.data.updatedOrder;
                navigate("/order-success/" + res?.data?.data?.navigateOrderId);
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

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed", response);
        alert("Payment Failed: " + response.error.description);
      });

      razorpay.open();
    } catch (error) {
      setLoadingOrder(false);
      toast.error(
        error?.response?.data?.message ||
          "Failed to create order. Please try again."
      );
      return;
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
