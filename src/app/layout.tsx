import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
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
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logo.svg"
                    alt="YourCommunity.Space"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                  <span className="ml-3 text-xl font-bold text-primary-600">
                    YourCommunity.Space
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/events" className="text-gray-600 hover:text-primary-600">
                  Find Events
                </Link>
                <Link href="/organizer/signup" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  Start Organizing
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-50">
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
              <p className="text-center text-gray-500">
                © {new Date().getFullYear()} YourCommunity.Space. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
