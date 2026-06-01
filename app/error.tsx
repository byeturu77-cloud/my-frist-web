"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("앱 에러:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md w-full shadow-sm">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">
          오류가 발생했습니다 😢
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
          일시적인 문제가 발생했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
