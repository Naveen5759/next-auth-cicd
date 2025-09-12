"use client"
import { Post } from '@/types';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'




export default function Page() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
    if (!postId) return;
    fetch(`https://dummyjson.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [postId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="w-full max-w-xl">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : post ? (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">{post.title}</h1>
            <p className="text-gray-700 mb-6">{post.body}</p>
            <div className="text-xs text-gray-400">Post ID: {post.id}</div>
          </div>
        ) : (
          <div className="text-center text-red-500">Post not found.</div>
        )}
      </div>
    </div>
  );
}