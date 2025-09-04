import { useEffect, useState } from "react";
import {
  loadRazorpayScript,
  loadRazorpayMagicScript,
} from "../../utils/loadRazorpay";
import axiosInstance from "@/config/axiosInstance";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react"; // Import Lottie
import paymentAnimation from "@/assets/lottie/Payment.json"; // Import your animation JSON file

const MagicCheckoutButton = ({
  checkoutItem,
  user,
  type = "Instant",
  className,
  buttonName = "CHECKOUT",
  disabled = false,
}) => {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [fullPageLoading, setFullPageLoading] = useState(false);

  useEffect(() => {
    console.log(checkoutItem);
    loadRazorpayMagicScript().then((loaded) => setIsRazorpayLoaded(loaded));
  }, []);
  const router = useRouter();

  const handlePayment = async () => {
    if (typeof window !== "undefined") {
      const referralCode = localStorage.getItem("referralCode");
      const instaHandle = localStorage.getItem("instaHandle") || "";
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

      if (window.fbq && referralCode) {
        window.fbq("track", "InitiateCheckout", {
          content_name: "Magic Checkout",
          content_ids:
            type === "Instant"
              ? [checkoutItem._id]
              : checkoutItem.map((item) =>
                  user ? item.product._id : item.productId
                ),
          content_type: "product",
          value:
            type === "Instant"
              ? checkoutItem.price
                ? checkoutItem.price / 100
                : 0
              : checkoutItem.reduce((total, item) => {
                  const price = user ? item.product.price : item.price;
                  return total + (price ? price / 100 : 0);
                }, 0),
          currency: "INR",
        });
      }

      const orderPayload = {
        productIds:
          type === "Instant"
            ? [checkoutItem._id]
            : checkoutItem.map((item) =>
                user ? item.product._id : item.productId
              ),
        quantities:
          type === "Instant" ? [1] : checkoutItem.map((item) => item.quantity),
        selectedSizes:
          type === "Instant"
            ? [checkoutItem.size]
            : checkoutItem.map((item) => item.size),
        utmParams,
        referal: referralCode,
        insta_handle: instaHandle,
      };

      setLoadingOrder(true);
      // Send the request to the backend
      const orderResponse = await axiosInstance.post(
        "/razorpay/create-magic-order",
        orderPayload
      );
      setLoadingOrder(false);

      const order = orderResponse.data.data;
      const orderId = order.id; // Extract the order ID from the response

      const options = {
        key: "rzp_live_ENHisQBraHHqUK", // Replace with Razorpay Key ID
        one_click_checkout: true,
        name: "DRIP STUDIOS",
        order_id: orderId, // Replace with the order ID generated from your backend
        show_coupons: true,
        handler: function (response) {
          setFullPageLoading(true);
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
                //! Send purchase pixel to Meta
                const order = res.data.data.updatedOrder;
             
                router.push(
                  "/order-success/" + res?.data?.data?.navigateOrderId
                );
                setTimeout(() => {
                  router.push(
                    "/order-success/" + res?.data?.data?.navigateOrderId
                  );
                  setFullPageLoading(false);
                }, 2000);
              } else {
                setFullPageLoading(false);

                toast.error("Payment verification failed");
              }
            })
            .catch((error) => {
              setFullPageLoading(false);
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
    }
  };

  if (!isRazorpayLoaded) {
    return <div>Loading Razorpay...</div>;
  }

  return (
    <>
      {fullPageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/70 shadow-lg border border-gray-200">
            <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin" />
            <p className="text-black/80 text-base font-medium text-center font-helvetica">
              Processing your payment...
              <br className="hidden md:block font-helvetica" />
              Please wait a moment.
            </p>
          </div>
        </div>
      )}
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
    </>
  );
};

export default MagicCheckoutButton;
