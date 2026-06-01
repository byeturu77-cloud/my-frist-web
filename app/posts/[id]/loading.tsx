export default function PostDetailLoading() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-8">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-8">
        <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4" />
        <div className="flex items-center gap-4">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </header>
      <main className="space-y-4 min-h-[30vh]">
        <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
      </main>
    </article>
  );
}
