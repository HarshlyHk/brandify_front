"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import {
  loginWithGoogle,
  loginWithCredentials,
  verifyOtp,
} from "../../features/userSlice";
import CodeInput from "react-code-input";
import { AnimatePresence, motion } from "framer-motion";

const QuickLogin = ({ open, setOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNameAvailable, setIsNameAvailable] = useState(false);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string().required("Email required"),
    }),
  });

  const handleSentOtp = async () => {
    setLoading(true);
    const res = await dispatch(
      loginWithCredentials({ email: formik.values.email })
    );
    if (res.meta.requestStatus === "fulfilled") {
      const { exists, hasName } = res.payload.data;
      setOtpSent(true);
      setIsRegistered(exists);
      setIsNameAvailable(hasName);
      setLoading(false);
    } else {
      console.error("Failed to send OTP:", res.payload.message);
      setLoading(false);
    }
  };
  const props = {
    inputStyle: {
      margin: isMobile ? "2px" : "3px",
      MozAppearance: "textfield",
      width: isMobile ? "40px" : "40px",
      borderRadius: "6px",
      fontSize: "16px",
      height: isMobile ? "45px" : "45px",
      paddingLeft: isMobile ? "14px" : "14px",
      backgroundColor: "#FFF", // Darker background for a modern look
      color: "#000", // Bright cyan for text
      border: "2px solid #d2a360", // Matching border color
      transition: "all 0.3s ease-in-out", // Smooth hover effect
    },
    inputStyleInvalid: {
      fontFamily: "monospace",
      margin: "6px",
      MozAppearance: "textfield",
      width: "20px",
      borderRadius: "6px",
      fontSize: "16px",
      height: "32px",
      paddingLeft: "10px",
      backgroundColor: "#1e1e2f", // Same background for consistency
      color: "#ff4d4d", // Bright red for invalid input
      border: "2px solid #d2a360", // Matching border color
      boxShadow: "0 2px 4px rgba(255, 77, 77, 0.4)", // Subtle red shadow
      transition: "all 0.3s ease-in-out", // Smooth hover effect
    },
  };
  const handleSubmitOtp = async () => {
    setLoading(true);
    const res = await dispatch(
      verifyOtp({ email: formik.values.email, otp, name: formik.values.name })
    );
    if (res.meta.requestStatus === "fulfilled") {
      setOpen(false);
    }
    if (res.meta.requestStatus === "rejected") {
      console.error("OTP verification failed:", res.payload.message);
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const res = await dispatch(loginWithGoogle(credentialResponse.credential));
    if (res.meta.requestStatus === "fulfilled") {
      setOpen(false);
    } else {
      console.error("Google login failed");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 rounded-md ">
        <DialogHeader>
          <DialogTitle className="text-center">{otpSent? "Enter OTP" : "LOGIN"}</DialogTitle>
        </DialogHeader>
        <div className=" flex justify-center items-center mx-auto w-full md:w-[80%] ">
          <div className="flex flex-col pt-4 gap-10 items-start h-full w-full">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-8 w-full"
            >
              <AnimatePresence mode="wait">
                {!otpSent ? (
                  <motion.form
                    key="email-form"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-8 w-full"
                  >
                    {/* Email Input */}
                    <div className="flex flex-col gap-8">
                      <div>
                        <div className="flex justify-start items-center border-b-2 relative border-white">
                          <div className="relative w-full bg-transparent">
                            <input
                              type="text"
                              id="email"
                              name="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-[#FFF] peer bg-transparent bor text-[14px] font-helvetica"
                            />
                            <label
                              htmlFor="email"
                              className={`absolute  font-helvetica text-[12px] left-3 top-4 transition-all duration-200 transform ${
                                formik.values.email
                                  ? "-translate-y-10 -translate-x-2 text-[12px] text-[#000000]"
                                  : "peer-focus:-translate-y-10 peer-focus:text-[12px] peer-focus: peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[12px] text-[#6d6d6d]"
                              }`}
                            >
                              Email
                            </label>
                          </div>
                        </div>

                        {formik.touched.email && formik.errors.email && (
                          <div className="text-red-500 text-sm mt-2 font-helvetica">
                            {formik.errors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={loading || !formik.values.email}
                      className={` bg-black text-white py-3 text-[12px] mt-4 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      } ${
                        !formik.values.email
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={handleSentOtp}
                    >
                      <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                      </span>
                      <span className="button-text font-helvetica">
                        {loading ? "Sending..." : "SEND OTP"}
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="otp-form"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-8 w-full"
                  >
                    {/** If name is not available, show name input */}
                    {!isNameAvailable && (
                      <div>
                        <div className="flex justify-start items-center border-b-2 relative border-white">
                          <div className="relative w-full bg-transparent">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-[#FFF] peer bg-transparent bor text-[14px] font-helvetica"
                            />
                            <label
                              htmlFor="email"
                              className={`absolute text-[12px] left-3 top-4 transition-all duration-200 transform ${
                                formik.values.name
                                  ? "-translate-y-10 -translate-x-2 text-[12px] text-[#000000]"
                                  : "peer-focus:-translate-y-10 peer-focus:text-[12px] peer-focus: peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[12px] text-[#6d6d6d] font-helvetica"
                              }`}
                            >
                              Enter your Name
                            </label>
                          </div>
                        </div>

                        {formik.touched.name && formik.errors.name && (
                          <div className="text-red-500 text-sm mt-2 font-helvetica">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>
                    )}

                    {/* OTP Field */}
                    <div className="flex flex-col items-center">
                      <CodeInput
                        fields={6} // number of OTP digits
                        value={otp}
                        type="tel"
                        className="font-helvetica"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(value) => setOtp(value)}
                        {...props}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSubmitOtp()}
                      disabled={loading || !otp}
                      className={` bg-black text-white py-3 text-[14px] mt-4 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      } ${!otp ? "opacity-50 cursor-not-allowed" : ""}  `}
                    >
                      <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                      </span>
                      <span className="button-text">Continue</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
            <div className="flex items-center w-full gap-3">
              <div className="flex-1 h-[1.5px] bg-black opacity-30"></div>
              <span className=" text-[14px] font-poppins font-[100] font-helvetica">
                OR
              </span>
              <div className="flex-1 h-[1.5px] bg-black opacity-30"></div>
            </div>
            <div className="flex items-center justify-center gap-5 w-full relative">
              <div className=" ">
                <GoogleLogin
                  id="google-login-button"
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                  useOneTap
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickLogin;
