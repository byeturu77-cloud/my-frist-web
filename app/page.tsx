import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col min-h-screen">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold mb-4">블로그 제목</h1>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/" className="hover:underline">홈</Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">소개</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow flex flex-col gap-6">
        <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-bold mb-2">첫 번째 게시글 제목</h2>
          <p className="text-gray-600 mb-4">첫 번째 게시글의 내용 미리보기입니다. 블로그의 첫 글을 환영합니다.</p>
          <div className="text-sm text-gray-400">
            <span>작성자: 홍길동</span> | <time dateTime="2024-03-30">2024년 3월 30일</time>
          </div>
        </article>

        <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-bold mb-2">두 번째 게시글 제목</h2>
          <p className="text-gray-600 mb-4">두 번째 게시글의 내용 미리보기입니다. Next.js를 배우고 있습니다.</p>
          <div className="text-sm text-gray-400">
            <span>작성자: 홍길동</span> | <time dateTime="2024-03-29">2024년 3월 29일</time>
          </div>
        </article>

        <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-bold mb-2">세 번째 게시글 제목</h2>
          <p className="text-gray-600 mb-4">세 번째 게시글의 내용 미리보기입니다. 시맨틱 태그를 활용한 마크업 구조입니다.</p>
          <div className="text-sm text-gray-400">
            <span>작성자: 홍길동</span> | <time dateTime="2024-03-28">2024년 3월 28일</time>
          </div>
        </article>
      </main>

      <footer className="mt-12 border-t pt-4 text-center text-sm text-gray-500">
        <p>&copy; 2024 블로그 제목. All rights reserved.</p>
      </footer>
    </div>
  );
}
