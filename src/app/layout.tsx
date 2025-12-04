import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header/Header";
import { Toaster } from "@/components/ui/sonner";
import { COOKED_BY_US } from "@/lib/constant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${COOKED_BY_US}`,
    default: COOKED_BY_US,
  },
  description:
    "Browse our complete collection of recipes, from quick weeknight meals to gourmet dishes. Find step-by-step instructions, ingredients, and tips for every cuisine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <SpeedInsights />
        <Analytics />
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
