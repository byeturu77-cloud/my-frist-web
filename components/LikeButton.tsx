"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface LikeButtonProps {
  postId: string;
}

export default function LikeButton({ postId }: LikeButtonProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const supabase = createClient();

      // 좋아요 수 조회
      const { count: likeCount } = await supabase
        .from("post_likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", postId);
      setCount(likeCount || 0);

      // 현재 유저가 좋아요했는지 확인
      if (user) {
        const { data } = await supabase
          .from("post_likes")
          .select("id")
          .eq("post_id", postId)
          .eq("user_id", user.id)
          .maybeSingle();
        setLiked(!!data);
      }
    };

    fetchLikes();
  }, [postId, user]);

  const handleToggleLike = async () => {
    if (!user || loading) return;
    setLoading(true);

    const supabase = createClient();

    if (liked) {
      // 좋아요 취소
      await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);
      setLiked(false);
      setCount((prev) => prev - 1);
    } else {
      // 좋아요 추가
      await supabase
        .from("post_likes")
        .insert({ post_id: postId, user_id: user.id });
      setLiked(true);
      setCount((prev) => prev + 1);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={!user || loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
        liked
          ? "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
          : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 hover:text-red-500"
      } ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
      title={!user ? "로그인 후 좋아요를 누를 수 있습니다" : liked ? "좋아요 취소" : "좋아요"}
    >
      <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
      <span>{count}</span>
    </button>
  );
}
