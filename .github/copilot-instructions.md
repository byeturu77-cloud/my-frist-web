# 🤖 AI 코딩 어시스턴트(Copilot)를 위한 프로젝트 가이드라인

이 문서는 이 프로젝트에서 AI가 코드를 작성하거나 수정할 때 지켜야 할 핵심 규칙입니다.
초보 개발자가 프로젝트를 관리하고 있으므로, 코드는 최대한 읽기 쉽고 직관적으로 작성해야 합니다.

## Version Policy
- 교재 기준: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2
- 현재 설치 기준: Next.js 16.2.1, @supabase/supabase-js ^2.105.1, @supabase/ssr ^0.10.2
- 실제 package.json이 더 최신일 수 있다.
- 수업 프롬프트와 설명은 교재 기준으로 통일한다.
- 빌드 오류가 버전 차이에서 발생하면 package.json 기준으로 원인을 확인한다.

## 1. Next.js App Router 사용 규칙 🚀
- **최신 Next.js 규칙 따르기:** 이 프로젝트는 Next.js 16.2.1을 기반으로 하며 `App Router(app/ 디렉토리)` 방식을 사용합니다. 구형 `Pages Router(pages/ 디렉토리)` 방식의 코드나 `next/router`는 절대 작성하지 마세요.
- **서버 컴포넌트 우선:** 기본적으로 모든 컴포넌트는 '서버 컴포넌트'로 작성합니다. 사용자 상호작용(클릭 등)이나 상태 관리(`useState`, `useEffect`)가 필요한 경우에만 파일 맨 위에 `"use client"`를 명시하여 클라이언트 컴포넌트로 만듭니다.
- **보호 라우트:** 이 교재에서는 보호 라우트 파일로 `middleware.ts`를 사용합니다.

## 2. Supabase Auth 사용 규칙 🔒
- **인증 방식:** 이메일/비밀번호 인증만 사용합니다. 소셜 로그인은 추가하지 않습니다.
- **로그인 메서드:** Supabase Auth 로그인은 `signInWithPassword`를 사용합니다. 구버전 `auth.signIn()`은 사용하지 않습니다.
- **환경변수:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 유지합니다.
- **보안 주의:** `service_role` 키는 클라이언트에 절대 두지 마세요.

## 3. TypeScript와 Tailwind CSS 사용 규칙 🎨
- **TypeScript (타입스크립트):**
  - 데이터 타입을 알 수 없는 `any`는 가급적 사용하지 마세요.
  - 데이터의 형태를 나타낼 때는 `interface`나 `type`을 명확하게 정의해서 사용하세요.
- **Tailwind CSS (스타일링):**
  - 스타일링은 오직 Tailwind CSS만을 사용합니다. 외부 CSS 파일에 직접 스타일을 작성하거나 `styled-components` 등을 추가로 사용하지 않습니다.

## 4. shadcn/ui 컴포넌트 사용 규칙 🧩
- **기존 컴포넌트 재사용:** 버튼, 입력창, 모달 같은 기본 UI 컴포넌트를 밑바닥부터 새로 만들지 마세요. 프로젝트에 이미 설치된 `shadcn/ui` 컴포넌트를 먼저 확인하고 가져다 쓰세요.
- **경로 주의:** `shadcn/ui` 컴포넌트를 불러올 때는 `import { Button } from "@/components/ui/button"` 과 같이 `@/` 경로를 사용합니다.

## 5. AI가 자주 틀릴 수 있는 주의사항 ⚠️ (필독)
- **비동기 Params 처리 (Next.js 15+ 주의):** 페이지에서 `params`나 `searchParams`를 다룰 때는 항상 비동기(Promise) 처리를 가정하고 `await`를 사용해서 값을 꺼내야 합니다. (예: `const { id } = await params;`)
- **과거 문법 주의:** 인터넷에 있는 옛날 React나 Next.js 코드를 그대로 가져오지 마세요. 항상 "이 코드가 최신 Next.js App Router 환경에 맞는 방식인가?"를 검증하세요.

## 6. Design Tokens (디자인 토큰) 🎨
- **Colors**: 브랜드 컬러는 파란색 계열(`blue-600`)을 메인으로 사용합니다. 배경은 화이트(`bg-white`) 또는 매우 연한 회색(`bg-gray-50`)을, 텍스트는 짙은 회색(`text-gray-900`, `text-gray-600`)을 사용하여 가독성을 높입니다.
- **Spacing**: 모바일에서는 `p-4` 또는 `px-4`, 데스크톱에서는 `p-6` 또는 `px-6` 이상의 여백을 주어 답답하지 않게 구성합니다. 컨테이너는 `max-w-4xl` ~ `max-w-6xl` 중앙 정렬을 원칙으로 합니다.

## 7. Component Rules (컴포넌트 규칙) 🧩
- **단일 책임 원칙**: 하나의 컴포넌트 파일이 너무 길어지면 안 됩니다. 복잡한 UI나 로직이 섞일 경우 작은 컴포넌트 여러 개로 쪼개어 재사용성을 높이세요.
- **UI/비즈니스 분리**: 뷰(View)를 그리는 프레젠테이셔널 컴포넌트와, 데이터를 불러오고 가공하는 컨테이너 컴포넌트를 명확히 분리하려고 노력하세요.

## 8. 데이터베이스 CRUD 연동 규칙 (Chapter 10) 💾
- **Supabase 클라이언트:** DB 접근에는 `lib/supabase/client.ts`를 사용합니다.
- **인증 상태:** 현재 사용자 정보 확인 등 인증 상태 관리에는 `useAuth()` 및 `AuthProvider` (Ch9)를 사용합니다.
- **스키마 호환성:** 테이블명(`posts`)과 컬럼명은 Ch8의 스키마 설계를 엄격히 준수하며 **임의 변경을 절대 금지**합니다. (구버전 `next/router` 및 클라이언트 `service_role` 키의 사용 역시 전면 금지합니다.)
- **권한 및 보안 분리:** 프론트엔드에서는 수정/삭제 버튼 노출 등 UX 차원의 처리만 구현하며, 실제 보안(누가 지울 수 있는가)은 Ch11의 RLS에서 처리하므로 복잡한 보안 로직을 프론트에 하드코딩하지 않습니다.
