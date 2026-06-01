-- 1. profiles 테이블 RLS 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. profiles 테이블 읽기 정책 (누구나 조회 가능)
DROP POLICY IF EXISTS "Enable read access for all users on profiles" ON profiles;
CREATE POLICY "Enable read access for all users on profiles" 
ON profiles 
FOR SELECT 
USING (true);

-- 3. profiles 테이블 업데이트 정책 (본인만 수정 가능)
DROP POLICY IF EXISTS "Enable update for users based on id on profiles" ON profiles;
CREATE POLICY "Enable update for users based on id on profiles" 
ON profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 4. auth.users 생성 시 public.profiles에 자동 추가하는 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, role, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'name', -- 회원가입 시 전달된 메타데이터 'name'을 username으로 매핑
    'user',
    NULL
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. auth.users 트리거 설정 (기존에 있으면 삭제 후 재생성)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
