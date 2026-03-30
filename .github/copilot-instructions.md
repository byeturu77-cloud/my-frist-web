# 프로젝트 규칙 및 지침 (Copilot Instructions)

## Tech Stack
- **Next.js**: v16.2.1 (App Router ONLY)
- **Tailwind CSS**: v4

## Coding Conventions
- **Server Component 우선**: 모든 컴포넌트는 Server Component를 기본으로 작성합니다. 클라이언트 상호작용이 필수적인 경우에만 파일 최상단에 `"use client"`를 명시하여 Client Component로 전환합니다.
- **Tailwind CSS 전용**: 스타일링은 오직 Tailwind CSS만을 사용합니다. 외부 CSS 파일이나 styled-components 등은 사용하지 않습니다.

## Known AI Mistakes (주의사항)
- `next/router` 사용 **절대 금지**. 라우팅을 조작할 때는 반드시 `next/navigation`에서 제공하는 훅(`useRouter` 등)을 사용합니다.
- **Pages Router 코드 생성 금지**. 과거의 `pages/` 디렉터리 기반 문법이나 패턴은 사용하지 않고, 오로지 최신 **App Router** (`app/`) 기준의 코드만 작성/수정합니다.
- `params`나 `searchParams`를 다룰 때는 항상 비동기 처리를 가정하고 `await`를 사용해야 합니다. (Next.js 15+ App Router 변경 사항 대응)
