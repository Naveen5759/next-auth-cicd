// app/blog/[[...id]]/page.tsx

interface Post {
  id: number;
  title: string;
  body: string;
}

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();

  return data.posts.map((post: Post) => ({
    id: post.id.toString(),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { id?: string[] }; // Optional because it's a catch-all route
}) {
  const id = params.id?.[0] ?? "1"; // Default to 1 if no id is provided
  const res = await fetch(`https://dummyjson.com/posts/${id}`,{
    next: { revalidate: 10 }, // <-- This enables ISR
  });
  
  if (!res.ok) {
    return <div>Error loading post.</div>;
  }
  
  const post: Post = await res.json();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
