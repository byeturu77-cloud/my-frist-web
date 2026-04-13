export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  
  return data.map((item: { id: number; title: string; body: string; userId: number }) => ({
    id: item.id,
    title: item.title,
    content: item.body,
    author: `User ${item.userId}`, // 더미 작성자
    date: new Date().toISOString().split('T')[0], // 더미 날짜 (오늘)
  }));
}

export async function fetchPost(id: number | string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch post');
  }
  const item = await res.json();
  return {
    id: item.id,
    title: item.title,
    content: item.body,
    author: `User ${item.userId}`,
    date: new Date().toISOString().split('T')[0],
  };
}
