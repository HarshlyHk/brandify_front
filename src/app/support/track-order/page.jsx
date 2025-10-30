import React from "react";
import TrackOrder from "@/components/Support/TrackOrder";

// metadata for the page
export const metadata = {
    title: "Track Order | Brandify",
    description: "Track your order status",
};

const page = () => {
    return (
        <div>
            <TrackOrder />
        </div>
    );
};

export default page;
