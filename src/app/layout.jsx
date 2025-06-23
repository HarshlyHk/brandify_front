import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./index.css";
import "./App.css"; // Custom styles for DRIP STUDIOS
import Navbar from "@/components/Navbar/Navbar"
import { ReduxProvider } from "@/lib/providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "DRIP STUDIOS",
  description: "Discover DRIP STUDIOS – your destination for premium streetwear that blends bold designs with unmatched comfort. Explore our latest collections and elevate your style today.",
  keywords: "streetwear, fashion, graphic t-shirts, oversized hoodies, cargo pants, sneaker-inspired apparel, limited edition streetwear, sustainable streetwear, gender-neutral fashion, men's streetwear, women's streetwear, unisex streetwear, youth fashion, Gen Z clothing, streetwear India, online streetwear India, DRIP STUDIOS", 
  openGraph: {
    title: "DRIP STUDIOS",
    description: "Discover DRIP STUDIOS – your destination for premium streetwear that blends bold designs with unmatched comfort. Explore our latest collections and elevate your style today.",
    url: "https://dripdrip.in",
    siteName: "DRIP STUDIOS",
    images: [
      {
        url: "https://pub-047aa9653e2346718393f69be234faf1.r2.dev/IMG_3936.png",
        alt: "DRIP STUDIOS - Premium Streetwear",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter : {
    title: "DRIP STUDIOS",
    description: "Discover DRIP STUDIOS – your destination for premium streetwear that blends bold designs with unmatched comfort. Explore our latest collections and elevate your style today.",
    card: "summary_large_image",
    site: "https://dripdrip.in",
    creator: "DRIP STUDIOS",
    images: [
      {
        url: "https://pub-047aa9653e2346718393f69be234faf1.r2.dev/IMG_3936.png",
        alt: "DRIP STUDIOS - Premium Streetwear",
      },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <Navbar />
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
