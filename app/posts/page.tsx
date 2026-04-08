import Link from "next/link";
import { posts } from "@/lib/posts";

export default function PostsPage() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">게시글 목록</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id} className="block group">
            <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md hover:border-blue-400">
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <div className="text-sm text-gray-500 mb-4 font-medium">
                {post.date} · {post.author}
              </div>
              <p className="text-gray-600 line-clamp-3">
                {post.content}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
