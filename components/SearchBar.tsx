'use client';

import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <div className="mb-6 relative max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="제목 또는 내용으로 검색..."
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-indigo-400/20 sm:text-sm transition-all shadow-sm"
      />
    </div>
  );
}
