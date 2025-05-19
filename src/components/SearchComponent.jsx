import React, { useState } from 'react';
import './../assets/styles/searchComponent.css'; // Adjust the path as necessary

function SearchComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearchFocus = () => {
    setIsExpanded(true);
  };
  
  const handleSearchBlur = () => {
    if (!searchValue) {
      setIsExpanded(false);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
    // Add your search functionality here
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className={`search-form ${isExpanded ? 'expanded' : ''}`}>
        <label className="search-label">New Corner Enter PIN:</label>
        <div className="input-with-icon">
          <input 
            type="text" 
            placeholder="1234567" 
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            onChange={handleSearchChange}
            value={searchValue}
            className="search-input"
          />
          <button type="submit" className="search-icon-btn">
            <svg 
              className={`search-icon ${isExpanded ? 'active' : ''}`} 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchComponent;