"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from '@/components/header';
import Image from 'next/image';
import Link from 'next/link';

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id;
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedBlog');
      if (stored) {
        const blogData = JSON.parse(stored);
        if (blogData && blogData._id === id) {
          setBlog(blogData);
        }
      }
    }
  }, [id]);

  if (!blog) return <div className="p-8 text-center">No blog found.</div>;

  return (
    <div>
      <Header />
      <div className="max-w-full md:mx-20 p-4 md:mt-30">
        <Link href="/ourCulture/event" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Events</Link>
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="w-full h-96 relative mb-6">
          <Image
            src={blog.coverImage || "/event.png"}
            alt={blog.title}
            fill
            className="object-cover rounded-lg w-full h-96 "
          />
        </div>
        <div className="prose max-w-none text-lg text-gray-800">
          {blog.content ? (
            blog.content.includes('<') ? (
              <span dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              blog.content
            )
          ) : (
            <span>No content available.</span>
          )}
        </div>
      </div>
    </div>
  );
} 