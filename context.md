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
**Chapter 12: 에러 처리 및 로딩 UX (진행 중)**
- Chapter 11: 보안 (Row Level Security - RLS) (완료)
- Chapter 10: 데이터베이스 CRUD 연동 (완료)

## 3. 핵심 규칙 (Ch12 기준)
- **Next.js & 라우터:** Next.js 16.2.1 버전을 사용하며 오직 App Router(`next/navigation`)만을 허용합니다. (`next/router` 절대 사용 금지)
- **Supabase 인증 방식 (Ch9):** 오직 이메일/비밀번호 기반 인증만 사용하며 `signInWithPassword`를 사용합니다. 상태 관리는 `useAuth/AuthProvider`를 사용합니다.
- **Supabase 클라이언트:** Server Component에서는 `lib/supabase/server.ts`(`createServerClient`), Client Component에서는 `lib/supabase/client.ts`(`createBrowserClient`)를 사용합니다.
- **데이터베이스 스키마:** `posts` 컬럼명은 Ch8 스키마를 그대로 사용합니다.
- **보안 및 UX:** 프론트엔드에서의 클라이언트 UI 분기(본인 글에만 수정/삭제 버튼 노출 등)는 보안이 아니며 UX 개선일 뿐입니다. 실제 보안은 데이터베이스의 RLS(Row Level Security)가 담당합니다.
- **RLS 마이그레이션 (Ch11):** RLS 설정은 Supabase 대시보드(SQL Editor) 직접 실행이 아닌, Supabase CLI 마이그레이션 파일로 작성하여 버전을 관리합니다.
- **RLS 정책 (Ch11):** `posts` 테이블의 정책은 `user_id`와 `auth.uid()`를 기준으로 구성합니다.
- **환경변수 및 권한:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 이름을 유지하며, `service_role` 키는 클라이언트(브라우저)에서 절대 사용하지 않습니다.
- **에러/로딩 UX (Ch12):** 별도 `error.tsx`/`loading.tsx` 파일 대신, 각 page.tsx 안에서 조건부 렌더링으로 처리합니다. 새 라이브러리는 추가하지 않습니다.
- **에러 메시지 (Ch12):** Supabase/네트워크 에러 원문은 `console.error`로만 남기고, 화면에는 `lib/error-message.ts`의 `getErrorMessage()`로 변환한 친절한 한국어 메시지만 표시합니다.
- **폼 검증 (Ch12):** 외부 라이브러리(`react-hook-form`, `zod` 등) 없이 순수 `useState`로 검증합니다.
- **대시보드 UI 안내:** Supabase 대시보드 메뉴 안내는 2026년 5월 기준을 따릅니다.

## 4. Ch10 CRUD 구현 내역
- **글 목록 조회 (Read):** `app/posts/page.tsx`에서 `select` 쿼리 수행 (작성자 profiles 조인 및 최신순 정렬)
- **글 상세 조회 (Read):** `app/posts/[id]/page.tsx`에서 `.select().eq("id", id).single()` 쿼리 수행
- **글 작성 (Create):** `app/posts/new/page.tsx`에서 `.insert({ title, content, user_id: user.id })` 수행
- **글 수정 (Update):** `app/posts/[id]/edit/page.tsx`에서 `.update({ title, content }).eq("id", id)` 수행
- **글 삭제 (Delete):** `app/posts/[id]/page.tsx`에서 `.delete().eq("id", id)` 수행
- **권한 UX:** `user.id === post.user_id` 작성자 조건 분기를 통해 수정/삭제 기능 제한 (실제 보안은 Ch11 RLS에서 처리 예정)

