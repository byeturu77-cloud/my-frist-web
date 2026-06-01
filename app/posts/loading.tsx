export default function PostsLoading() {
  return (
    <div className="py-8 max-w-6xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="h-9 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        <div className="h-11 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-3"
          >
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
            <div className="flex gap-3 pt-2">
              <div className="h-3 w-20 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-3 w-24 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
