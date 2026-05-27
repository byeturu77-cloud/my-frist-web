# 🛠️ Project Instructions

- **Tech Stack:** Next.js 16.2.1 (App Router ONLY), Tailwind CSS
- **Coding Conventions:** Server Component 기본, Tailwind CSS만 사용
- **Known AI Mistakes:** next/router 금지(next/navigation 사용), Pages Router 금지, params는 await 필수

## 🛡️ Security & RLS (Chapter 11)
- **보안 계층:** 보안은 클라이언트의 `if`문 분기가 아니라, 데이터베이스의 RLS(Row Level Security)로 강력하게 강제합니다. 클라이언트 분기는 단순한 UX 처리입니다.
- **마이그레이션:** RLS SQL 및 데이터베이스 스키마 변경은 대시보드 SQL Editor 직접 실행을 엄격히 금지하고, 반드시 **Supabase CLI 마이그레이션 파일**로 남깁니다.
- **보안 키:** 브라우저나 클라이언트(프론트엔드) 코드에서는 RLS를 무력화하는 `service_role` 키를 **절대 사용 금지**합니다.
