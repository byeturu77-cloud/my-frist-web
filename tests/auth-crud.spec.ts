import { test, expect } from '@playwright/test';

test.describe('Auth and CRUD Flow', () => {
  test('테스트 1 — 행복 경로: 로그인 후 새 글 작성', async ({ page }) => {
    // 다이얼로그(alert) 자동 수락 처리
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    // 1. /login에서 환경변수로 로그인
    await page.goto('/login');
    
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;
    
    if (!email || !password) {
      throw new Error('TEST_EMAIL or TEST_PASSWORD environment variables are not set.');
    }
    
    await page.getByLabel('이메일').fill(email);
    await page.getByLabel('비밀번호').fill(password);
    await page.getByRole('button', { name: '로그인', exact: true }).click();
    
    // 로그인 후 /posts 경로로 이동하는지 확인
    await expect(page).toHaveURL(/\/posts/);
    
    // 2. /posts/new에서 제목/내용 입력 후 저장
    await page.goto('/posts/new');
    
    const uniqueTitle = `E2E 테스트 글 제목 ${Date.now()}`;
    const uniqueContent = `E2E 테스트 글 내용입니다. ${Date.now()}`;
    
    await page.getByLabel('제목').fill(uniqueTitle);
    await page.getByLabel('내용').fill(uniqueContent);
    
    await page.getByRole('button', { name: '저장하기' }).click();
    
    // 저장 후 리다이렉션 대기 (상세 페이지 또는 목록)
    await expect(page).toHaveURL(/\/posts/);
    
    // 3. /posts 목록에서 새 글 제목 확인
    await page.goto('/posts');
    await expect(page.getByText(uniqueTitle).first()).toBeVisible();
  });

  test('테스트 2 — 거절 경로: 비로그인 상태로 새 글 작성 접근 시도', async ({ page }) => {
    // Playwright의 test는 기본적으로 독립된 브라우저 컨텍스트를 사용하므로 비로그인 상태임
    
    // 다이얼로그(alert) 자동 수락 처리 (미로그인 경고 alert 대응)
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    
    // 2. /posts/new 접속 시도
    await page.goto('/posts/new');
    
    // 3. /login으로 리다이렉트되는지 확인
    await expect(page).toHaveURL(/\/login/);
  });
});
