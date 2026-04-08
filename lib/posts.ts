export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: "첫 번째 블로그 게시글",
    content: "안녕하세요, 이것은 제 첫 번째 블로그 게시글입니다. Next.js와 Tailwind CSS를 활용해서 만들고 있어요.",
    author: "관리자",
    date: "2026-04-01",
  },
  {
    id: 2,
    title: "Next.js App Router 살펴보기",
    content: "Next.js 13부터 도입된 App Router는 아주 강력합니다. 서버 컴포넌트와 클라이언트 컴포넌트를 분리해서 효과적으로 활용할 수 있죠.",
    author: "관리자",
    date: "2026-04-03",
  },
  {
    id: 3,
    title: "Tailwind CSS 스타일링",
    content: "유틸리티 퍼스트 CSS 프레임워크인 Tailwind CSS 4를 통해 빠르게 컴포넌트를 꾸미는 중입니다.",
    author: "관리자",
    date: "2026-04-06",
  },
];
