import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h2 className="text-2xl font-bold">PAGE Not Found</h2>
      <p className="pb-6">Could not find any product</p>
      <Link
        href="/all-products/all-products"
        className="flex justify-center items-center w-fit py-[12px] px-[30px] text-[12px] tracking-[0.2em]  bg-black text-white border-transparent border-[1px] "
      >
        SHOP PRODUCTS
      </Link>
    </div>
  );
}
