'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

export default function NewPostPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 미로그인 사용자 리다이렉트 (미들웨어가 보호하지만 클라이언트 측 보완 가드 제공)
  useEffect(() => {
    if (!loading && !user) {
      alert('로그인이 필요한 페이지입니다.');
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTitleError('');
    setContentError('');
    setSubmitError('');

    let isValid = true;

    if (title.trim().length < 2) {
      setTitleError('제목을 2자 이상 입력해주세요.');
      isValid = false;
    }
    
    if (content.trim().length < 10) {
      setContentError('내용을 10자 이상 입력해주세요.');
      isValid = false;
    }

    if (!isValid) return;

    if (!user) {
      alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const { data, error } = await supabase
        .from('posts')
        .insert({
          title,
          content,
          image_url: imageUrl,
          user_id: user.id
        })
        .select('id')
        .single();

      if (error) throw error;

      alert('성공적으로 저장되었습니다!');
      
      if (data?.id) {
        router.push(`/posts/${data.id}`);
      } else {
        router.push('/posts');
      }
    } catch (err: any) {
      console.error("게시글 저장 오류:", err);
      setSubmitError('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center text-gray-500 font-medium">
        인증 상태를 확인하고 있습니다...
      </div>
    );
  }

  if (!user) {
    return null; // 리다이렉트 처리 중이므로 깜빡임 방지용 빈 화면 반환
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">
      <header>
        <Link href="/posts" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          &larr; 목록으로 이동
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-4 tracking-tight">
          새 글 작성
        </h1>
        <p className="text-gray-500 mt-2">
          새로운 블로그 게시글을 작성해보세요.
        </p>
      </header>

      <form 
        onSubmit={handleSubmit} 
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 sm:p-10 flex flex-col gap-6 transition-all"
      >
        {submitError && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
            ⚠️ {submitError}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-semibold text-gray-800">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim().length >= 2 && titleError) {
                setTitleError('');
              }
            }}
            placeholder="게시글의 제목을 입력하세요"
            disabled={isSubmitting}
            className={`w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
              titleError 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
          />
          {titleError && (
            <p className="text-sm text-red-500 font-medium animate-pulse">
              ⚠️ {titleError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            커버 이미지 (선택)
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              } else {
                setImageFile(null);
                setImagePreview(null);
              }
            }}
            disabled={isSubmitting}
            className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900/30 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800/50 transition-colors cursor-pointer"
          />
          {imagePreview && (
            <div className="mt-3 relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-64 w-full bg-gray-50 dark:bg-gray-800">
              <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="text-sm font-semibold text-gray-800">
            내용
          </label>
          <textarea
            id="content"
            name="content"
            rows={12}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (e.target.value.trim().length >= 10 && contentError) {
                setContentError('');
              }
            }}
            placeholder="게시글 내용을 작성하세요..."
            disabled={isSubmitting}
            className={`w-full resize-y rounded-lg border px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base leading-relaxed ${
              contentError 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
            }`}
          />
          {contentError && (
            <p className="text-sm text-red-500 font-medium animate-pulse">
              ⚠️ {contentError}
            </p>
          )}
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
