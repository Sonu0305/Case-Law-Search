import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CaseResults from './components/CaseResults';
import './App.css';

function App() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Handle search functionality
  const handleSearch = async (keyword) => {
    // Reset previous state
    setLoading(true);
    setError(null);
    setCases([]);
    setSearchPerformed(true);

    try {
      // Call backend API
      const response = await fetch(
        `http://localhost:8000/api/search?keyword=${encodeURIComponent(keyword)}`
      );

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch cases');
      }

      // Parse JSON response
      const data = await response.json();

      // Update state with results
      setCases(data.results || []);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Unable to connect to the server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>⚖️ Case Law Search</h1>
        <p className="subtitle">Search through Indian case laws by keyword</p>
      </header>

      <main className="App-main">
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        <CaseResults 
          cases={cases} 
          loading={loading} 
          searchPerformed={searchPerformed}
        />
      </main>

      <footer className="App-footer">
        <p>© 2025 Case Law Search | Mock Data for Demonstration</p>
      </footer>
    </div>
  );
}

export default App;
