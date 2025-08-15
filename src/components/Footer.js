import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>KinyaBlog</h3>
            <p>
              KinyaBlog - A modern, branded blog platform for sharing stories and connecting communities.
              ideas, and stories with the world.
            </p>
            <div className="social-links">
              <a href="https://github.com/kinya-blog" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
              </a>
              <a href="https://twitter.com/kinya_blog" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com/company/kinya-blog" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
              <a href="mailto:hello@kinya-blog.com" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create">Write a Post</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/search">Search</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Categories</h3>
            <ul className="footer-links">
              <li><Link to="/category/react">React</Link></li>
              <li><Link to="/category/javascript">JavaScript</Link></li>
              <li><Link to="/category/css">CSS</Link></li>
              <li><Link to="/category/tutorial">Tutorials</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>Have a question or suggestion?</p>
            <p>
              <a href="mailto:hello@kinya-blog.com">
                hello@kinya-blog.com
              </a>
            </p>
            <p>We'd love to hear from you!</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 KinyaBlog. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .social-links {
          display: flex;
          gap: 16px;
          margin-top: 16px;
        }
        
        .social-links a {
          color: #94a3b8;
          transition: color 0.2s ease;
        }
        
        .social-links a:hover {
          color: white;
        }
        
        .footer-links {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 8px;
        }
        
        .footer-links a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .footer-links a:hover {
          color: white;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
