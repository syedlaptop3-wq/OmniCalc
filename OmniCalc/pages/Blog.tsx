import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { SEO } from '../components/SEO';
import { Calendar, User, Tag } from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const BlogIndex = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <SEO title="Blog" description="Read our latest articles on math, finance, and health." />
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">OmniCalc Blog</h1>
        <p className="text-gray-500">Tips, tricks, and guides for everyday calculations.</p>
      </div>
      
      <div className="grid gap-8">
        {blogPosts.map(post => (
          <article key={post.id} className="bg-white dark:bg-dark-lighter p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-dark rounded-full"><Tag className="w-3 h-3" /> {post.category}</span>
            </div>
            <Link to={`/blog/${post.id}`} className="block">
              <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="text-primary font-medium hover:underline">Read more →</Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) return <div className="text-center py-20">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <SEO 
        title={post.title} 
        description={post.excerpt}
        schemaType="Article"
      />
      
      <article className="bg-white dark:bg-dark-lighter p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800">
        <header className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
             <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
             <span className="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1 rounded-full font-medium">{post.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">{post.title}</h1>
        </header>

        <AdPlaceholder id="ad-content-top" />

        <div className="prose dark:prose-invert prose-lg max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>{post.content}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>

        <AdPlaceholder id="ad-content-bottom" />
      </article>

      <div className="mt-8 text-center">
        <Link to="/blog" className="text-primary hover:underline font-medium">← Back to Blog</Link>
      </div>
    </div>
  );
};