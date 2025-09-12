"use client";
import { Post } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
const router = useRouter();
  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((err) => console.log(err));
  }, []);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Posts</h1>
      <div className="max-w-2xl mx-auto grid gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg"
          >
            <button
              className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center"
              onClick={() => toggleAccordion(post.id)}
            >
              <span className="text-xl font-semibold text-blue-700">{post.title}</span>
              <span className={`ml-2 transition-transform ${openId === post.id ? "rotate-90" : "rotate-0"}`}>
                ▶
              </span>
            </button>
            {openId === post.id && (
              <div onClick={() => router.push(`/posts/${post.id}`)} className="px-6 pb-4">
                <p className="text-gray-700 mb-2">{post.body}</p>
                <div className="text-xs text-gray-400">Post ID: {post.id}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
