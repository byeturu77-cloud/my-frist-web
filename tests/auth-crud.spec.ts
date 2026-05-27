import { test, expect, type Page } from '@playwright/test';

// ─────────────────────────────────────────────
// 환경변수 검증 — 누락 시 테스트 시작 전 즉시 실패
// ─────────────────────────────────────────────
const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

if (!TEST_EMAIL || !TEST_PASSWORD) {
  throw new Error(
    '❌ TEST_EMAIL 또는 TEST_PASSWORD 환경변수가 설정되어 있지 않습니다.\n' +
    '.env.local에 TEST_EMAIL=... 과 TEST_PASSWORD=... 를 추가해주세요.'
  );
}

// ─────────────────────────────────────────────
// 공통 헬퍼: 이메일/비밀번호 로그인
// ─────────────────────────────────────────────
async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');

  // getByLabel 우선 (label 텍스트 일부 매칭)
  await page.getByLabel(/이메일/i).fill(email);
  await page.getByLabel(/비밀번호/i).fill(password);

  // 제출 버튼
  await page.getByRole('button', { name: /로그인/i }).click();

  // 로그인 성공 → /posts 또는 / 로 리다이렉트 대기
  await page.waitForURL(/\/(posts)?$/, { timeout: 10_000 });
}

// ─────────────────────────────────────────────
// 테스트 1 — 행복 경로 (Happy Path)
// ─────────────────────────────────────────────
test('행복 경로: 로그인 → 글 작성 → 목록 확인', async ({ page }) => {
  // 1. 로그인
  await loginAs(page, TEST_EMAIL!, TEST_PASSWORD!);

  // 2. 새 글 작성 페이지 이동
  await page.goto('/posts/new');
  await expect(page).toHaveURL(/\/posts\/new/);

  // 고유 제목 생성 (테스트 재실행 시 구분 가능)
  const uniqueTitle = `E2E 테스트 글 ${Date.now()}`;
  const content = '이것은 Playwright E2E 자동화 테스트로 작성된 게시글입니다.';

  // 3. 제목 / 내용 입력
  await page.getByLabel(/제목/i).fill(uniqueTitle);
  await page.getByLabel(/내용/i).fill(content);

  // 4. 저장 버튼 클릭
  await page.getByRole('button', { name: /저장하기/i }).click();

  // 5. 저장 후 글 상세 또는 목록으로 이동 대기
  await page.waitForURL(/\/posts(\/[^/]+)?$/, { timeout: 10_000 });

  // 6. /posts 목록에서 새 글 제목 확인
  await page.goto('/posts');
  await expect(page.getByText(uniqueTitle)).toBeVisible({ timeout: 8_000 });
});

// ─────────────────────────────────────────────
// 테스트 2 — 거절 경로 (Rejection Path)
// ─────────────────────────────────────────────
test('거절 경로: 비로그인 상태에서 /posts/new 접근 시 /login 리다이렉트', async ({
  browser,
}) => {
  // 새 브라우저 컨텍스트 = 쿠키/세션 완전 초기화 (로그아웃 상태)
  const context = await browser.newContext();
  const page = await context.newPage();

  // /posts/new 직접 접근
  await page.goto('/posts/new');

  // middleware.ts가 /login으로 보내야 함
  await expect(page).toHaveURL(/\/login/, { timeout: 8_000 });

  await context.close();
});
