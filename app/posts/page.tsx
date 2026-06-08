import Link from "next/link";
import PostListView from "@/components/PostListView";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Post } from "@/lib/posts";

export default async function PostsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
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
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="py-12 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-2">에러가 발생했습니다 😢</h1>
        <p className="text-gray-500">{error.message}</p>
      </div>
    );
  }

  // Transform data to match Post type
  const posts: Post[] = (data || []).map((post: any) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    author: post.profiles?.username || "익명",
    date: post.created_at ? new Date(post.created_at).toISOString().split('T')[0] : "",
    user_id: post.user_id,
  }));

  return (
    <div className="py-8 max-w-6xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900">게시글 목록</h1>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 font-semibold shadow-sm text-white">
          <Link href="/posts/new">
            새 글 작성
          </Link>
        </Button>
      </div>
      
      <PostListView initialPosts={posts} />
    </div>
  );
}
