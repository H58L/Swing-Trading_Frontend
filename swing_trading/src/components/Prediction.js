// charts.js
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Header from "./Header";

const Prediction = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [period, setPeriod] = useState("5y"); // State to store the selected period
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading

  const fetchChartData = (stockSymbol, selectedPeriod) => {
    setLoading(true);
    fetch(
      `http://127.0.0.1:5000/combined-chart?symbol=${stockSymbol}&period=${selectedPeriod}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          setError(data.error); // Handle error if no data is returned
          setChartData(null);
        } else {
          setError(null);
          setChartData(data); // Set the chart data
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching chart data:", error);
        setError("Error fetching chart data.");
        setChartData(null);
      });
  };

  useEffect(() => {
    // Fetch chart data when the component mounts or symbol changes
    fetchChartData(symbol, period);
  }, [symbol, period]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputSymbol = event.target.elements.stockSymbol.value
      .trim()
      .toUpperCase();
    if (inputSymbol) {
      setSymbol(inputSymbol); // Update the symbol state
    }
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value); // Update the period state
  };

  return (
    <>
      <Header />
      <div>
        {/* Input form for stock symbol */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <label htmlFor="stockSymbol" style={{ marginRight: "10px" }}>
            Enter Stock Symbol:
          </label>
          <input
            type="text"
            id="stockSymbol"
            name="stockSymbol"
            placeholder="e.g., AAPL"
            style={{
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginRight: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Load Chart
          </button>
        </form>

        {/* Dropdown for period selection */}
        <label htmlFor="period" style={{ marginRight: "10px" }}>
          Select Period:
        </label>
        <select
          id="period"
          value={period}
          onChange={handlePeriodChange}
          style={{ marginBottom: "20px" }}
        >
          <option value="1mo">1 Month</option>
          <option value="6mo">6 Months</option>
          <option value="1y">1 Year</option>
          <option value="2y">2 Years</option>
          <option value="5y">5 Years</option>
          <option value="10y">10 Years</option>
        </select>

        {/* Error or Loading Message */}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading && <p>Loading candlestick chart...</p>}

        {/* Plotly Chart */}
        {chartData && !loading && (
          <Plot
            data={chartData.data}
            layout={chartData.layout}
            config={{ responsive: true }}
          />
        )}
      </div>
    </>
  );
};

export default Prediction;
