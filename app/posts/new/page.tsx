'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    // 백엔드 연동 전이므로 알림창만 띄웁니다.
    alert('저장되었습니다');

    // 작성 완료 후 요청하신 /posts 경로로 이동합니다.
    router.push('/posts');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">
      <header>
        <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          &larr; 홈으로 이동
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-4 tracking-tight">
          새 글 작성
        </h1>
        <p className="text-gray-500 mt-2">
          새로운 블로그 게시글을 작성해보세요.
        </p>
      </header>

      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-semibold text-gray-800">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="게시글의 제목을 입력하세요"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base"
            required
          />
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
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base leading-relaxed"
            required
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all"
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
