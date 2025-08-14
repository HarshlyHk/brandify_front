"use client"
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/config/axiosInstance";
import Link from "next/link";
import { FaFileImage, FaFilePdf, FaFileWord } from "react-icons/fa6";

const PaymentQuery = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
    attachment: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    message: Yup.string().required("Message is required"),
    attachment: Yup.mixed().required("Proof of payment is required"),
  });

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("attachment", file);

    if (file) {
      const isImage = file.type.startsWith("image/");
      const fileURL = URL.createObjectURL(file);
      setFilePreview({
        url: fileURL,
        type: file.type,
        name: file.name,
        isImage,
      });
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("message", values.message);
    formData.append("file", values.attachment);

    try {
      await axiosInstance.post("/payment-query/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      resetForm();
      setFilePreview(null);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (filePreview?.url) {
        URL.revokeObjectURL(filePreview.url);
      }
    };
  }, [filePreview]);

  return (
    <>
      {success ? (
        <div className="h-screen flex items-center justify-center px-4">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-xl font-semibold text-gray-800">
                Payment Query Submitted Successfully.
              </h1>
            </div>
            <p className="text-sm text-gray-800 mb-2">
              Thank you for reaching out. We’ve received your query.
            </p>
            <p className="text-sm text-gray-800 mb-8">
              Please check your email for further instructions. We’ll get back
              to you as soon as possible.
            </p>
            <div className="text-center">
              <Link
                href="/"
                className="w-full bg-black text-white py-4 text-xs px-4 rounded-[5px] hover:bg-gray-800 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:w-[600px] w-full mx-auto mt-16 p-8 rounded-[10px]">
          <h1 className="text-2xl font-semibold mb-6 text-center uppercase">
            Payment Query
          </h1>
          <p className="text-sm text-gray-500 mb-8 text-center">
            Fill in the form below to submit your payment query.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="flex flex-col gap-6">
                <div className="flex gap-4 flex-col md:flex-row">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                      placeholder="e.g., John Doe"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                      placeholder="e.g., john.doe@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                    placeholder="e.g., +1234567890"
                  />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    rows="4"
                    className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                    placeholder="Write your message here..."
                  />
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proof of Payment (Attachment)
                  </label>
                  <input
                    type="file"
                    name="attachment"
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                    className="w-full border border-zinc-200 rounded-[5px] p-4 text-sm focus:outline-none focus:border-black transition"
                  />
                  <ErrorMessage
                    name="attachment"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {filePreview && (
                  <>
                    <p className="text-sm text-gray-700 mt-4">File Preview:</p>
                    <div className=" flex items-center gap-4 p-4 border rounded-md bg-gray-50">
                      {filePreview.isImage ? (
                        <img
                          src={filePreview.url}
                          alt="Preview"
                          className="h-auto rounded-[5px] "
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            {filePreview.type === "application/pdf" ? (
                              <FaFilePdf color="red" />
                            ) : filePreview.type.includes("word") ? (
                              <FaFileWord color="blue" />
                            ) : (
                              <FaFileImage color="green" />
                            )}
                          </div>
                          <p className="text-sm text-gray-700 break-all">
                            {filePreview.name}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {error && (
                  <p className="text-red-500 text-center text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 text-xs px-4 rounded-[5px] hover:bg-gray-800 transition"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Query"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default PaymentQuery;
