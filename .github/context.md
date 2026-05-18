# 프로젝트 컨텍스트 (Context)

## 현재 상태 (Current State)
- **완료된 챕터**: Chapter 10 완료 (데이터베이스 CRUD 연동)
- **데이터베이스 CRUD 연동 완료**: `app/posts/page.tsx`, `app/posts/[id]/page.tsx`, `app/posts/new/page.tsx`, `app/posts/[id]/edit/page.tsx` 등 모든 CRUD 연동을 성공적으로 구현했습니다.
- **인증 시스템 완료 (Ch9)**: Supabase Auth 이메일/비밀번호 기반 회원가입, 로그인, 로그아웃 및 전역 `useAuth/AuthProvider` 상태 관리와 미들웨어 보호가 완비되었습니다.
- **생성/수정 파일 목록**:
  - `lib/posts.ts` (타입 변경 및 Supabase DB 연동)
  - `app/posts/page.tsx` (목록 SELECT)
  - `app/posts/[id]/page.tsx` (상세 단일 SELECT 및 삭제)
  - `app/posts/new/page.tsx` (게시글 INSERT)
  - `app/posts/[id]/edit/page.tsx` (게시글 UPDATE)
  - `components/PostListView.tsx` (검색 필터 및 삭제 UX)
- **Supabase 쿼리 패턴**:
  - **Select (목록)**: `supabase.from("posts").select("id, title, content, created_at, user_id, profiles(username)").order("created_at", { ascending: false })`
  - **Select (단일)**: `supabase.from("posts").select("id, title, content, created_at, user_id, profiles(username)").eq("id", id).single()`
  - **Insert**: `supabase.from("posts").insert({ title, content, user_id: user.id })`
  - **Update**: `supabase.from("posts").update({ title, content }).eq("id", id)`
  - **Delete**: `supabase.from("posts").delete().eq("id", id)`
- **작성자 UI 분기**: `user.id === post.user_id`를 기반으로 글 상세 및 목록 카드에서 본인 게시글인 경우에만 수정/삭제 버튼 노출 (UX).
- **보안 원칙**: 현재 단계의 UI 분기는 사용자 편의(UX)이며, 실제 권한 검증 및 보안은 Ch11의 데이터베이스 RLS 정책에서 완벽하게 제어할 예정입니다.

## 기술 결정 사항 (Technical Decisions)
- **프레임워크**: Next.js 16 (App Router 기반)
- **라우팅 패턴**: `next/navigation` 활용, `/` 접근 시 `/posts`로 자동 리다이렉트 처리.
- **스타일링**: Tailwind CSS 전용 사용, 커스텀 CSS 지양.
- **UI 라이브러리**: `shadcn/ui` 기반.
- **데이터베이스/인증**: Supabase PostgreSQL 및 Supabase Auth(이메일/비밀번호) 완료. Ch11 RLS 및 Ch12 배포 준비 예정.
