-- 1. posts 테이블에 image_url 컬럼 추가
ALTER TABLE posts ADD COLUMN IF NOT EXISTS image_url text;

-- 2. images 스토리지 버킷 생성 (존재하지 않으면 삽입)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. images 버킷에 대한 RLS 정책 생성
-- (주의: storage.objects 테이블 자체에는 이미 RLS가 켜져 있어야 합니다.)

-- 누구나 이미지 조회 가능
CREATE POLICY "Public Access for images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'images');

-- 로그인한 사용자만 이미지 업로드 가능
CREATE POLICY "Auth Users Can Upload Images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'images' AND auth.uid() = owner);

-- 로그인한 사용자 본인만 자신의 이미지 수정 가능
CREATE POLICY "Auth Users Can Update Own Images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'images' AND auth.uid() = owner);

-- 로그인한 사용자 본인만 자신의 이미지 삭제 가능
CREATE POLICY "Auth Users Can Delete Own Images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'images' AND auth.uid() = owner);
