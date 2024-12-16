import React, { useState, useEffect } from "react";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import StockWatchlistSearch from "./StockWatchlistSearch";

const StockWatchlist = () => {
  const { darkMode } = useContext(ThemeContext);
  const [userEmail, setUserEmail] = useState("");
  const [stocks, setStocks] = useState([]);
  const [stockData, setStockData] = useState([]);

  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedIn] = useState(); // Initialize with null to avoid premature redirects

  // Retrieve isLoggedIn from sessionStorage on component mount
  useEffect(() => {
    const storedLoginStatus = sessionStorage.getItem("isLoggedin");
    if (storedLoginStatus) {
      setIsLoggedIn(storedLoginStatus === "true"); // Convert to boolean
    } else {
      setIsLoggedIn(false); // If no value in sessionStorage, assume not logged in
    }
  }, []);

  // Retrieve email from sessionStorage on component mount
  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // Fetch watchlist based on the userEmail
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (isLoggedin && userEmail) {
        try {
          const response = await axios.get(
            `https://swing-trading-backend-java-production.up.railway.app/api/watchlist/${userEmail}`
          );
          const watchlistData = response.data.map((item) => ({
            symbol: item.ticker, // Map `ticker` to `symbol`
            // companyName: "", // Placeholder for company name (optional)
          }));
          setStocks(watchlistData);
        } catch (error) {
          console.error("Error fetching watchlist:", error);
        }
      }
    };
    fetchWatchlist();
  }, [isLoggedin, userEmail]);

  // Fetch stock prices only when `stocks` change
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const updatedStockData = await Promise.all(
          stocks.map(async (stock) => {
            const response = await fetch(
              `https://swing-trading-backend-fdrx.vercel.app/api/stock?ticker=${stock.symbol}`
            );
            const data = await response.json();

            if (!data.error) {
              return {
                symbol: stock.symbol,
                companyName: stock.companyName,
                price: data.close[data.close.length - 1],
                volume: data.volume[data.volume.length - 1],
                change: (
                  data.close[data.close.length - 1] -
                  data.close[data.close.length - 2]
                ).toFixed(2),
                percentageChange: (
                  ((data.close[data.close.length - 1] -
                    data.close[data.close.length - 2]) /
                    data.close[data.close.length - 2]) *
                  100
                ).toFixed(2),
              };
            }
            return {
              ...stock,
              price: null,
              volume: null,
              change: null,
              percentageChange: null,
            };
          })
        );
        setStockData(updatedStockData);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      }
    };

    if (stocks.length > 0) {
      fetchStockData();
    }
  }, [stocks]);

  const removeEntry = async (ticker) => {
    try {
      // Post the ticker to the backend for removal
      await axios.post(
        "https://swing-trading-backend-java-production.up.railway.app/api/watchlist/deleteWatchlist",
        {
          ticker,
        }
      );

      // After successful deletion, remove the stock from the local state
      setStocks((prevStocks) =>
        prevStocks.filter((stock) => stock.symbol !== ticker)
      );
    } catch (error) {
      console.error("Error deleting stock from watchlist:", error);
    }
  };

  return (
    <>
      <StockWatchlistSearch
        stocks={stocks}
        addStockToWatchlist={(newStock) => setStocks([...stocks, newStock])}
      />
      <div className="p-0 h-full w-full">
        <ul className="h-full">
          {stockData.map((stock, index) => (
            <li
              key={index}
              className={`stock-item mb-3 rounded p-4 shadow-sm border border-gray-100 w-full ${
                darkMode ? "bg-gray-900 text-gray-100" : "bg-white"
              }`}
            >
              <div className="flex items-center">
                <button className="m-1 p-1">
                  <DeleteForeverIcon
                    className="text-xl text-gray-600 hover:text-gray-900"
                    onClick={() => removeEntry(stock.symbol)}
                  />
                </button>
                <div className="text-left ml-2">
                  <h3 className="text-lg font-semibold">
                    {stock.symbol || "Unknown Company"}
                  </h3>
                  {/* <p>{stock.symbol}</p> */}
                </div>
                <div className="ml-auto text-right">
                  <p
                    className={`text-lg font-bold ${
                      stock.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    ₹
                    {stock.price !== null
                      ? stock.price.toFixed(2)
                      : "Loading..."}
                  </p>
                  <p
                    className={`text-sm ${
                      stock.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change} ({stock.percentageChange}%)
                  </p>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Volume: {stock.volume || "N/A"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StockWatchlist;
