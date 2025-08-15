import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, PenTool, Home, Info, Menu, X, Feather } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSearchQuery } = useBlog();
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      navigate('/search');
      setSearchInput('');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon"><Feather size={28} color="#6366f1" /></span>
            <span className="logo-text">Kinya<span className="logo-bold">Blog</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <Home size={18} />
              Home
            </Link>
            <Link 
              to="/create" 
              className={`nav-link ${isActive('/create') ? 'active' : ''}`}
            >
              <PenTool size={18} />
              Write
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              <Info size={18} />
              About
            </Link>
          </nav>


          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-bar">
            <Search size={18} color="#6b7280" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
          </form>

          {/* Logout Button (show if logged in) */}
          {user && (
            <button
              className="logout-btn"
              onClick={logout}
              title="Log out"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span className="logout-text">Logout</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home size={18} />
              Home
            </Link>
            <Link 
              to="/create" 
              className={`nav-link ${isActive('/create') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <PenTool size={18} />
              Write
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info size={18} />
              About
            </Link>
          </nav>
        )}
      </div>

      <style jsx>{`
        .logo {
          display: flex;
          align-items: center;
          font-size: 1.7rem;
          font-weight: 700;
          color: #2d3748;
          text-decoration: none;
          letter-spacing: 0.5px;
          margin-right: 32px;
        }
        .logo-icon {
          margin-right: 8px;
          display: flex;
          align-items: center;
        }
        .logo-text {
          color: #6366f1;
          font-weight: 700;
        }
        .logo-bold {
          color: #764ba2;
          font-weight: 900;
        }
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 18px;
          padding: 8px 20px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(80, 80, 180, 0.08);
          transition: background 0.2s;
        }
        .logout-btn:hover {
          background: linear-gradient(90deg, #5a67d8 0%, #6c3483 100%);
        }
        .logout-text {
          margin-left: 4px;
        }
        .desktop-nav {
          display: flex;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #475569;
        }
        .mobile-nav {
          display: none;
          flex-direction: column;
          gap: 16px;
          padding: 20px 0;
          border-top: 1px solid #e2e8f0;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: block;
          }
          .mobile-nav {
            display: flex;
          }
          .search-bar {
            min-width: 200px;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
