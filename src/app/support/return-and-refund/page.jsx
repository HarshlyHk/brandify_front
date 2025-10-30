import React from "react";
import ReturnExchange from "@/components/Support/Complaint";

// metadata for the page
export const metadata = {
    title: "Exchange Product | Brandify",
    description:
        "Get in touch with our support team regarding product exchanges",
};

const page = () => {
    return (
        <div>
            <ReturnExchange />
        </div>
    );
};

export default page;
