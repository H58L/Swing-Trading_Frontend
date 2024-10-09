import React from "react";
import "../style/SearchResults.css";

const SearchResults = ({ results }) => {
  return (
    <ul className="search-results-dropdown absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white border-neutral-200 custom-scrollbar">
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className="search-item cursor-pointer p-4 m-2 felx items-center jusify-between rounded-md hover:bg-indigo-200 "
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
