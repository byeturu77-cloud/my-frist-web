import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      <p className="mt-4 text-gray-500 font-medium">페이지를 불러오는 중입니다...</p>
    </div>
  );
}
