import { Geist, Geist_Mono, Figtree, Inter } from "next/font/google";
import "./globals.css";
import "./index.css";
import "./App.css"; // Custom styles for DRIP STUDIOS
import Navbar from "@/components/Navbar/Navbar";
import { ReduxProvider } from "@/lib/providers";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "DRIP STUDIOS",
  description:
    "Discover DRIP STUDIOS – your destination for premium streetwear that blends bold designs with unmatched comfort. Explore our latest collections and elevate your style today.",
  keywords:
    "streetwear, fashion, graphic t-shirts, oversized hoodies, cargo pants, sneaker-inspired apparel, limited edition streetwear, sustainable streetwear, gender-neutral fashion, men's streetwear, women's streetwear, unisex streetwear, youth fashion, Gen Z clothing, streetwear India, online streetwear India, DRIP STUDIOS",
  openGraph: {
    title: "DRIP STUDIOS",
    description:
      "Discover DRIP STUDIOS – your destination for premium streetwear that blends bold designs with unmatched comfort. Explore our latest collections and elevate your style today.",
    url: "https://www.dripdrip.in",
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
  twitter: {
    title: "DRIP STUDIOS",
    description:
      "Discover DRIP STUDIOS – your destination for premium streetwear that blends bold designs with unmatched comfort. Explore our latest collections and elevate your style today.",
    card: "summary_large_image",
    site: "https://www.dripdrip.in",
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
      <link
        rel="icon"
        type="image/png"
        href="/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content="DRIP STUDIOS" />
      <link rel="manifest" href="/site.webmanifest" />

      <script src="https://checkout.razorpay.com/v1/magic-checkout.js"></script>
      {/* Facebook Pixel Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1977991416358607'); 
    `,
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${figtree.variable} ${inter.variable} antialiased`}
      >
        <ReduxProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
