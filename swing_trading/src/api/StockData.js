import React, { useState, useEffect } from "react";
import axios from "axios";

const StockData = () => {
  const [stock, setStock] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Finnhub API URL with the stock symbol and API key
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_API_KEY`
        );
        setStock(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) return <p>Loading stock data...</p>;
  if (error) return <p>Error fetching data: {error}</p>;

  return (
    <div>
      <h2>Stock Data for AAPL</h2>
      <p>Current Price: {stock.c}</p>
      <p>High Price of the Day: {stock.h}</p>
      <p>Low Price of the Day: {stock.l}</p>
      <p>Previous Close: {stock.pc}</p>
    </div>
  );
};

export default StockData;
