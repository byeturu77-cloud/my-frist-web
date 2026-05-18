# 🛠️ Project Specific AI Rules

이 문서는 AI가 프로젝트에 코드를 작성할 때 강제로 적용해야 할 시스템 레벨의 규칙입니다.

## Version Policy
- 교재 기준: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2
- 현재 설치 기준: Next.js 16.2.1, @supabase/supabase-js ^2.105.1, @supabase/ssr ^0.10.2 (실제 package.json이 더 최신일 수 있다.)
- 수업 프롬프트와 설명은 교재 기준으로 통일한다.
- 빌드 오류가 버전 차이에서 발생하면 package.json 기준으로 원인을 확인한다.

## 1. Next.js 16.2.1 규칙
- 무조건 App Router (`app/`)를 사용한다. `pages/` 디렉토리는 금지.
- 라우터 패키지는 `next/navigation`만 사용한다. `next/router`는 절대 금지.
- Params 및 SearchParams 처리는 비동기(`await params`, `await searchParams`) 방식으로 작성한다.
- 보호 라우트 처리는 `middleware.ts`를 사용한다.

## 2. Supabase Auth 규칙 (Chapter 9)
- 소셜 로그인은 작성하지 않는다. 오직 이메일/비밀번호 인증만 사용한다.
- 로그인은 반드시 `signInWithPassword`를 사용한다.
- 환경변수 네이밍: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 고정.
- 클라이언트에 `service_role` 키가 포함되는 코드는 절대 작성 금지.

## 3. UI 및 Styling 규칙
- Tailwind CSS와 shadcn/ui 기반으로만 작성한다. 
- 커스텀 CSS 파일 생성 금지 (전역 CSS 제외).
- `any` 타입 사용 금지. 명확한 TypeScript 타입을 정의할 것.

## 4. 데이터베이스 CRUD 연동 (Chapter 10) 규칙
- 데이터베이스 연동 시 Ch8에서 작성한 `lib/supabase/client.ts`를 활용한다.
- 인증 상태 관리는 Ch9에서 작성한 `useAuth/AuthProvider`를 사용한다.
- `posts` 컬럼명 등은 Ch8에서 구성한 스키마 구조를 그대로 사용한다.
- UI 상의 수정/삭제 기능은 프론트엔드 관점(UX)에서 구현하며, 실제 데이터베이스 레벨의 권한 제어 및 보안 처리는 Chapter 11의 RLS(Row Level Security)에서 담당함을 유의한다.
