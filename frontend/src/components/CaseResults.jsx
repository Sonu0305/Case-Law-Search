import React from 'react';
import LoadingSpinner from './LoadingSpinner';

function CaseResults({ cases, loading, searchPerformed }) {
  
  // Show loading spinner while fetching
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show nothing if search hasn't been performed yet
  if (!searchPerformed) {
    return (
      <div className="welcome-message">
        <p> Enter a keyword to search for relevant case laws</p>
      </div>
    );
  }

  // Show no results message if search returned empty
  if (cases.length === 0) {
    return (
      <div className="no-results">
        <p>📭 No cases found matching your search</p>
        <p className="no-results-hint">Try different keywords like "bail", "FIR", or "custody"</p>
      </div>
    );
  }

  // Display results
  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Search Results</h2>
        <span className="results-count">{cases.length} case{cases.length !== 1 ? 's' : ''} found</span>
      </div>
      
      <div className="cases-list">
        {cases.map((caseItem) => (
          <div key={caseItem.id} className="case-card">
            <div className="case-header">
              <h3 className="case-name">{caseItem.case_name}</h3>
              <span className="case-citation">{caseItem.citation}</span>
            </div>
            <p className="case-summary">{caseItem.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CaseResults;
