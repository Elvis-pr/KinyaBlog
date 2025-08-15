import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, deletePost } = useBlog();
  const { user } = useAuth();

  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="container">
        <div className="not-found">
          <h1>Post Not Found</h1>
          <p>The post you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');

  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
      navigate('/');
    }
  };

  return (
    <div className="container">
      <article className="blog-post">
        {/* Back Button */}
        <div className="post-navigation">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            <ArrowLeft size={18} />
            Back
          </button>
          {/* Only show edit/delete if user is the author */}
          {user && (user.uid === post.authorId) && (
            <div className="post-actions">
              <button onClick={handleEdit} className="btn btn-secondary">
                <Edit size={18} />
                Edit
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Post Header */}
        <header className="post-header">
          <div className="post-meta">
            <span className="post-category">
              <Tag size={16} />
              <Link to={`/category/${post.category.toLowerCase()}`}>
                {post.category}
              </Link>
            </span>
            <span className="post-read-time">
              <Clock size={16} />
              {post.readTime}
            </span>
          </div>

          <h1 className="post-title">{post.title}</h1>

          <div className="post-author-info">
            <div className="author-details">
              <User size={20} />
              <span className="author-name">{post.author}</span>
              <span className="post-date">
                <Calendar size={16} />
                {formattedDate}
              </span>
            </div>
          </div>

          {post.image && (
            <div className="post-featured-image">
              <img src={post.image} alt={post.title} />
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="post-content">
          <div className="post-excerpt">
            {post.excerpt}
          </div>
          
          <div className="post-body">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Post Tags */}
        <div className="post-tags">
          <h3>Tags</h3>
          <div className="tags-list">
            {post.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <div className="related-posts">
          <h3>Related Posts</h3>
          <div className="related-posts-grid">
            {posts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 3)
              .map(relatedPost => (
                <Link 
                  key={relatedPost.id} 
                  to={`/post/${relatedPost.id}`}
                  className="related-post-card"
                >
                  <div className="related-post-image">
                    <img src={relatedPost.image} alt={relatedPost.title} />
                  </div>
                  <div className="related-post-content">
                    <h4>{relatedPost.title}</h4>
                    <p>{relatedPost.excerpt}</p>
                    <span className="related-post-date">{relatedPost.readTime}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </article>

      <style jsx>{`
        .blog-post {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .post-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        
        .post-actions {
          display: flex;
          gap: 12px;
        }
        
        .post-header {
          margin-bottom: 40px;
        }
        
        .post-meta {
          display: flex;
          gap: 24px;
          margin-bottom: 20px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .post-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .post-category a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
        }
        
        .post-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          color: #1f2937;
          margin-bottom: 24px;
        }
        
        .post-author-info {
          margin-bottom: 32px;
        }
        
        .author-details {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
          color: #6b7280;
        }
        
        .author-name {
          font-weight: 600;
          color: #374151;
        }
        
        .post-date {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .post-featured-image {
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 40px;
        }
        
        .post-featured-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
        
        .post-content {
          margin-bottom: 48px;
        }
        
        .post-excerpt {
          font-size: 20px;
          font-weight: 500;
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 32px;
          padding: 24px;
          background: #f9fafb;
          border-left: 4px solid #2563eb;
          border-radius: 8px;
        }
        
        .post-body {
          font-size: 18px;
          line-height: 1.8;
          color: #374151;
        }
        
        .post-body p {
          margin-bottom: 24px;
        }
        
        .post-tags {
          margin-bottom: 48px;
          padding: 32px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .post-tags h3 {
          margin-bottom: 16px;
          color: #1f2937;
        }
        
        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .tag {
          background: #f1f5f9;
          color: #475569;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .related-posts {
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .related-posts h3 {
          margin-bottom: 24px;
          color: #1f2937;
        }
        
        .related-posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }
        
        .related-post-card {
          display: block;
          text-decoration: none;
          color: inherit;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s ease;
        }
        
        .related-post-card:hover {
          transform: translateY(-4px);
        }
        
        .related-post-image img {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
        
        .related-post-content {
          padding: 16px;
        }
        
        .related-post-content h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #1f2937;
        }
        
        .related-post-content p {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .related-post-date {
          font-size: 12px;
          color: #9ca3af;
        }
        
        .not-found {
          text-align: center;
          padding: 80px 20px;
        }
        
        .not-found h1 {
          font-size: 48px;
          margin-bottom: 16px;
          color: #1f2937;
        }
        
        .not-found p {
          font-size: 18px;
          color: #6b7280;
          margin-bottom: 32px;
        }
        
        @media (max-width: 768px) {
          .post-title {
            font-size: 32px;
          }
          
          .post-navigation {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
          
          .post-featured-image img {
            height: 250px;
          }
          
          .post-excerpt {
            font-size: 18px;
            padding: 20px;
          }
          
          .post-body {
            font-size: 16px;
          }
          
          .related-posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default BlogPost;
