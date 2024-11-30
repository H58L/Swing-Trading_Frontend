
import React, { useContext, useState } from "react";
 import ThemeContext from "../context/ThemeContext";
 import { useEmailContext } from "../context/EmailContext";
 import { useEffect } from "react";
 import { useLoginContext } from "../context/LoginContext";
 import { useNavigate } from "react-router-dom";
 // Update this with your ThemeContext path


const StockWatchlistSearch = ({ onSearch }) => {
  const [query, setQuery] = useState(""); //query is the stock tcker that is to be set
  const { darkMode } = useContext(ThemeContext); // Access darkMode from ThemeContext
  //const { userEmail, setUserEmail } = useEmailContext();
  const { isLoggedin } = useLoginContext();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Retrieve email from sessionStorage on component mount
  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      console.log("Email retrieved from sessionStorage:", email);
      setUserEmail(email);
    }
  }, []);


  const handleKeyPress = async(e) => {

    if (!isLoggedin) {
      const confirmLogin = window.confirm(
        "You must log in to add in watchlist. Would you like to go to the login page?"
      );
      if (confirmLogin) {
        navigate("/login");
      }
      return;
    }
    navigate("/dashboard");

    if (e.key === "Enter" && query.trim()) {
      console.log(query);
      
      const newWatchlist = 
      {ticker : query,
        emailId: userEmail
      } //JSON object to pass to backend

      console.log("Payload being sent to backend:", newWatchlist);
      try {
        const response = await fetch("http://localhost:8080/api/watchlist/createWatchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newWatchlist),
        });
  
        if (response.ok) {
          console.log("Watchlist created successfully");
        } else {
          console.error("Failed to create watchlist", response.statusText);
        }
      } catch (error) {
        console.error("Error creating ", error);
      }
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
