import React from "react";
import Cart from "@/components/Cart/Cart";
export const metadata = {
    title: "Cart | Brandify",
    description: "View and manage your cart",
};

const page = () => {
    return (
        <div>
            <Cart />
        </div>
    );
};

export default page;
