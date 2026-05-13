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
**Chapter 9: 인증 (Authentication) 구현**

## 3. 핵심 규칙 (Ch9 기준)
- **Next.js & 라우터:** Next.js 16.2.1 버전을 사용하며 오직 App Router만을 허용합니다. (pages router나 `next/router` 절대 사용 금지)
- **Supabase 인증 방식:** 오직 이메일/비밀번호 기반 인증만 사용합니다. 소셜 로그인은 도입하지 않습니다. 로그인 시 구버전 `auth.signIn()` 대신 `signInWithPassword`를 사용합니다.
- **환경변수:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 이름을 반드시 사용/유지합니다. 클라이언트 측에 `service_role` 키 노출은 절대 금지합니다.
- **보호 라우트 (Protected Routes):** 이 교재에서는 사용자 인증 여부에 따른 접근 제어를 위해 `middleware.ts`를 사용합니다.
- **대시보드 UI 안내:** Supabase 대시보드 메뉴 안내는 2026년 5월 기준을 따릅니다.

## 4. 참고 사항
- 코드 구현 시 설명은 Ch7·Ch8 교재 기준의 눈높이에 맞게 초보자 친화적으로 작성합니다.
- `package.json`의 실제 버전이 교재 기준보다 높더라도, 수업 프롬프트나 설명에서는 교재 기준 버전을 기준으로 설명합니다.
