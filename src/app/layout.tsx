import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PAG | Pro Audio Gadgets",
  description: "ตรวจสอบราคาและสต็อกสินค้า Pro Audio",
  icons: {
    icon: "/pag-logo.png",       // favicon บน browser tab
    apple: "/pag-logo.png",      // icon บน iPhone เมื่อ save to homescreen
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50">{children}</body>
    </html>
  );
}
