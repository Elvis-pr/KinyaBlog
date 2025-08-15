import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag, ArrowLeft } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';

function Category() {
  const { category } = useParams();
  const { posts } = useBlog();
  
  // Filter posts by category (case insensitive)
  const categoryPosts = posts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );

  // Get the proper case category name from the first post
  const categoryName = categoryPosts.length > 0 
    ? categoryPosts[0].category 
    : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="container">
      <div className="category-page">
        {/* Header */}
        <div className="category-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <div className="category-title">
            <Tag size={32} />
            <h1>{categoryName}</h1>
          </div>
          
          <p className="category-description">
            {categoryPosts.length} post{categoryPosts.length !== 1 ? 's' : ''} in this category
          </p>
        </div>

        {/* Posts */}
        <div className="category-content">
          {categoryPosts.length > 0 ? (
            <div className="posts-grid">
              {categoryPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="no-posts">
              <Tag size={64} color="#d1d5db" />
              <h3>No posts in this category yet</h3>
              <p>
                Be the first to write about {categoryName}! Share your knowledge 
                and insights with the community.
              </p>
              <Link to="/create" className="btn btn-primary">
                Write First Post
              </Link>
            </div>
          )}
        </div>

        {/* Related Categories */}
        {categoryPosts.length > 0 && (
          <div className="related-categories">
            <h3>Explore Other Categories</h3>
            <div className="categories-grid">
              {Array.from(new Set(posts.map(post => post.category)))
                .filter(cat => cat.toLowerCase() !== category.toLowerCase())
                .slice(0, 6)
                .map(cat => {
                  const catPosts = posts.filter(post => post.category === cat);
                  return (
                    <Link 
                      key={cat} 
                      to={`/category/${cat.toLowerCase()}`}
                      className="category-card"
                    >
                      <div className="category-card-content">
                        <Tag size={24} />
                        <h4>{cat}</h4>
                        <p>{catPosts.length} post{catPosts.length !== 1 ? 's' : ''}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .category-page {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .category-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          text-decoration: none;
          font-weight: 500;
          margin-bottom: 32px;
          transition: color 0.2s ease;
        }
        
        .back-link:hover {
          color: #2563eb;
        }
        
        .category-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .category-title h1 {
          font-size: 48px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }
        
        .category-description {
          font-size: 20px;
          color: #6b7280;
          margin: 0;
        }
        
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 32px;
          margin-bottom: 80px;
        }
        
        .no-posts {
          text-align: center;
          padding: 80px 20px;
          color: #6b7280;
        }
        
        .no-posts h3 {
          font-size: 24px;
          font-weight: 600;
          margin: 24px 0 16px 0;
          color: #374151;
        }
        
        .no-posts p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .related-categories {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .related-categories h3 {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 24px;
          text-align: center;
        }
        
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .category-card {
          display: block;
          text-decoration: none;
          color: inherit;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          transition: all 0.2s ease;
        }
        
        .category-card:hover {
          background: #2563eb;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        
        .category-card-content h4 {
          font-size: 18px;
          font-weight: 600;
          margin: 12px 0 8px 0;
        }
        
        .category-card-content p {
          font-size: 14px;
          opacity: 0.8;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .category-title {
            flex-direction: column;
            gap: 12px;
          }
          
          .category-title h1 {
            font-size: 36px;
          }
          
          .posts-grid {
            grid-template-columns: 1fr;
          }
          
          .related-categories {
            padding: 24px;
          }
          
          .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

export default Category;
