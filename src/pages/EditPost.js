import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost, categories } = useBlog();
  const { user } = useAuth();
  
  const post = posts.find(p => p.id === parseInt(id));
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    image: '',
    readTime: '5 min read'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags.join(', '),
        image: post.image || '',
        readTime: post.readTime
      });
    }
  }, [post]);

  if (!post) {
    return (
      <div className="container">
        <div className="not-found">
          <h1>Post Not Found</h1>
          <p>The post you're trying to edit doesn't exist.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.tags.trim()) {
      newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const updatedPost = {
        ...post,
        ...formData,
        tags: tagsArray,
        id: post.id, // Ensure ID is preserved
        author: user && (user.displayName || user.email || 'Anonymous'), // Always set author from logged-in user
        authorId: user && user.uid // Always set authorId from logged-in user
      };

      updatePost(updatedPost);
      navigate(`/post/${post.id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="edit-post-header">
        <h1>Edit Post</h1>
        <button 
          onClick={() => navigate(`/post/${post.id}`)}
          className="btn btn-secondary"
        >
          <X size={18} />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter your post title..."
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-select ${errors.category ? 'error' : ''}`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="excerpt" className="form-label">
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className={`form-textarea ${errors.excerpt ? 'error' : ''}`}
            placeholder="Write a brief description of your post..."
            rows="3"
          />
          {errors.excerpt && <span className="error-text">{errors.excerpt}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={`form-textarea ${errors.content ? 'error' : ''}`}
            placeholder="Write your post content here..."
            rows="15"
          />
          {errors.content && <span className="error-text">{errors.content}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tags" className="form-label">
              Tags *
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={`form-input ${errors.tags ? 'error' : ''}`}
              placeholder="Enter tags separated by commas..."
            />
            {errors.tags && <span className="error-text">{errors.tags}</span>}
            <small className="form-help">Separate tags with commas</small>
          </div>

          <div className="form-group">
            <label htmlFor="readTime" className="form-label">
              Read Time
            </label>
            <input
              type="text"
              id="readTime"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 5 min read"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Featured Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="form-input"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            <Save size={18} />
            {isSubmitting ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .edit-post-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        
        .edit-post-header h1 {
          font-size: 32px;
          font-weight: 600;
          color: #1f2937;
        }
        
        .edit-post-form {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .form-input.error,
        .form-textarea.error,
        .form-select.error {
          border-color: #dc2626;
        }
        
        .error-text {
          color: #dc2626;
          font-size: 14px;
          margin-top: 4px;
          display: block;
        }
        
        .form-help {
          color: #6b7280;
          font-size: 13px;
          margin-top: 4px;
          display: block;
        }
        
        .form-actions {
          margin-top: 32px;
          text-align: center;
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
          .edit-post-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
          
          .edit-post-form {
            padding: 24px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default EditPost;
