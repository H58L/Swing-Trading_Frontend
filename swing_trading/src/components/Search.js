import React, { useState } from "react";
import { mockSearchResults } from "../constants/mock";
import { XIcon, SearchIcon } from "@heroicons/react/solid";
import SearchResults from "./SearchResults";
import "../style/Search.css";

const Search = () => {
  //intialize both these states to the mock data that was copypastes gfrom Finn hub
  const [input, setInput] = useState(""); //Will track what the use ris searching for
  const [bestMatches, setBestMatches] = useState(mockSearchResults.result);
  //Will track the best matches being returned form the API

  const clear = () => {
    //to clear the search bar
    setInput("");
    setBestMatches([]);
  };

  const updateBestMatches = () => {
    setBestMatches(mockSearchResults.result);
  };

  return (
    <div className="search-box flex items-center my-4 border-2 rounded-md relative z-50 w-96  border-neutral-200">
      <input
        type="text"
        value={input}
        className=" search-input w-full px-4 py-2 focus:outline-none rounded-md"
        placeholder="Search Stock"
        onChange={(event) => {
          //Setting input to what is searchd in the bar
          setInput(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            updateBestMatches();
          }
        }}
      ></input>

      {/* X icon */}
      {/* Button is not displayed until there is text in the search box */}
      {input && (
        <button onClick={clear} className="m-1">
          <XIcon className="h-4 w-4 fill-gray-509"></XIcon>
        </button>
      )}

      {/* Search Icon */}
      <button
        onClick={updateBestMatches}
        className="search-button h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2"
      >
        <SearchIcon className="search-icon h-20 w-20 fill-gray-100" />
      </button>

      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches}></SearchResults>
      ) : null}
    </div>
  );
};

export default Search;
