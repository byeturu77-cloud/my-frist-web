"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postAuthorId, setPostAuthorId] = useState("");
  const [loadingPost, setLoadingPost] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState("");

  // 1. 게시글 데이터 불러오기
  useEffect(() => {
    async function fetchPost() {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("posts")
          .select("id, title, content, user_id")
          .eq("id", id)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          setTitle(data.title);
          setContent(data.content);
          setPostAuthorId(data.user_id);
        }
      } catch (err: any) {
        setError(err.message || "게시글 정보를 불러오지 못했습니다.");
      } finally {
        setLoadingPost(false);
      }
    }

    fetchPost();
  }, [id]);

  // 2. 작성자 및 권한 UX 분기 검증
  useEffect(() => {
    if (!authLoading && !loadingPost) {
      if (!user) {
        alert("로그인이 필요한 서비스입니다.");
        router.push("/login");
      } else if (postAuthorId && user.id !== postAuthorId) {
        alert("본인이 작성한 글만 수정할 수 있습니다.");
        router.push(`/posts/${id}`);
      }
    }
  }, [user, authLoading, loadingPost, postAuthorId, id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTitleError("");
    setError(null);

    if (!title.trim()) {
      setTitleError("제목을 1자 이상 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("posts")
        .update({
          title,
          content,
        })
        .eq("id", id); // UPDATE 조건 명시

      if (updateError) throw updateError;

      alert("게시글이 성공적으로 수정되었습니다!");
      router.push(`/posts/${id}`);
    } catch (err: any) {
      setError(err.message || "게시글 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loadingPost) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center text-gray-500 font-medium">
        데이터를 로딩하고 있습니다...
      </div>
    );
  }

  // 본인이 작성한 글이 아니거나 권한이 없는 경우 깜빡임 방지
  if (!user || user.id !== postAuthorId) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">
      <header>
        <Link href={`/posts/${id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          &larr; 게시글 상세로 이동
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mt-4 gap-2">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            게시글 수정
          </h1>
          <span className="text-xs text-red-500 font-medium sm:text-right">
            * 이 화면의 수정 권한 분기(UX)와는 별개로, 실제 데이터 임의 조작 방지는 Ch11 RLS가 담당합니다.
          </span>
        </div>
      </header>

      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 flex flex-col gap-6"
      >
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
            ⚠️ {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-semibold text-gray-800">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim() && titleError) {
                setTitleError("");
              }
            }}
            placeholder="게시글의 제목을 입력하세요"
            disabled={isSubmitting}
            className={`w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
              titleError 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
          />
          {titleError && (
            <p className="text-sm text-red-500 font-medium animate-pulse">
              ⚠️ {titleError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="text-sm font-semibold text-gray-800">
            내용
          </label>
          <textarea
            id="content"
            name="content"
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="게시글 내용을 작성하세요..."
            disabled={isSubmitting}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base leading-relaxed"
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '수정 중...' : '수정하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
