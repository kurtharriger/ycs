import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Community Events Platform",
  description: "A platform built for organizers to create meaningful events and raise funds for their communities.",
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
                <Link href="/" className="text-xl font-bold text-primary-600">
                  Community Events
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
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} Community Events Platform. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
