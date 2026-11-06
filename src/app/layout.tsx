import type { Metadata } from "next";
import { Anton, Urbanist } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elevate Gym — The biggest gym in East Africa",
  description:
    "3,612 m² of training space — Elevate Gym is the biggest gym in Ethiopia and East Africa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${urbanist.variable} ${anton.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
