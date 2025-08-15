import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { format } from 'date-fns';

function PostCard({ post, showActions = false, onEdit, onDelete }) {
  const formattedDate = format(new Date(post.date), 'MMM dd, yyyy');

  return (
    <article className="post-card card">
      {post.image && (
        <div className="post-image">
          <img src={post.image} alt={post.title} />
        </div>
      )}
      
      <div className="post-content">
        <div className="post-meta">
          <span className="post-category">
            <Tag size={14} />
            <Link to={`/category/${post.category.toLowerCase()}`}>
              {post.category}
            </Link>
          </span>
          <span className="post-read-time">
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        <h2 className="post-title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h2>

        <p className="post-excerpt">{post.excerpt}</p>

        <div className="post-tags">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="tag-more">+{post.tags.length - 3} more</span>
          )}
        </div>

        <div className="post-footer">
          <div className="post-author">
            <User size={16} />
            <span>{post.author}</span>
            <span className="post-date">
              <Calendar size={14} />
              {formattedDate}
            </span>
          </div>

          {showActions && (
            <div className="post-actions">
              <button 
                onClick={() => onEdit(post.id)}
                className="btn btn-secondary btn-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(post.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .post-card {
          margin-bottom: 32px;
          overflow: hidden;
        }
        
        .post-image {
          height: 200px;
          overflow: hidden;
        }
        
        .post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .post-card:hover .post-image img {
          transform: scale(1.05);
        }
        
        .post-content {
          padding: 24px;
        }
        
        .post-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .post-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .post-category a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }
        
        .post-title {
          margin-bottom: 12px;
          font-size: 24px;
          font-weight: 600;
          line-height: 1.3;
        }
        
        .post-title a {
          color: #1f2937;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .post-title a:hover {
          color: #2563eb;
        }
        
        .post-excerpt {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        
        .post-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        
        .tag {
          background: #f1f5f9;
          color: #475569;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .tag-more {
          color: #6b7280;
          font-size: 12px;
          font-style: italic;
        }
        
        .post-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }
        
        .post-author {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .post-date {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: 16px;
        }
        
        .post-actions {
          display: flex;
          gap: 8px;
        }
        
        .btn-sm {
          padding: 6px 12px;
          font-size: 12px;
        }
        
        @media (max-width: 768px) {
          .post-content {
            padding: 20px;
          }
          
          .post-title {
            font-size: 20px;
          }
          
          .post-footer {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }
      `}</style>
    </article>
  );
}

export default PostCard;
