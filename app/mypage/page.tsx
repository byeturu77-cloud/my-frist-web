"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface MyPost {
  id: string;
  title: string;
  created_at: string;
}

export default function MyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (!user) return;

    const fetchData = async () => {
      const supabase = createClient();

      // 프로필 정보
      const { data: profileData } = await supabase
        .from("profiles")
        .select("username, role")
        .eq("id", user.id)
        .single();
      setProfile(profileData);

      // 내가 쓴 글
      const { data: postsData } = await supabase
        .from("posts")
        .select("id, title, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setPosts(postsData || []);

      // 받은 좋아요 수
      const { count: likes } = await supabase
        .from("post_likes")
        .select("*, posts!inner(user_id)", { count: "exact", head: true })
        .eq("posts.user_id", user.id);
      setLikeCount(likes || 0);

      // 받은 댓글 수
      const { count: comments } = await supabase
        .from("comments")
        .select("*, posts!inner(user_id)", { count: "exact", head: true })
        .eq("posts.user_id", user.id);
      setCommentCount(comments || 0);

      setProfileLoading(false);
    };

    fetchData();
  }, [user, loading, router]);

  if (loading || profileLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center text-gray-500 dark:text-gray-400">
        프로필을 불러오고 있습니다...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">
      {/* 프로필 카드 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 text-2xl font-bold">
            {profile?.username?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile?.username || "이름 없음"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
              {profile?.role === "counselor" ? "상담사" : "일반 사용자"}
            </span>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{posts.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">작성한 글</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <p className="text-2xl font-bold text-red-500">{likeCount}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">받은 좋아요</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-500">{commentCount}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">받은 댓글</p>
          </div>
        </div>
      </div>

      {/* 내가 쓴 글 목록 */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">내가 쓴 글</h2>
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            아직 작성한 글이 없습니다.
            <br />
            <Link href="/posts/new" className="text-indigo-600 dark:text-indigo-400 hover:underline mt-2 inline-block font-medium">
              첫 글을 작성해 보세요! →
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/posts/${post.id}`}
                  className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-sm transition-all"
                >
                  <p className="font-medium text-gray-900 dark:text-white">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(post.created_at).toLocaleDateString("ko-KR")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
