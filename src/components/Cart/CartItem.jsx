import React from "react";
import { Link } from "react-router";
import { MdDelete } from "react-icons/md";

const CartItem = ({
  item,
  user,
  handleQuantityChange,
  handleRemoveFromCart,
}) => {
  const productId = user ? item?.product._id : item?.productId;
  const size = item?.size;

  return (
    <>

      <div className="flex flex-row sm:flex-row items-center  gap-6 h-40 p-5 transition-shadow ">
        <Link
          to={`/product/${productId}`}
          className="cursor-pointer h-full w-full sm:w-1/3"
        >
          <img
            src={user ? item?.product?.images?.[0] : item.images?.[0]}
            alt={item?.name}
            className="h-full object-cover"
          />
        </Link>
        <div className="flex-1 relative w-full">
          <button
            className="absolute -top-4 -right-6 text-gray-600 hover:text-red-500 transition"
            onClick={() => handleRemoveFromCart(productId, size)}
          >
            <MdDelete size={20} />
          </button>

          <div className="">
            <div className="flex flex-col sm:flex-row sm:items-center items-end justify-between mt-3 gap-4 ">
              <h3 className=" text-[12px] text-nowrap sm:text-[16px] font-semibold">
                {user ? item?.product.name : item.name}
              </h3>
              <p className="text-[12px] text-gray-600 uppercase text-end">
                Size: {size}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center items-end justify-between mt-3 gap-4">
              <div className=" flex sm:items-center items-end gap-2">
                <p className="line-through text-gray-600 sm:text-sm text-[10px]">
                  ₹{user ? item?.product.originalPrice : item.originalPrice}
                </p>
                <p className="text-lg font-semibold sm:text-sm text-[11px]">
                  ₹{user ? item?.product.discountedPrice : item.discountedPrice}
                </p>
              </div>
              <div className="flex items-center border border-[#7c7c7c] rounded-md overflow-hidden text-sm">
                <button
                  className="px-3 py-1 hover:bg-black hover:text-white transition"
                  onClick={() => handleQuantityChange(productId, size, -1)}
                >
                  -
                </button>
                <span className="px-4">{item?.quantity}</span>
                <button
                  className="px-3 py-1 hover:bg-black hover:text-white transition"
                  onClick={() => handleQuantityChange(productId, size, 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
