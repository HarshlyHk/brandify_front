"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCombos } from "@/features/comboSlice";
import MagicCheckoutCombo from "@/components/MagicCheckout/MagicCheckoutCombo";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { formatIndianPrice } from "@/utils/formatPrice";
import ComboSlider from "./ComboSlider";
import { FaExternalLinkAlt } from "react-icons/fa";

const Combo = () => {
  const { combos, loading } = useSelector((state) => state.combo);
  const dispatch = useDispatch();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSizeChart, setOpenSizeChart] = useState(false);

  useEffect(() => {
    if (!combos.length) {
      dispatch(fetchCombos());
    }
  }, [dispatch]);

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleBuyNow = (combo) => {
    setSelectedCombo(combo);
    setDrawerOpen(true);
  };

  const resetSelectedSizes = () => {
    setSelectedSizes({});
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="relative xl:px-10">
      <h2 className="font-bold text-center ">MUST BUY COMBOS</h2>

      {/* Combos List */}

      <div>
        <ComboSlider combos={combos} handleBuyNow={handleBuyNow} />
      </div>
{/* 
      <div className="gap-6  hidden">
        {combos.map((combo, index) => {
          const prevClass = `swiper-button-prev-${index}`;
          const nextClass = `swiper-button-next-${index}`;

          return (
            <>
              {combo.isStarred && (
                <>
                  <div
                    key={combo?._id}
                    className="hidden md:block border-1 border-gray-400 rounded-md p-5 w-full m-auto "
                  >
                    <h3 className="text-lg uppercase text-center font-bold text-gray-800 mb-4">
                      {combo.title}
                    </h3>

                    <div className="flex items-center justify-center gap-10">
                      <Image
                        width={500}
                        height={500}
                        src={combo?.imageUrl}
                        alt={combo?.title}
                        className="w-[400px] h-full object-cover  rounded-[5px] "
                      />
                    </div>

                    <div className="mt-8 text-center border-t-1 border-gray-400 pt-4">
                      <p className="text-sm font-semibold text-gray-800 uppercase">
                        {combo?.totalPrice > 0
                          ? `Get This Combo at Just ₹${combo.totalPrice}`
                          : "Price not available"}
                      </p>
                      <button
                        onClick={() => handleBuyNow(combo)}
                        className="mt-3 px-10 py-4 rounded-[5px] bg-[#ff3737] text-white text-xs hover:bg-transparent hover:text-black  border-black transition-all duration-300"
                      >
                        BUY NOW
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          );
        })}
      </div> */}

      {/* Drawer for size selection */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="p-0 min-h-[90vh] bg-[#f9f9f9] max-w-2xl mx-auto">
          <DialogTitle className="p-3 !mb-0">
            <div className="!text-lg md:!text-xl !font-helvetica text-center w-full ">
              {selectedCombo?.title}
            </div>
          </DialogTitle>
          <DrawerDescription className="flex flex-col h-full p-0 overflow-y-auto no-scrollbar pb-10">
            {selectedCombo ? (
              <>
                <div className="flex flex-col items-center justify-center p-4 bg-[#f9f9f9]">
                  <p>{selectedCombo?.description}</p>
                </div>
                <hr />
                <p className="text-center text-xs text-gray-500 px-4 py-2">
                  COMBOS ARE ONLY AVAILABLE FOR PREPAID ORDERS.
                </p>
                <hr />

                <div className="flex items-center justify-between p-4 ">
                  <h3 className="text-[18px] uppercase font-semibold text-black">
                    Select Size
                  </h3>
                  <button
                    className="text-[0.9rem]  md:text-[1rem] underline underline-offset-4"
                    onClick={() => setOpenSizeChart(true)}
                  >
                    Size Chart
                  </button>
                </div>
                {selectedCombo?.products.map((product) => (
                  <div
                    key={product.productId}
                    className="flex items-center justify-between gap-4 p-3 text-black "
                  >
                    <Link href={`/product/${product.productId}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-[5px]"
                      />
                    </Link>
                    <div className="flex-1 text-xs px-2">
                      <p className="">{product.name}</p>
                      <p>
                        ₹ {product.comboPrice}{" "}
                        <span className="line-through text-gray-500">
                          ₹ {product.originalPrice}
                        </span>
                      </p>
                    </div>
                    <div className="w-32">
                      <Select
                        onValueChange={(value) =>
                          handleSizeChange(product.productId, value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              selectedSizes[product.productId] || "Select Size"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizeVariations.map((size, idx) => (
                            <SelectItem
                              key={idx}
                              value={size.size}
                              disabled={size.stock === 0}
                            >
                              {size.size} {size.stock === 0 && "(Out of Stock)"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-center text-gray-400 w-full">
                Loading combo details...
              </p>
            )}
          </DrawerDescription>
          <p className="text-black text-xs text-center">
            Click on the image to view the product.
          </p>

          <DrawerFooter>
            <MagicCheckoutCombo
              setDrawerOpen={setDrawerOpen}
              checkoutItem={{
                comboId: selectedCombo?._id,
                products: selectedCombo?.products.map((product) => ({
                  productId: product.productId,
                  size: selectedSizes[product.productId],
                })),
              }}
              resetSelectedSizes={resetSelectedSizes}
              user={null}
              buttonName={
                Object.keys(selectedSizes).length ===
                selectedCombo?.products.length
                  ? "CHECKOUT"
                  : "SELECT ALL SIZES"
              }
              className={`text-white md:rounded-md px-4 py-5 md:py-5 text-xs w-full border-1 border-black bg-black md:static fixed bottom-0 left-0 right-0 rounded-none ${
                Object.keys(selectedSizes).length ===
                selectedCombo?.products.length
                  ? ""
                  : "opacity-100 cursor-not-allowed"
              }`}
              disabled={
                Object.keys(selectedSizes).length !==
                selectedCombo?.products?.length
              }
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Dialog open={openSizeChart} onOpenChange={setOpenSizeChart}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[40vw]  w-full text-white">
          <DialogHeader>
            <DialogTitle className="text-center"></DialogTitle>
          </DialogHeader>
          <img
            src="https://pub-047aa9653e2346718393f69be234faf1.r2.dev/newsie.JPG"
            alt="Size Chart"
            className="w-full h-auto object-cover"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Combo;
