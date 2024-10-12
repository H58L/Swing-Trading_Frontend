import React, { useContext } from "react";
import "../style/SearchResults.css";
import ThemeContext from "../context/ThemeContex";

const SearchResults = ({ results }) => {
  const {darkMode} = useContext(ThemeContext); 
  return (
    <ul className={`search-results-dropdown absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll
     bg-white border-neutral-200 custom-scrollbar
     ${darkMode ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scroll-bar-dark" : null}`}>
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className={`search-item cursor-pointer p-4 m-2 felx items-center jusify-between rounded-md hover:bg-indigo-200 
            ${darkMode ? "hover: bg-indigo-600" : null}`}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
