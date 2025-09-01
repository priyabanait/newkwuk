'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import Box from '@/components/box';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function Page(){
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs');
        const data = await res.json();
        setBlogs(data);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMore = (post) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedBlog', JSON.stringify(post));
      router.push(`/ourCulture/event/${post._id}`);
    }
  };

  return (
    <div>
      <Header />
      
      <Box
       
          h3="Events"
          src="/buildexperties.jpg"
        />
      {/* Filter Bar */}
      <div className="flex justify-between items-center my-10 px-6 md:px-20">
        <h1 className="text-sm text-gray-500">All Posts</h1>
        <button className="text-gray-500 hover:text-black">
          <FiSearch className="w-4 h-4" />
        </button>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4 md:px-40">

        {blogs.map((post, index) => (
          <div key={index} className="w-60 h-[22rem]">
            <div className="w-full h-60 bg-gray-200">
              <Image
                src={post.coverImage || '/event.png'}
                alt={post.title}
                width={240}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4">
              <p className="text-xl mb-2 font-semibold">{post.title}</p>
              <p className="text-black text-sm line-clamp-3">{post.content}</p>
              <button
                onClick={() => handleReadMore(post)}
                className="mt-2 inline-block px-4 py-1 bg-[rgb(206,32,39,255)] text-black rounded transition-colors text-sm"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

