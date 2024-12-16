import React, { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { useEffect } from "react";
import { useLoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StockWatchlistSearch = ({ stocks, addStockToWatchlist }) => {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState(""); // To display a message if stock is already in the watchlist
  const { darkMode } = useContext(ThemeContext);
  const { isLoggedin } = useLoginContext();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setMessage(""); // Clear the message when the user starts typing
  };

  // Retrieve email from sessionStorage on component mount
  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // Check if the entered ticker already exists in the watchlist
  const isTickerInWatchlist = (ticker) => {
    return stocks.some(
      (stock) => stock.symbol.toUpperCase() === ticker.toUpperCase()
    );
  };

  const handleKeyPress = async (e) => {
    if (!isLoggedin) {
      const confirmLogin = window.confirm(
        "You must log in to add to watchlist. Would you like to go to the login page?"
      );
      if (confirmLogin) {
        navigate("/login");
      }
      return;
    }

    if (e.key === "Enter" && query.trim()) {
      if (isTickerInWatchlist(query)) {
        setMessage("Stock already in watchlist");
        return; // Prevent submitting if ticker already exists
      }

      try {
        // Step 1: Verify stock ticker using Flask backend
        const response = await axios.get(
          "https://swing-trading-backend-fdrx.vercel.app/api/stock",
          {
            params: { ticker: query },
          }
        );

        // Step 2: If ticker is valid, proceed to add it to the database
        const newWatchlist = { ticker: query, emailId: userEmail };
        const createResponse = await fetch(
          "https://swing-trading-backend-java-production.up.railway.app/api/watchlist/createWatchlist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newWatchlist),
          }
        );

        if (createResponse.ok) {
          console.log("Watchlist created successfully");

          // Add the new stock to the parent state immediately
          addStockToWatchlist({ symbol: query });
          setQuery(""); // Clear the input after adding
        } else {
          console.error(
            "Failed to create watchlist",
            createResponse.statusText
          );
        }
      } catch (err) {
        // Step 3: Handle error if ticker is invalid
        console.error("Error verifying stock ticker", err);
        setMessage("Stock not found. Please try again.");
      }
    }
  };

  return (
    <div>
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
            border: "1px solid",
            borderColor: darkMode ? "#4338CA" : "#ccc",
            borderRadius: "4px",
            outline: darkMode ? "2px solid #4338CA" : "2px solid black",
            backgroundColor: darkMode ? "#111827" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
        />
      </div>
      {message && <p style={{ color: "red" }}>{message}</p>}{" "}
      {/* Display message if ticker already exists */}
    </div>
  );
};

export default StockWatchlistSearch;
