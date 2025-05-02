import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YourCommunity.Space - Empowering Community Event Organizers",
  description: "A non-profit platform built for organizers, by organizers. Raise funds for your events, connect with your community, and make a lasting impact.",
  metadataBase: new URL("https://yourcommunity.space"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} min-h-screen flex flex-col overflow-x-hidden`}>
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo.svg"
                    alt="YourCommunity.Space"
                    width={40}
                    height={40}
                    className="h-8 w-auto"
                  />
                  <span className="ml-3 text-lg font-bold text-primary-600 hidden sm:block">
                    YourCommunity.Space
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="/events"
                  className="text-gray-600 hover:text-primary-600 text-sm sm:text-base px-2 py-1"
                >
                  Find Events
                </Link>
                <Link
                  href="/organizer/signup"
                  className="bg-primary-600 text-white text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-primary-700 whitespace-nowrap"
                >
                  Start Organizing
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-grow w-full">
          {children}
          <SpeedInsights />
          <Analytics />
        </main>
        <footer className="bg-gray-50 w-full">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="YourCommunity.Space"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  YourCommunity.Space
                </span>
              </Link>
              <p className="text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} YourCommunity.Space. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
