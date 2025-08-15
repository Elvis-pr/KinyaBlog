import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';

function Search() {
  const { posts, categories, searchQuery, setSearchQuery } = useBlog();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    performSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, sortBy, posts]);

  const performSearch = () => {
    let results = [...posts];

    // Filter by search query
    if (searchQuery) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      results = results.filter(post => post.category === selectedCategory);
    }

    // Sort results
    results.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        // Relevance sorting (basic implementation)
        if (!searchQuery) return new Date(b.date) - new Date(a.date);
        
        const aScore = calculateRelevanceScore(a, searchQuery);
        const bScore = calculateRelevanceScore(b, searchQuery);
        return bScore - aScore;
      }
    });

    setSearchResults(results);
  };

  const calculateRelevanceScore = (post, query) => {
    const queryLower = query.toLowerCase();
    let score = 0;

    // Title matches are most important
    if (post.title.toLowerCase().includes(queryLower)) {
      score += 10;
    }

    // Excerpt matches
    if (post.excerpt.toLowerCase().includes(queryLower)) {
      score += 5;
    }

    // Content matches
    if (post.content.toLowerCase().includes(queryLower)) {
      score += 3;
    }

    // Tag matches
    post.tags.forEach(tag => {
      if (tag.toLowerCase().includes(queryLower)) {
        score += 7;
      }
    });

    // Author matches
    if (post.author.toLowerCase().includes(queryLower)) {
      score += 2;
    }

    return score;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery.trim());
  };

  const clearSearch = () => {
    setLocalSearchQuery('');
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <div className="container">
      <div className="search-page">
        <div className="search-header">
          <h1>Search Posts</h1>
          <p>Find articles, tutorials, and insights</p>
        </div>

        {/* Search Form */}
        <div className="search-form-container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <SearchIcon size={20} />
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Search for posts, tags, authors..."
                className="search-input"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>

          {/* Filters */}
          <div className="search-filters">
            <div className="filter-group">
              <Filter size={18} />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
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
              <option value="relevance">Sort by Relevance</option>
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>

            {(searchQuery || selectedCategory) && (
              <button onClick={clearSearch} className="btn btn-secondary">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="search-results">
          {searchQuery && (
            <div className="search-info">
              <h2>
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} 
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory && ` in ${selectedCategory}`}
              </h2>
            </div>
          )}

          {searchResults.length > 0 ? (
            <div className="results-grid">
              {searchResults.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : searchQuery ? (
            <div className="no-results">
              <SearchIcon size={48} color="#9ca3af" />
              <h3>No posts found</h3>
              <p>
                Try adjusting your search terms or filters. You can search by title, 
                content, tags, or author name.
              </p>
              <button onClick={clearSearch} className="btn btn-primary">
                Clear Search
              </button>
            </div>
          ) : (
            <div className="search-placeholder">
              <SearchIcon size={64} color="#d1d5db" />
              <h3>Start searching</h3>
              <p>
                Enter keywords above to find posts that match your interests.
                You can search by title, content, tags, or author.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .search-page {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .search-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .search-header h1 {
          font-size: 48px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 12px;
        }
        
        .search-header p {
          font-size: 20px;
          color: #6b7280;
        }
        
        .search-form-container {
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
        }
        
        .search-form {
          margin-bottom: 24px;
        }
        
        .search-input-group {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: #f9fafb;
        }
        
        .search-input {
          flex: 1;
          border: none;
          background: none;
          outline: none;
          font-size: 16px;
          color: #374151;
        }
        
        .search-input::placeholder {
          color: #9ca3af;
        }
        
        .search-filters {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .search-info {
          margin-bottom: 32px;
        }
        
        .search-info h2 {
          font-size: 24px;
          font-weight: 600;
          color: #374151;
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 32px;
        }
        
        .no-results,
        .search-placeholder {
          text-align: center;
          padding: 80px 20px;
          color: #6b7280;
        }
        
        .no-results h3,
        .search-placeholder h3 {
          font-size: 24px;
          font-weight: 600;
          margin: 24px 0 16px 0;
          color: #374151;
        }
        
        .no-results p,
        .search-placeholder p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        @media (max-width: 768px) {
          .search-header h1 {
            font-size: 36px;
          }
          
          .search-form-container {
            padding: 24px;
          }
          
          .search-input-group {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-filters {
            flex-direction: column;
            align-items: stretch;
          }
          
          .results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Search;
