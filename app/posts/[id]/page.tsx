"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 16 App Router: params를 비동기로 추출합니다.
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getPost() {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("posts")
          .select(`
            id,
            title,
            content,
            created_at,
            user_id,
            profiles (
              username
            )
          `)
          .eq("id", id)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        setPost(data);
      } catch (err: any) {
        setError(err.message || "게시글을 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    }

    getPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) return;

    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      alert("게시글이 성공적으로 삭제되었습니다.");
      router.push("/posts");
    } catch (err: any) {
      alert(`삭제 중 오류가 발생했습니다: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center text-gray-500">
        게시글을 불러오는 중입니다...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          게시글을 찾을 수 없습니다 😢
        </h1>
        <p className="text-gray-500 mb-8">
          요청하신 페이지가 존재하지 않거나 삭제되었습니다.
        </p>
        <Link 
          href="/posts" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const isAuthor = user && user.id === post.user_id;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">
      <header className="border-b border-gray-200 pb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight capitalize">
            {post.title}
          </h1>
          {isAuthor && (
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/posts/${post.id}/edit`}>수정</Link>
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                삭제
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {post.profiles?.username || "익명"}
            </span>
            <span>•</span>
            <time dateTime={post.created_at}>
              {post.created_at ? new Date(post.created_at).toISOString().split('T')[0] : ""}
            </time>
          </div>
          {isAuthor && (
            <span className="text-xs text-gray-400">
              * 실제 보안은 Ch11 RLS 정책으로 강제됩니다.
            </span>
          )}
        </div>
      </header>
      
      <main className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed min-h-[30vh]">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </main>

      {/* 좋아요 버튼 (G2) */}
      <div className="mt-6">
        <LikeButton postId={id} />
      </div>

      {/* 댓글 섹션 (G1) */}
      <CommentSection postId={id} />

      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <Link 
          href="/posts" 
          className="group flex items-center gap-2 text-blue-600 dark:text-indigo-400 hover:text-blue-800 dark:hover:text-indigo-300 font-medium transition-colors"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
          목록으로 돌아가기
        </Link>
      </footer>
    </article>
  );
}
