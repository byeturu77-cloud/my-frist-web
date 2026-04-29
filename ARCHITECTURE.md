# 🏛️ My Blog Project Architecture

이 문서는 개인 블로그 프로젝트의 전체적인 구조와 흐름을 파악하기 위한 설계 문서입니다.

## 1. 기술 스택 (Tech Stack) 🛠️
- **프레임워크**: Next.js 16 (App Router)
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **데이터베이스 및 백엔드**: Supabase (PostgreSQL)
- **인증 (Auth)**: Supabase Auth (이메일/비밀번호 로그인)

---

## 2. 페이지 맵 및 데이터 흐름 (Page Map & Data Flow) 🗺️

| 화면 이름 | URL 주소 | 파일 위치 (Next.js) | 주요 컴포넌트 | 데이터 흐름 |
| :--- | :--- | :--- | :--- | :--- |
| **홈 (포스트 목록)**| `/` | `app/page.tsx` | - | - 접속 시 바로 `/posts`로 자동 리다이렉트(`redirect`) |
| **글 목록** | `/posts` | `app/posts/page.tsx` | `PostListView`, `SearchBar`, `Card` | **[Server]** Supabase에서 전체 글 조회 <br> **[Client]** 검색어 상태에 따른 필터링 렌더링 |
| **글 상세** | `/posts/[id]` | `app/posts/[id]/page.tsx` | `Card`, `Button` | **[Server]** URL의 `id` 파라미터로 Supabase에서 단일 글 조회 |
| **글 작성** | `/posts/new` | `app/posts/new/page.tsx` | `Input`, `Textarea`, `Button` | **[Client]** 사용자 입력 폼 처리 <br> **[Server/Action]** Supabase `posts` 테이블에 INSERT |
| **마이페이지**| `/mypage` | `app/mypage/page.tsx` | `Card`, `Button` | **[Server]** 인증된 사용자의 본인 정보 및 작성 글 목록 조회 |
| **로그인** | `/login` | `app/login/page.tsx` | `Input`, `Button` | **[Client/Action]** 이메일/비밀번호 검증 및 세션 생성 (Supabase Auth) |
| **회원가입** | `/signup` | `app/signup/page.tsx` | `Input`, `Button` | **[Client/Action]** 신규 계정 등록 및 `Users` 테이블 연동 |

---

## 3. 유저 플로우 (User Flow) 🚶‍♂️

### 📖 글 읽기 흐름
1. **홈(`/`)** 접속 시 **글 목록(`/posts`)** 으로 자동 이동(리다이렉트)
2. `PostListView`를 통해 전체 글 확인 및 `SearchBar`로 제목 검색
3. 리스트에서 원하는 포스트의 카드를 클릭 ➡️ **글 상세(`/posts/[id]`)** 페이지에서 본문 읽기

### ✍️ 글 작성 흐름 (인증 필요)
1. 사용자가 이메일/비밀번호 방식을 통해 **로그인** 수행 (Supabase Auth 연동)
2. 로그인 성공 후 상단 네비게이션의 "새 글 쓰기" 버튼 클릭 ➡️ **글 작성(`/posts/new`)** 폼으로 이동
3. 폼에 제목과 내용을 작성하고 "발행" 버튼 클릭
4. Supabase DB에 데이터가 성공적으로 저장되면, 방금 작성한 **글 상세(`/posts/[id]`)** 페이지로 자동 이동

---

## 4. 컴포넌트 구조 및 디자인 토큰 🧩

### 4.1. 공통 UI 컴포넌트 계층 (`shadcn/ui`)
`components/ui/` 폴더에 위치하며, 사이트 전반에서 재사용되는 가장 작은 단위의 컴포넌트입니다.
- **`Button`**: 클릭 가능한 버튼 (새 글 쓰기 버튼, 폼 제출, 글 삭제 버튼 등)
- **`Card`**: 콘텐츠를 감싸는 레이아웃 컨테이너 (`PostListView`의 개별 게시글 표시)
- **`Input` / `Textarea`**: 사용자 입력을 받는 폼 필드 (`SearchBar` 및 게시글 제목/본문 작성)
- **`Dialog`**: 모달 팝업 창 (글 삭제 확인, 에러 경고 등)

### 4.2. 주요 도메인 컴포넌트 계층 (`components/`)
특정 비즈니스 로직이나 페이지 목적을 위해 UI 컴포넌트를 조립한 덩치가 큰 컴포넌트입니다.
- **`Header` / `Footer`**: 글로벌 네비게이션 바 및 하단 저작권 정보.
- **`SearchBar`**: `Input`을 활용하여 검색어(상태)를 관리하고 필터링 로직에 연결하는 컴포넌트.
- **`PostListView`**: 서버에서 받은 초기 게시글 데이터를 상태로 관리하며, 목록을 `Card` 형태로 매핑하는 뷰 컴포넌트.

### 4.3. 디자인 토큰 (Design Tokens)
`copilot-instructions.md`의 규칙을 따르는 전역 디자인 원칙입니다.
- **색상**: 기본 무채색(Gray-800, Gray-500)을 바탕으로 가독성을 높이고, 중요 버튼이나 상호작용 요소에 포인트 색상(Blue-600)을 사용합니다.
- **레이아웃**: 중앙 정렬된 반응형 컨테이너(`max-w-4xl` ~ `max-w-6xl`)를 사용하여 모든 기기에서 안정감을 줍니다. 모바일 화면에서 메뉴를 숨기거나 세로 정렬(`flex-col`)하는 모바일 퍼스트 방식을 따릅니다.
- **상호작용**: 버튼이나 카드에 마우스를 올렸을 때 부드러운 전환 효과(`transition-colors`, `hover:shadow-md`)와 테두리 색상 변화를 주어 피드백을 명확히 전달합니다.

---

## 5. 데이터베이스 스키마 및 모델 (DB Schema) 📊
Supabase(PostgreSQL)를 기반으로 구축된 데이터 모델입니다. 인증된 사용자의 프로필 정보와 작성한 포스트 간의 관계를 정의합니다.

### 5.1. Profiles (사용자 프로필)
Supabase Auth(`auth.users`) 시스템과 연결되어 화면에 표시될 사용자 정보를 저장합니다.
- `id` (UUID, PK) : 사용자 고유 식별자 (`auth.users.id` 참조)
- `username` (Text) : 화면에 표시될 사용자 닉네임/이름
- `avatar_url` (Text) : 프로필 이미지 URL
- `created_at` (Timestamptz) : 프로필 생성 일시

### 5.2. Posts (포스트)
블로그에 발행된 개별 게시글 데이터를 저장합니다.
- `id` (UUID, PK) : 포스트 고유 식별자
- `user_id` (UUID, FK) : 작성자의 식별자 (`profiles.id` 참조)
- `title` (Text) : 포스트 제목
- `content` (Text) : 포스트 본문 내용
- `created_at` (Timestamptz) : 작성 일시

### 5.3. Entity Relationship (테이블 관계)
- **`profiles` (1) : (N) `posts`** (일대다 관계)
- 포스트 목록이나 상세 페이지를 조회할 때, `posts` 테이블의 `user_id`를 기반으로 `profiles` 테이블을 조인(Join)하여 작성자의 `username`과 `avatar_url`을 함께 가져오는 구조입니다.
