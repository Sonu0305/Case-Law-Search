import React from 'react';

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Searching case laws...</p>
    </div>
  );
}

export default LoadingSpinner;