## 4. Ch11 보안 (RLS) 적용 내역
- **posts 테이블 RLS 활성화:** `ALTER TABLE posts ENABLE ROW LEVEL SECURITY;` 완료
- **적용 정책:**
  - SELECT: 누구나 읽기 가능 (`USING (true)`)
  - INSERT: 로그인 사용자만 가능, 본인 글만 작성 가능 (`WITH CHECK (auth.uid() = user_id)`)
  - UPDATE: 작성자 본인만 수정 가능 (`USING` & `WITH CHECK` 둘 다 `auth.uid() = user_id`)
  - DELETE: 작성자 본인만 삭제 가능 (`USING (auth.uid() = user_id)`)
- **마이그레이션 파일 경로:** `supabase/migrations/20260527042631_add_posts_rls.sql`
- **테스트 결과 (검증 완료):**
  - 비로그인: 조회(성공), 작성(실패)
  - 사용자 A: 본인 글 작성/수정/삭제(성공)
  - 사용자 B: 사용자 A의 글 수정/삭제 시도(실패)

## 5. Ch12 에러 처리 및 로딩 UX 구현 내역

### 화면별 loading / empty / error 상태 처리
| 화면 | 로딩 상태 | 빈 상태 | 에러 상태 |
| :--- | :--- | :--- | :--- |
| `/posts` | 서버 렌더링(SSR)이므로 별도 로딩 없음 | "등록된 게시글이 없습니다. 첫 글을 작성해 보세요!" 안내 문구 | 붉은 에러 메시지 블록 표시 |
| `/posts/new` | `useAuth` 로딩 중 → "인증 상태를 확인하고 있습니다..." | — | 폼 상단에 `submitError` 블록, 필드 아래 `titleError`/`contentError` |
| `/posts/[id]` | 클라이언트 fetch 중 로딩 스피너 또는 텍스트 | — | 친절한 에러 메시지 |
| `/login`, `/signup` | 제출 중 버튼 비활성화 | — | `getErrorMessage()`로 변환된 한국어 메시지 |

### 폼 검증 규칙 (`/posts/new`)
- **제목:** 필수, 최소 2자 이상
- **내용:** 필수, 최소 10자 이상
- **제출 중 버튼 비활성화:** `isSubmitting` 상태로 중복 제출 방지
- **인라인 에러:** 각 입력란 아래에 빨간 메시지 즉시 표시, 조건 충족 시 자동 소멸

### 에러 메시지 변환 규칙 (`lib/error-message.ts` — `getErrorMessage()`)
| 조건 | 사용자 메시지 |
| :--- | :--- |
| code `42501` 또는 `row-level security` / `policy` 포함 | "이 작업을 수행할 권한이 없습니다." |
| `failed to fetch` / `network` 포함 | "인터넷 연결을 확인해주세요." |
| code `PGRST116` 또는 `not found` / `no rows` 포함 | "요청한 게시글을 찾을 수 없습니다." |
| `invalid login credentials` 포함 | "이메일 또는 비밀번호가 일치하지 않습니다." |
| 그 외 | "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." |

## 6. 참고 사항
- 코드 구현 시 설명은 Ch7·Ch8 교재 기준의 눈높이에 맞게 초보자 친화적으로 작성합니다.
- `package.json`의 실제 버전이 교재 기준보다 높더라도, 수업 프롬프트나 설명에서는 교재 기준 버전을 기준으로 설명합니다.

## 7. QA 및 배포 검증 내역 (진행 중)
- **보안 검증:** `service_role`, `next/router` 키워드 노출 없음 (통과)
- **코드리뷰 후속 조치:**
  - `profiles` 테이블 RLS 및 가입 시 자동 생성 트리거 적용 완료
  - `proxy.ts`를 활용한 서버사이드 보호 라우트(미인증 사용자 `/login` 리다이렉트) 설정 완료
- **로컬 E2E 테스트 (Playwright):** 
  - 거절 경로(미로그인 접근 차단) 정상 작동 (통과)
  - 행복 경로(로그인/작성/조회) 정상 작동 (통과, `setup_test_user.ts`로 테스트 계정 세팅)
- **Vercel 배포 검증:** ⚠️ Vercel 미연동 상태로 검증 보류 (확인 필요)
