import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Filter } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

function Home() {
  const { posts, categories, selectedCategory, setSelectedCategory } = useBlog();
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState('date');

  // Filter posts by category
  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    return a.title.localeCompare(b.title);
  });

  // Get featured post (most recent)
  const featuredPost = posts[0];

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>KinyaBlog: Welcome to KinyaBlog</h1>
          <p>
            KinyaBlog is a modern blog platform for sharing stories, tutorials, and insights. Connect with a diverse community, publish your ideas, and discover new perspectives. Whether you're a writer or a reader, KinyaBlog is open to everyone.
          </p>
          {user ? (
            <Link to="/create" className="btn btn-primary">
              Start Writing
            </Link>
          ) : (
            <Link to="/register" className="btn btn-primary">
              Start Writing
            </Link>
          )}
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="featured-section">
          <div className="section-header">
            <h2>
              <TrendingUp size={24} />
              Featured Post
            </h2>
          </div>
          <div className="featured-post card">
            <div className="featured-image">
              <img src={featuredPost.image} alt={featuredPost.title} />
            </div>
            <div className="featured-content">
              <span className="featured-category">{featuredPost.category}</span>
              <h3>
                <Link to={`/post/${featuredPost.id}`}>
                  {featuredPost.title}
                </Link>
              </h3>
              <p>{featuredPost.excerpt}</p>
              <div className="featured-meta">
                <span>By {featuredPost.author}</span>
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters and Sort */}
      <section className="posts-section">
        <div className="section-header">
          <h2>Latest Posts</h2>
          <div className="filters">
            <div className="filter-group">
              <Filter size={18} />
              <select 
                value={selectedCategory || ''} 
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="form-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="posts-grid">
          {sortedPosts.length > 0 ? (
            sortedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="no-posts">
              <p>No posts found.</p>
              <Link to="/create" className="btn btn-primary">
                Write the first post
              </Link>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .hero {
          text-align: center;
          padding: 80px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 16px;
          margin-bottom: 60px;
        }
        
        .hero h1 {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 20px;
        }
        
        .hero p {
          font-size: 20px;
          margin-bottom: 32px;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        
        .section-header h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 32px;
          font-weight: 600;
          color: #1f2937;
        }
        
        .featured-section {
          margin-bottom: 60px;
        }
        
        .featured-post {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          overflow: hidden;
        }
        
        .featured-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }
        
        .featured-content {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .featured-category {
          color: #2563eb;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }
        
        .featured-content h3 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        
        .featured-content h3 a {
          color: #1f2937;
          text-decoration: none;
        }
        
        .featured-content p {
          color: #6b7280;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        .featured-meta {
          display: flex;
          gap: 16px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .filters {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        
        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 32px;
        }
        
        .no-posts {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }
        
        @media (max-width: 768px) {
          .hero {
            padding: 60px 20px;
          }
          
          .hero h1 {
            font-size: 36px;
          }
          
          .hero p {
            font-size: 18px;
          }
          
          .featured-post {
            grid-template-columns: 1fr;
          }
          
          .featured-content {
            padding: 24px;
          }
          
          .section-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
          
          .filters {
            width: 100%;
            justify-content: space-between;
          }
          
          .posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
