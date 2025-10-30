import React from "react";
import Login from "@/components/Login/Login";

export const metadata = {
    title: "Login | Brandify",
    description: "Login to your account",
};
const page = () => {
    return (
        <>
            <Login />
        </>
    );
};

export default page;
