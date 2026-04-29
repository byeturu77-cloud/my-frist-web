import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "내 블로그",
  description: "내 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body>
        <nav className="bg-gray-900 border-b border-gray-800 text-white sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight hover:text-gray-300 transition-colors">
              내 블로그
            </Link>
            <div className="flex items-center space-x-3 sm:space-x-6 text-sm font-medium text-gray-300">
              <Link href="/" className="hidden sm:inline hover:text-white transition-colors">
                홈
              </Link>
              <Link href="/posts" className="hover:text-white transition-colors">
                블로그
              </Link>
              <Link 
                href="/posts/new" 
                className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-blue-500 transition shadow-sm font-semibold text-xs sm:text-sm"
              >
                새 글 쓰기
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto p-6">
          {children}
        </main>
        <footer className="text-center text-gray-500 py-6 text-sm">
          © 2026 내 블로그
        </footer>
      </body>
    </html>
  );
}
