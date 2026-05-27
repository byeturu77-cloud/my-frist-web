-- 1. posts 테이블의 RLS(Row Level Security) 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 2. 기존 정책 중복 생성 충돌 방지 (안전장치)
DROP POLICY IF EXISTS "Enable read access for all users" ON posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON posts;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON posts;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON posts;

-- 3. 정책 생성
-- SELECT: 누구나 읽기 가능
CREATE POLICY "Enable read access for all users" 
ON posts 
FOR SELECT 
USING (true);

-- INSERT: 로그인 사용자만 생성 가능, 본인 글만 허용
CREATE POLICY "Enable insert for authenticated users only" 
ON posts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- UPDATE: 작성자 본인만 수정 가능, 타인 소유로 변경 방지
CREATE POLICY "Enable update for users based on user_id" 
ON posts 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- DELETE: 작성자 본인만 삭제 가능
CREATE POLICY "Enable delete for users based on user_id" 
ON posts 
FOR DELETE 
USING (auth.uid() = user_id);
