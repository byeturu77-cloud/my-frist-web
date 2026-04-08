import Link from "next/link";
import { posts } from "@/lib/posts";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 16 App Router: params를 비동기로 추출합니다.
  const { id } = await params;
  
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          게시글을 찾을 수 없습니다 😢
        </h1>
        <p className="text-gray-500 mb-8">
          요청하신 페이지가 존재하지 않거나 삭제되었습니다.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">
      <header className="border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {post.author}
          </span>
          <span>•</span>
          <time dateTime={post.date}>{post.date}</time>
        </div>
      </header>
      
      <main className="text-lg text-gray-700 leading-relaxed min-h-[30vh]">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </main>

      <footer className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
          목록으로 돌아가기
        </Link>
      </footer>
    </article>
  );
}
