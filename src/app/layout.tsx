import "./globals.css";
import { ReactQueryProvider } from "@/contexts/react-query";
import { CartProvider } from "@/store/CartProvider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark">
        <ReactQueryProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
