"use client"
import { fetchCollabos } from "@/features/collaboSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiExpandDiagonalFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

const CollaboVideo = ({ productId }) => {
  const { collabos } = useSelector((state) => state.collabo);
  const dispatch = useDispatch();
  const [showCollabo, setShowCollabo] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const collaboForProduct = collabos?.find((c) => c.product?._id === productId);

  useEffect(() => {
    if (!collabos || collabos.length === 0) {
      dispatch(fetchCollabos());
    }
  }, [productId, dispatch]);
  return (
    <div>
      {collaboForProduct && showCollabo && (
        <>
          <div
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 20,
              width: 120,
              height: 180,
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Expand Button */}
            <button
              style={{
                position: "absolute",
                top: 6,
                left: 6,
                background: "rgba(255,255,255,0.8)",
                border: "none",
                borderRadius: "50%",
                padding: 4,
                cursor: "pointer",
                zIndex: 2,
              }}
              onClick={() => setModalOpen(true)}
              aria-label="Expand"
            >
              <RiExpandDiagonalFill size={18} />
            </button>
            {/* Close Button*/}
            <button
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                background: "rgba(255,255,255,0.8)",
                border: "none",
                borderRadius: "50%",
                padding: 4,
                cursor: "pointer",
                zIndex: 2,
              }}
              onClick={() => setShowCollabo(false)}
              aria-label="Close"
            >
              <IoCloseSharp size={18} />
            </button>
            {collaboForProduct.isVideo ? (
              <video
                src={collaboForProduct.imageUrl}
                width="100%"
                height="100%"
                autoPlay
                loop
                muted
                playsInline
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img
                src={collaboForProduct.imageUrl}
                alt={collaboForProduct.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
          {/* Modal for expanded view */}
          {modalOpen && (
            <div
              className="fixed inset-0 w-[100vw] backdrop-blur-[10px] h-[100vh] bg-black/70 z-50 flex items-center justify-center"
              onClick={() => setModalOpen(false)}
            >
              <div
                className="relative w-full md:w-fit h-full bg-white overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Close Button */}
                <button
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "rgba(255,255,255,0.8)",
                    border: "none",
                    borderRadius: "50%",
                    padding: 8,
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                  onClick={() => setModalOpen(false)}
                  aria-label="Close"
                >
                  <IoCloseSharp size={24} />
                </button>

                {collaboForProduct.isVideo ? (
                  <video
                    src={collaboForProduct.imageUrl}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      background: "#000",
                      display: "block",
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={collaboForProduct.imageUrl}
                    alt={collaboForProduct.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      background: "#000",
                      display: "block",
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CollaboVideo;
