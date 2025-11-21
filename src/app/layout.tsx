import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import "./globals.css";

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
    template: "%s | Cooked by Us",
    default: "Cooked by Us",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-svh overflow-x-hidden`}
      >
        <header className="sticky top-0 z-20 py-2 bg-white dark:bg-gray-900">
          <NavBar />
        </header>
        <main className="flex-1 min-h-0 flex justify-center">{children}</main>
        <footer className="px-4 py-2">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
