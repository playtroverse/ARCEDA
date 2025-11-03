
import React from 'react';
import type { BlogPost } from '../types';
import BlogPostCard from './BlogPost';

interface BlogSectionProps {
  posts: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const publishedPosts = posts.filter(p => p.isPublished);

  return (
    <section id="blog" className="py-20 md:py-32 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Latest News
          </span>
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {publishedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
