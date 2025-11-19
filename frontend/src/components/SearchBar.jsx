import React, { useState } from 'react';

function SearchBar({ onSearch, loading }) {
  const [keyword, setKeyword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Trim whitespace and check if keyword is not empty
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword) {
      onSearch(trimmedKeyword);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Enter keyword (e.g., bail, FIR, custody)"
          className="search-input"
          disabled={loading}
          aria-label="Search keyword"
        />
        <button
          type="submit"
          className="search-button"
          disabled={loading || !keyword.trim()}
          aria-label="Search cases"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {/* Example keywords for user guidance */}
      <div className="search-hints">
        <span className="hint-label">Try:</span>
        <button 
          className="hint-chip" 
          onClick={() => setKeyword('bail')}
          disabled={loading}
        >
          bail
        </button>
        <button 
          className="hint-chip" 
          onClick={() => setKeyword('FIR')}
          disabled={loading}
        >
          FIR
        </button>
        <button 
          className="hint-chip" 
          onClick={() => setKeyword('custody')}
          disabled={loading}
        >
          custody
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
