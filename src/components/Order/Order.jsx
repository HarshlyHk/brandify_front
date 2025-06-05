import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/features/OrderSlice";
import dayjs from "dayjs";
import { Link } from "react-router";
import "@/assets/fonts/Emilio.ttf";

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === "loading")
    return <p className="p-6 text-gray-500">Loading orders...</p>;
  if (status === "failed")
    return <p className="p-6 text-red-500">Error: {error}</p>;
  if (!orders || orders.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <p className="text-gray-500 mb-4">No orders found.</p>
        <Link to="/shop-all">
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
            Shop Now
          </button>
        </Link>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center uppercase">
        Your Orders
      </h1>

      <div className="">
        {orders.map((order) => (
          <div key={order._id} className=" p-6 transition">
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 justify-between text-sm text-zinc-700">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-zinc-800 uppercase">
                    Order ID:
                  </div>
                  <div>{order.transactionId}</div>
                </div>
                <div>
                  {dayjs(order.createdAt).format("DD MMM YYYY, hh:mm A")}
                </div>
              </div>
              <div className="flex flex-wrap justify-between text-sm mt-2 ">
                <span>
                  Delivery Status:{" "}
                  <span className="font-medium">{order.status}</span>
                </span>
                <span>
                  Payment: {order.paymentMethod}{" "}
                  <span
                    className={`${
                      order.paymentStatus === "Completed"
                        ? "text-green-700"
                        : "text-red-500"
                    } font-medium`}
                  >
                    ({order.paymentStatus})
                  </span>
                </span>
                <span>Total: ₹{order.totalAmount}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.products.map((product, idx) => (
                <div
                  key={idx}
                  className="flex border border-zinc-200 rounded-[5px] p-3 space-x-4 items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="md:w-20 md:h-20 h-14 w-14 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold md:text-base text-sm">
                      {product.name}
                    </h4>
                    <p className="text-xs md:text-sm text-zinc-500">
                      ₹{product.price} × {product.quantity} — Size:{" "}
                      {product.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <button className="mt-6 w-full  bg-zinc-800 text-white py-4 text-xs px-4 rounded-[5px] hover:bg-zinc-700 transition md:w-[300px]">
                <Link to={`/view-order/${order._id}`}>View Order</Link>
              </button>
            </div>

            <hr className=" mt-10" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
