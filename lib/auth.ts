import { createClient } from './supabase/client';

/**
 * 이메일과 비밀번호를 사용하여 로그인합니다.
 */
export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();
  
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

/**
 * 이메일, 비밀번호, 이름을 사용하여 회원가입합니다.
 */
export async function signUpWithEmail(email: string, password: string, name: string) {
  const supabase = createClient();
  
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });
}

/**
 * 현재 로그인된 사용자를 로그아웃합니다.
 */
export async function signOut() {
  const supabase = createClient();
  
  return await supabase.auth.signOut();
}
