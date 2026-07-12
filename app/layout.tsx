import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Khamar Bazaar",
  description:
    "Connecting rural Bangladeshi farmers directly with buyers. Honest, fresh, and local.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="">{children}</main>

        <Footer />
        <Toaster
          toastOptions={{
            style: {
              fontSize: "15px",
            },
          }}
        />
      </body>
    </html>
  );
}
