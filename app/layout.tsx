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
        <nav className="bg-indigo-600 border-b border-indigo-500 text-white sticky top-0 z-50 shadow-md">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight hover:text-indigo-100 transition-colors">
              내 블로그
            </Link>
            <div className="flex items-center space-x-3 sm:space-x-6 text-sm font-medium text-indigo-100">
              <Link href="/" className="hidden sm:inline hover:text-white transition-colors">
                홈
              </Link>
              <Link href="/posts" className="hover:text-white transition-colors">
                블로그
              </Link>
              <Link 
                href="/posts/new" 
                className="bg-white text-indigo-600 px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-indigo-50 transition shadow-sm font-semibold text-xs sm:text-sm"
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
