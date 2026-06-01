import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/AuthContext";
import { Providers } from "./providers";
import Header from "@/components/Header";

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
    <html lang="ko" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body>
        <Providers>
        <AuthProvider>
          <Header />
          <main className="max-w-4xl mx-auto p-6">
            {children}
          </main>
          <footer className="text-center text-gray-500 py-6 text-sm">
            © 2026 내 블로그
          </footer>
        </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
