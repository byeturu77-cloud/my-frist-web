import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing supabase keys in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupTestUser() {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;
  
  if (!email || !password) {
    console.error("Missing TEST_EMAIL or TEST_PASSWORD in .env.local");
    process.exit(1);
  }

  // 먼저 로그인 시도 (계정이 이미 존재할 수 있음)
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInData?.user) {
    console.log("Test user already exists and can log in.");
    return;
  }

  // 로그인 실패 시 회원가입 시도
  console.log("Creating test user...");
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: 'Test User'
      }
    }
  });

  if (signUpError) {
    console.error("Failed to create test user:", signUpError.message);
    process.exit(1);
  }

  console.log("Test user created successfully!");
}

setupTestUser();
