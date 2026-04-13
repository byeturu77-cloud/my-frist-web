import Link from "next/link";
import { fetchPosts } from "@/lib/posts";
import PostListView from "@/components/PostListView";

export default async function PostsPage() {
  const posts = await fetchPosts();

  return (
    <div className="py-8 max-w-6xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900">게시글 목록</h1>
        <Link 
          href="/posts/new"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
        >
          새 글 작성
        </Link>
      </div>
      
      <PostListView initialPosts={posts} />
    </div>
  );
}
