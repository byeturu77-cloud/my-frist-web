"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, User } from "lucide-react";

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="bg-indigo-600 dark:bg-gray-900 border-b border-indigo-500 dark:border-gray-700 text-white sticky top-0 z-50 shadow-md transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight hover:text-indigo-100 transition-colors">
          내 블로그
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4 text-sm font-medium text-indigo-100 dark:text-gray-300">
          <Link href="/" className="hidden sm:inline hover:text-white transition-colors">
            홈
          </Link>
          <Link href="/posts" className="hover:text-white transition-colors">
            블로그
          </Link>

          {/* 다크 모드 토글 (G6) */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-indigo-500 dark:hover:bg-gray-700 transition-colors"
              aria-label="다크 모드 전환"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              <span className="hidden sm:inline text-xs font-medium">{theme === "dark" ? "라이트모드" : "다크모드"}</span>
            </button>
          )}

          {loading ? (
            <span className="text-xs sm:text-sm animate-pulse opacity-70">확인 중...</span>
          ) : user ? (
            <>
              <Link
                href="/mypage"
                className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-indigo-500 dark:hover:bg-gray-700 transition-colors"
                aria-label="마이페이지"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-medium">마이페이지</span>
              </Link>
              <Link 
                href="/posts/new" 
                className="bg-white text-indigo-600 dark:bg-indigo-500 dark:text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-400 transition shadow-sm font-semibold text-xs sm:text-sm"
              >
                새 글 쓰기
              </Link>
              <button 
                onClick={handleSignOut}
                className="hover:text-white transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-white transition-colors">
                로그인
              </Link>
              <Link 
                href="/signup" 
                className="bg-white text-indigo-600 dark:bg-indigo-500 dark:text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-400 transition shadow-sm font-semibold text-xs sm:text-sm"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
