import React from "react";

const SearchBar = ({ stockTicker, onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        value={stockTicker}
        onChange={handleChange}
        placeholder="Enter Stock Ticker"
        className="p-2 border rounded-md focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
};

export default SearchBar;
