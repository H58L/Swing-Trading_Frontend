
import React, { useContext, useState } from "react";
 import ThemeContext from "../context/ThemeContext";
 // Update this with your ThemeContext path


const StockWatchlistSearch = ({ onSearch }) => {
  const [query, setQuery] = useState(""); //query is the stock tcker that is to be set
  const { darkMode } = useContext(ThemeContext); // Access darkMode from ThemeContext

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      console.log(query);
      //add API call to backend here
    }
  };

  return (
    <div
    >
      <div style={{ display: "flex", margin: "20px" }}>   
        <input
  type="text"
  value={query}
  onChange={handleInputChange}
  onKeyPress={handleKeyPress}
  placeholder="Enter ticker to add to watchlist"
  style={{
    padding: "10px",
    width: "300px",
    border: "1px solid", // Ensures a uniform border
    borderColor: darkMode ? "#4338CA" : "#ccc", // Border color changes based on the theme
    borderRadius: "4px",
    outline: darkMode ? "2px solid #4338CA" : "2px solid black", // Outline reflects the mode
    backgroundColor: darkMode ? "#111827" : "#fff", // Background color based on mode
    color: darkMode ? "#fff" : "#000", // Text color based on mode
  }}
/>
      </div>
    </div>
  );
};

export default StockWatchlistSearch;
