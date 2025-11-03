
import React from 'react';
import type { BlogPost } from '../types';

interface BlogPostProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
      <p className="text-sm text-gray-400 mb-2">{post.date}</p>
      <h3 className="text-2xl font-bold mb-3 text-purple-400">{post.title}</h3>
      <p className="text-gray-300 mb-4">{post.excerpt}</p>
      <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">Read More &rarr;</a>
    </div>
  );
};

export default BlogPostCard;
