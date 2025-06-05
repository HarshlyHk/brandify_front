import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder } from "@/features/OrderSlice";
import Lottie from "lottie-react"; // Import Lottie
import successAnimation from "@/assets/lottie/Success.json"; // Import your animation JSON file

const ViewOrder = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.orders?.singleOrder);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (orderId) {
      dispatch(getSingleOrder(orderId));
    }
  }, [orderId, dispatch]);

  if (!order) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50 text-gray-900">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-[5px] border-1">
        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-1 uppercase">
            Order Summary
          </h3>
          <div className="grid gap-2 text-sm text-gray-700">
            <p>
              <strong>Order ID:</strong> {order.transactionId}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-1 uppercase">
            Shipping Address
          </h3>
          <div className="text-sm space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {order.shippingAddress.fullName}
            </p>
            <p>
              <strong>Phone:</strong> {order.shippingAddress.phoneNumber}
            </p>
            {order.shippingAddress.alternatePhoneNumber && (
              <p>
                <strong>Alternate:</strong>{" "}
                {order.shippingAddress.alternatePhoneNumber}
              </p>
            )}
            <p>
              {order.shippingAddress.street}, {order.shippingAddress.locality},
              {order.shippingAddress.landmark &&
                ` ${order.shippingAddress.landmark}, `}
              {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
              {order.shippingAddress.zipCode}, {order.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Ordered Products */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-1 uppercase">
            Ordered Products
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {order.products.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg p-4 bg-[white] border-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="md:w-20 md:h-20 h-16 w-16 object-cover rounded-md"
                />
                <div className="flex-1 text-sm">
                  <div className="flex justify-between font-medium">
                    <p>{product.name}</p>
                    <p className="text-gray-500 uppercase text-xs">
                      Size: {product.size}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-600">
                    <p>Qty: {product.quantity}</p>
                    <p>Price: ₹{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Shopping */}
        <button
          onClick={() => navigate("/shop-all")}
          className="w-full flex items-center justify-center gap-2 text-xs text-white bg-black hover:bg-gray-800 py-5 rounded-[5px] transition-all uppercase"
        >
          Continue Shopping <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ViewOrder;
