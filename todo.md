# 블로그 프로젝트 전체 작업 체크리스트 (Ch8 ~ Ch12)

## Chapter 8: Supabase 초기 설정 및 데이터 모델링
- [ ] Supabase 프로젝트 생성 및 API 키 환경변수(`.env.local`) 설정
- [ ] `profiles`, `posts` 테이블 생성 (SQL Editor 활용)
- [ ] TypeScript 타입(Supabase Database Types) 생성 및 프로젝트 적용

## Chapter 9: 인증 (Authentication) 구현
- [ ] Supabase Auth 이메일/비밀번호 로그인 설정 활성화
- [ ] 회원가입(`/signup`) 및 로그인(`/login`) 페이지 UI 구현
- [ ] Auth 상태 관리를 위한 헬퍼 함수 작성 (`createClient`)
- [ ] 인증된 사용자만 접근할 수 있는 보호된 라우트(Protected Route) 설정

## Chapter 10: 데이터베이스 CRUD 연동
- [ ] 글 작성(`/posts/new`): 폼 데이터를 Supabase `posts` 테이블에 INSERT
- [ ] 글 목록(`/posts`): Supabase `posts` 테이블에서 데이터 SELECT 및 렌더링
- [ ] 글 상세(`/posts/[id]`): URL의 `id`를 기반으로 단일 포스트 SELECT
- [ ] 글 삭제/수정: 본인이 작성한 글에만 표시되는 권한 기반 로직 처리

## Chapter 11: 보안 (Row Level Security - RLS)
- [ ] `profiles` 테이블 RLS 정책 설정 (자신의 프로필만 수정 가능)
- [ ] `posts` 테이블 RLS 정책 설정 (모두가 조회 가능, 작성자만 수정/삭제 가능)
- [ ] 사용자 프로필과 게시글 연동 테스트 (FK 검증)

## Chapter 12: 배포 및 마무리
- [ ] Vercel을 통한 프로젝트 배포 (환경변수 설정 포함)
- [ ] 배포된 환경에서 인증, CRUD, 검색 기능 전체 테스트
- [ ] 최종 QA 및 README.md 작성
