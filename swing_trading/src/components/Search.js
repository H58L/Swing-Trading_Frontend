import React, { useContext, useState } from "react";
import { mockSearchResults } from "../constants/mock";
import { XIcon, SearchIcon } from "@heroicons/react/solid";
import SearchResults from "./SearchResults";
import "../style/Search.css";
import ThemeContext from "../context/ThemeContext";
import axios from "axios";
import StockContext from "../context/StockContext";

const Search = () => {
  //intialize both these states to the mock data that was copypastes gfrom Finn hub
  const [input, setInput] = useState(""); //Will track what the use ris searching for
  const [bestMatches, setBestMatches] = useState(mockSearchResults.result); //Update to get data from flask
  //Will track the best matches being returned form the API
  const [error, setError] = useState("");

  const { darkMode } = useContext(ThemeContext);
  const { setStockSymbol } = useContext(StockContext); // Get Setter for stock symol
  const clear = () => {
    //to clear the search bar
    setInput("");
    setBestMatches([]);
  };

  const updateBestMatches = async () => {
    if (!input) return;

    try {
      //Calling flask API
      const response = await axios.get(`http://localhost:5000/api/stock`, {
        params: { ticker: input },
      });

      setBestMatches(response.data);
      setError("");
    } catch (err) {
      setError("Stock not found. Please try again.");
      setBestMatches([]);
    }
  };

  return (
    <div
      className={`search-box flex items-center my-4 border-2 rounded-md relative z-50 w-96  border-neutral-200
    ${darkMode ? "bg-gray-900 border-gray-800" : null}`}
    >
      <input
        type="text"
        value={input}
        className={`search-input w-full px-4 py-2 focus:outline-none rounded-md
        ${darkMode ? "bg-gray-900" : null}`}
        placeholder="Search Stock"
        onChange={(event) => {
          //Setting input to what is searchd in the bar
          setInput(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            setStockSymbol(input);
            console.log(setStockSymbol);
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

      {/* {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches}></SearchResults>
      ) : null}
    </div>
  );
}; */}

      {/* Display search results */}
      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches}></SearchResults>
      ) : error ? (
        <p>{error}</p> // Display error message if any
      ) : null}
    </div>
  );
};

export default Search;
