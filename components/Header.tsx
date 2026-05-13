"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
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

          {loading ? (
            <span className="text-xs sm:text-sm animate-pulse opacity-70">확인 중...</span>
          ) : user ? (
            <>
              <Link 
                href="/posts/new" 
                className="bg-white text-indigo-600 px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-indigo-50 transition shadow-sm font-semibold text-xs sm:text-sm"
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
                className="bg-white text-indigo-600 px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-indigo-50 transition shadow-sm font-semibold text-xs sm:text-sm"
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
