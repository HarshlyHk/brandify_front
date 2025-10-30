import React from "react";
import OrderList from "@/components/Order/Order";

export const metadata = {
    title: "Orders | Brandify",
    description: "View and manage your orders",
};
const page = () => {
    return (
        <div>
            <OrderList />
        </div>
    );
};

export default page;
