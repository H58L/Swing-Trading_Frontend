import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const StockChart = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("candlestick"); // Default to candlestick chart
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [period, setPeriod] = useState("1mo"); // Default to 1 month data

  const stockTicker = "RELIANCE.NS"; // Hardcoded for now, but can be dynamic

  // Function to fetch stock data
  const fetchStockData = () => {
    setLoading(true);
    fetch(
      `http://127.0.0.1:5000/api/stock?ticker=${stockTicker}&period=${period}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setStockData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch stock data.");
        setLoading(false);
      });
  };

  // Fetch stock data when component mounts or when 'period' changes
  useEffect(() => {
    fetchStockData();
  }, [period]);

  if (loading)
    return (
      <div
        className={`text-center ${
          darkMode ? "text-gray-300" : "text-gray-500"
        }`}
      >
        Loading stock data...
      </div>
    );
  if (error)
    return (
      <div
        className={`text-red-500 text-center ${darkMode ? "bg-gray-800" : ""}`}
      >
        {error}
      </div>
    );

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  // Generate dynamic chart title
  const chartTitle = `${stockTicker} - ${
    chartType.charAt(0).toUpperCase() + chartType.slice(1)
  } Chart (${period})`;

  const candlestickData = [
    {
      x: stockData.dates,
      open: stockData.open,
      high: stockData.high,
      low: stockData.low,
      close: stockData.close,
      type: "candlestick",
      xaxis: "x",
      yaxis: "y",
    },
  ];

  const lineChartData = [
    {
      x: stockData.dates,
      y: stockData.close,
      type: "scatter",
      mode: "lines+markers",
      line: { color: "#4F46E5" }, // Blue color for line
      marker: { color: "#4F46E5", size: 6 },
      name: "Closing Prices",
    },
  ];

  return (
    <div
      className={`min-h-screen p-8 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div
        className={`max-w-5xl mx-auto shadow-lg rounded-lg p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-6 text-center ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Indian Stock Market Data
        </h1>

        {/* Dark Mode Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleToggleDarkMode}
            className={`p-2 rounded-md ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            } transition duration-200`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Dropdown for selecting time period */}
        <div className="flex justify-center mb-4">
          <label
            className={`text-lg font-medium ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } mr-4`}
          >
            Select Time Period:
          </label>
          <select
            value={period}
            onChange={handlePeriodChange}
            className={`p-2 border ${
              darkMode
                ? "border-gray-600 bg-gray-700 text-gray-200"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:border-indigo-500`}
          >
            <option value="1d">1 Day</option>
            <option value="1mo">1 Month</option>
            <option value="6mo">6 Months</option>
            <option value="1y">1 Year</option>
            <option value="5y">5 Years</option>
            <option value="10y">10 Years</option>
          </select>
        </div>

        {/* Dropdown for selecting chart type */}
        <div className="flex justify-center mb-4">
          <label
            className={`text-lg font-medium ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } mr-4`}
          >
            Select Chart Type:
          </label>
          <select
            value={chartType}
            onChange={handleChartTypeChange}
            className={`p-2 border ${
              darkMode
                ? "border-gray-600 bg-gray-700 text-gray-200"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:border-indigo-500`}
          >
            <option value="candlestick">Candlestick Chart</option>
            <option value="line">Line Chart (Closing Prices)</option>
          </select>
        </div>

        {/* Conditionally render the chart */}
        <div
          className={`rounded-lg p-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-gray-50"
          }`}
        >
          {chartType === "candlestick" ? (
            <Plot
              data={candlestickData}
              layout={{
                title: chartTitle,
                xaxis: { title: "Date", color: darkMode ? "white" : "black" },
                yaxis: {
                  title: "Price (INR)",
                  color: darkMode ? "white" : "black",
                },
                dragmode: "zoom",
                plot_bgcolor: darkMode ? "#1F2937" : "#F9FAFB",
                paper_bgcolor: darkMode ? "#1F2937" : "#F9FAFB",
              }}
              style={{ width: "100%", height: "500px" }}
            />
          ) : (
            <Plot
              data={lineChartData}
              layout={{
                title: chartTitle,
                xaxis: { title: "Date", color: darkMode ? "white" : "black" },
                yaxis: {
                  title: "Price (INR)",
                  color: darkMode ? "white" : "black",
                },
                dragmode: "zoom",
                plot_bgcolor: darkMode ? "#1F2937" : "#F9FAFB",
                paper_bgcolor: darkMode ? "#1F2937" : "#F9FAFB",
              }}
              style={{ width: "100%", height: "500px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StockChart;
