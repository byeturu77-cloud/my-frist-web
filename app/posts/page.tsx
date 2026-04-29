import Link from "next/link";
import { fetchPosts } from "@/lib/posts";
import PostListView from "@/components/PostListView";
import { Button } from "@/components/ui/button";

export default async function PostsPage() {
  const posts = await fetchPosts();

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
