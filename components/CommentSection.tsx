"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
  } | null;
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("comments")
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles (
          username
        )
      `)
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    setComments((data as unknown as Comment[]) || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim() || submitting) return;

    setSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        user_id: user.id,
        content: newComment.trim(),
      });

    if (!error) {
      setNewComment("");
      await fetchComments();
    }
    setSubmitting(false);
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    const supabase = createClient();
    await supabase.from("comments").delete().eq("id", commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  return (
    <section className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5" />
        댓글 {comments.length > 0 && `(${comments.length})`}
      </h3>

      {/* 댓글 목록 */}
      {loading ? (
        <div className="text-gray-400 dark:text-gray-500 text-sm py-4">댓글을 불러오는 중...</div>
      ) : comments.length === 0 ? (
        <div className="text-gray-400 dark:text-gray-500 text-sm py-4 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
        </div>
      ) : (
        <ul className="space-y-4 mb-6">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 text-xs font-bold">
                    {comment.profiles?.username?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                    {comment.profiles?.username || "익명"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.created_at).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                {user && user.id === comment.user_id && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="댓글 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed pl-9">
                {comment.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* 댓글 작성 폼 */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
          />
          <button
            type="submit"
            disabled={!newComment.trim() || submitting}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {submitting ? "..." : "등록"}
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-3">
          댓글을 남기려면 <a href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">로그인</a>해 주세요.
        </p>
      )}
    </section>
  );
}
