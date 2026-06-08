'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { Post } from '@/lib/posts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PostListView({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      
      {posts.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/20 dark:border-gray-800">
          등록된 게시글이 없습니다. 첫 글을 작성해 보세요!
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/20 dark:border-gray-800">
          검색 결과가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id} className="block group h-full focus:outline-none">
              <Card className="h-full relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-400 dark:hover:border-indigo-500 flex flex-col overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/40 dark:border-gray-700/50 rounded-2xl">
                {post.image_url && (
                  <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                    <img src={post.image_url} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                
                <CardHeader className={`pb-3 pr-4 ${post.image_url ? 'pt-5' : 'pt-6'}`}>
                  <CardTitle className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium mt-1.5 text-gray-500 dark:text-gray-400">
                    {post.date} · {post.author}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 pb-6">
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed text-sm">
                    {post.content}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
