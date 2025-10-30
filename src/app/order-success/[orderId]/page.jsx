import React from "react";
import OrderSuccess from "./OrderSuccess";

// metadata for the page
export const metadata = {
    title: "Order Success | Brandify",
    description: "Your order has been successfully placed",
};

const page = () => {
    return (
        <div>
            <OrderSuccess />
        </div>
    );
};

export default page;
