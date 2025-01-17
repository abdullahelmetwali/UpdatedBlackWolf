import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/app/Navbar";
import { CartProvider } from "@/store/CartProvider";
import Footer from "@/components/app/Footer";

export const metadata: Metadata = {
  title: {
    default: "BLACK WOLF",
    template: "BLACK WOLF | %s"
  },
  description: "Discover the ultimate online shopping experience at Black wolf store. Explore a wide range of high-quality for all products at unbeatable prices. Enjoy fast shipping, secure payment options, and excellent customer support. Shop now and find everything you need in one place!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`antialiased`}
      >
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
