-- ============================================
-- comments 테이블
-- ============================================
CREATE TABLE comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능
CREATE POLICY "Enable read access for all users on comments"
ON comments FOR SELECT USING (true);

-- 로그인한 본인만 작성 가능
CREATE POLICY "Enable insert for authenticated users on comments"
ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 본인만 삭제 가능
CREATE POLICY "Enable delete for own comments"
ON comments FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- post_likes 테이블 (유저당 게시글 1회 좋아요)
-- ============================================
CREATE TABLE post_likes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- 누구나 좋아요 수 조회 가능
CREATE POLICY "Enable read access for all users on post_likes"
ON post_likes FOR SELECT USING (true);

-- 로그인한 본인만 좋아요 가능
CREATE POLICY "Enable insert for authenticated users on post_likes"
ON post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 본인만 좋아요 취소 가능
CREATE POLICY "Enable delete for own likes"
ON post_likes FOR DELETE USING (auth.uid() = user_id);
