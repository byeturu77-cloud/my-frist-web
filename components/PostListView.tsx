'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { Post } from '@/lib/posts';

export default function PostListView({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.preventDefault(); // Link 이벤트 전파 방지
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      setPosts(prevPosts => prevPosts.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
          검색 결과가 없습니다.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id} className="block group">
              <div className="relative h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md hover:border-blue-400 flex flex-col">
                <button 
                  onClick={(e) => handleDelete(e, post.id)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none"
                  title="삭제"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors pr-8">
                  {post.title}
                </h2>
                <div className="text-sm text-gray-500 mb-4 font-medium">
                  {post.date} · {post.author}
                </div>
                <p className="text-gray-600 line-clamp-3">
                  {post.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
