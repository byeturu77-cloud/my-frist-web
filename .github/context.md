# 프로젝트 컨텍스트 (Context)

## 현재 상태 (Current State)
- **완료된 챕터**: Chapter 7 완료
- **UI/UX**: `shadcn/ui`를 도입하여 `Button`, `Card` 컴포넌트를 기반으로 블로그 홈, 포스트 목록, 포스트 상세, 포스트 작성 페이지의 프론트엔드 UI를 구축 완료했습니다.
- **반응형 디자인**: 모바일(375px), 태블릿(768px), 데스크톱(1280px) 환경에서 깨짐 없이 렌더링되도록 Tailwind CSS를 사용해 레이아웃 최적화를 마쳤습니다. (헤더 겹침 해결, 터치 영역 확보 등)
- **모의 데이터**: 현재는 백엔드 연동 전이므로 로컬 배열 또는 가상의 데이터 소스를 통해 UI 흐름만 확인하고 있습니다.

## 기술 결정 사항 (Technical Decisions)
- **프레임워크**: Next.js 16 (App Router 기반)
- **라우팅 패턴**: `next/navigation` 활용, `/` 접근 시 `/posts`로 자동 리다이렉트 처리.
- **스타일링**: Tailwind CSS 전용 사용, 커스텀 CSS 지양.
- **UI 라이브러리**: `shadcn/ui` 기반, 필요 컴포넌트는 `npx shadcn@latest add` 방식으로 점진적 설치.
- **데이터베이스/인증 (예정)**: Chapter 8부터 Supabase PostgreSQL 및 Supabase Auth(이메일/비밀번호)를 도입하여 백엔드를 구성할 예정입니다.
