import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Function to fetch package suggestions from npm API
  const fetchSuggestions = async (searchTerm) => {
    try {
      const response = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${searchTerm}&size=5`);
      setSuggestions(response.data.objects);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Handle input change to update suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  // Handle package selection and navigation to the detail page
  const handleSuggestionClick = (packageName) => {
    navigate(`/package/${packageName}`);
  };

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/package/${query}`);
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for packages"
          className="search-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item) => (
            <li key={item.package.name} onClick={() => handleSuggestionClick(item.package.name)}>
              {item.package.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
