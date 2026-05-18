# 🧠 Project Context

이 문서는 프로젝트의 배경, 현재 상태, 그리고 AI가 참고해야 할 주요 문맥(Context)을 제공합니다.

## Version Policy
- 교재 기준: Next.js 16.2.1, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2
- 현재 설치 기준: Next.js 16.2.1, @supabase/supabase-js ^2.105.1, @supabase/ssr ^0.10.2 (실제 package.json이 더 최신일 수 있다.)
- 수업 프롬프트와 설명은 교재 기준으로 통일한다.
- 빌드 오류가 버전 차이에서 발생하면 package.json 기준으로 원인을 확인한다.

## 1. 프로젝트 목표
이 프로젝트는 초보 개발자가 Next.js App Router와 Supabase를 사용하여 자신만의 블로그를 구축하는 과정을 담고 있습니다. 사용자 인증, 데이터베이스 CRUD, 기본 UI 구현 등 필수적인 웹 개발 경험을 목표로 합니다.

## 2. 현재 작업 챕터 (Current Chapter)
**Chapter 10: 데이터베이스 CRUD 연동 (완료)**

## 3. 핵심 규칙 (Ch10 기준)
- **Next.js & 라우터:** Next.js 16.2.1 버전을 사용하며 오직 App Router(`next/navigation`)만을 허용합니다. (`next/router` 절대 사용 금지)
- **Supabase 인증 방식 (Ch9):** 오직 이메일/비밀번호 기반 인증만 사용하며 `signInWithPassword`를 사용합니다. 상태 관리는 `useAuth/AuthProvider`를 사용합니다.
- **Supabase 클라이언트 (Ch8):** 데이터베이스 접근 시 `lib/supabase/client.ts`를 사용합니다.
- **데이터베이스 스키마:** `posts` 컬럼명은 Ch8 스키마를 그대로 사용합니다.
- **보안 및 UX:** 게시글 수정/삭제 기능은 프론트엔드 UI(UX) 관점에서 먼저 구현하며, 실제 보안(접근 제어)은 Ch11의 RLS(Row Level Security)에서 처리합니다.
- **환경변수:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 이름을 유지합니다.
- **대시보드 UI 안내:** Supabase 대시보드 메뉴 안내는 2026년 5월 기준을 따릅니다.

## 4. Ch10 CRUD 구현 내역
- **글 목록 조회 (Read):** `app/posts/page.tsx`에서 `select` 쿼리 수행 (작성자 profiles 조인 및 최신순 정렬)
- **글 상세 조회 (Read):** `app/posts/[id]/page.tsx`에서 `.select().eq("id", id).single()` 쿼리 수행
- **글 작성 (Create):** `app/posts/new/page.tsx`에서 `.insert({ title, content, user_id: user.id })` 수행
- **글 수정 (Update):** `app/posts/[id]/edit/page.tsx`에서 `.update({ title, content }).eq("id", id)` 수행
- **글 삭제 (Delete):** `app/posts/[id]/page.tsx`에서 `.delete().eq("id", id)` 수행
- **권한 UX:** `user.id === post.user_id` 작성자 조건 분기를 통해 수정/삭제 기능 제한 (실제 보안은 Ch11 RLS에서 처리 예정)

## 4. 참고 사항
- 코드 구현 시 설명은 Ch7·Ch8 교재 기준의 눈높이에 맞게 초보자 친화적으로 작성합니다.
- `package.json`의 실제 버전이 교재 기준보다 높더라도, 수업 프롬프트나 설명에서는 교재 기준 버전을 기준으로 설명합니다.
