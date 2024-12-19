import React, { useState, useContext } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "../style/MovingAveragesChart.css";
import Header from "./Header";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ThemeContext from "../context/ThemeContext";
import '../style/IndicatorChart.css';

const IndicatorChart = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedIndicator, setSelectedIndicator] = useState("");
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedIn] = useState(); // Initialize with null to avoid premature redirects

  // Mapping between dropdown labels and backend keys
  const indicators = [
    { label: "Simple Moving Averages - 20,50,100 Days", value: "MA" },
    { label: "Simple Moving Averages - 20 Days", value: "MA20" },
    { label: "Simple Moving Averages - 50 Days", value: "MA50" },
    { label: "Simple Moving Averages - 100 Days", value: "MA100" },
    { label: "Exponential Moving Averages - 20,50,100 Days", value: "EMA" },
    { label: "Exponential Moving Averages - 20 Days", value: "EMA20" },
    { label: "Exponential Moving Averages - 50 Days", value: "EMA50" },
    { label: "Exponential Moving Averages - 100 Days", value: "EMA100" },
    { label: "Bollinger Bands - 20 Days", value: "BB20" },
    { label: "Moving Average Convergence/divergence", value: "MACD" },
    { label: "Average True Range (ATR)", value: "ATR" },
    { label: "Fibonacci Retracement", value: "FR" },
    { label: "Elliot Wave", value: "EW00" },
  ];

  // LOGGED IN OR NOT 
  useEffect(() => {
    const storedLoginStatus = sessionStorage.getItem("isLoggedin");
    if (storedLoginStatus) {
      setIsLoggedIn(storedLoginStatus === "true"); // Convert to boolean
    } else {
      setIsLoggedIn(false); // If no value in sessionStorage, assume not logged in
    }
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (isLoggedin === false) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  useEffect(() => {
    console.log("Inside useeffect");
    if (selectedIndicator) {
      fetchIndicatorData();
    }
  }, [selectedIndicator]);

  const fetchIndicatorData = async () => {
    setError(null);
    try {
      console.log("Selected Indicator: ", selectedIndicator);

      // const response = await axios.get("https://swing-trading-backend-fdrx.vercel.app/indicators", {
      //   params: { ticker, indicator: selectedIndicator },
      // });

      // const response = await axios.get("https://swingtrading-production.up.railway.app/indicators", {
      //   params: { ticker, indicator: selectedIndicator },
      // });

      const response = await axios.get("http://localhost:5000/indicators", {
        params: { ticker, indicator: selectedIndicator },
      });

      console.log("Recieved Data in fetch", response.data);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching data");
    }
  };

  const plotData = () => {
    console.log("plotData called, selectedIndicator:", selectedIndicator);
    console.log("data type:", typeof data, "data:", data);

    if (!data || typeof data !== "object") {
      console.error("Invalid data:", data);
      return [];
    }

    let plots = [];

    // Customize plotting based on the selectedIndicator
    if (
      selectedIndicator === "FR" &&
      data.fibonacci_levels &&
      Array.isArray(data.stock_data)
    ) {
      const fibonacciLevels = data.fibonacci_levels;
      const stockData = data.stock_data;

      plots = [
        {
          x: stockData.map((d) => d.Date),
          y: stockData.map((d) => d.Close),
          type: "scatter",
          mode: "lines",
          name: "Close Price",
          line: { color: "black" },
        },
        {
          x: Object.keys(fibonacciLevels),
          y: Object.values(fibonacciLevels),
          type: "scatter",
          mode: "lines+markers",
          name: "Fibonacci Levels",
          line: { dash: "dot", color: "blue" },
          marker: { color: "red", size: 8 },
        },
      ];
    } else {
      // Default plot for other indicators
      if (Array.isArray(data)) {
        plots = [
          {
            x: data.map((d) => d.Date),
            y: data.map((d) => d.Close),
            type: "scatter",
            mode: "lines",
            name: "Close Price",
            line: { color: "black" },
          },
        ];
      } else {
        console.error(
          "Unexpected data structure for the selectedIndicator:",
          data
        );
      }
    }

    if (selectedIndicator === "MA") {
      console.log("Inside MA");
      if (Array.isArray(data))
      {
        const smaPeriods = [20, 50, 100]; // Periods for all desired SMAs
      for (const period of smaPeriods) {
        plots.push({
          x: data.map((d) => d.Date),
          y: data.map((d) => (`MA${period}` ? d[`MA${period}`] : null)), // Check if key exists
          type: "scatter",
          mode: "lines",
          name: `SMA${period}`,
          line: {
            color: period === 20 ? "orange" : period === 50 ? "blue" : "green",
          }, // Assign different colors
        });
      }
      }
      // const smaPeriods = [20, 50, 100]; // Periods for all desired SMAs
      // for (const period of smaPeriods) {
      //   plots.push({
      //     x: data.map((d) => d.Date),
      //     y: data.map((d) => (`MA${period}` ? d[`MA${period}`] : null)), // Check if key exists
      //     type: "scatter",
      //     mode: "lines",
      //     name: `SMA${period}`,
      //     line: {
      //       color: period === 20 ? "orange" : period === 50 ? "blue" : "green",
      //     }, // Assign different colors
      //   });
      // }
    }

    if (selectedIndicator === "EMA") {
      console.log("Inside EMA");
      if (Array.isArray(data))
      {
        const smaPeriods = [20, 50, 100]; // Periods for all desired SMAs
      for (const period of smaPeriods) {
        plots.push({
          x: data.map((d) => d.Date),
          y: data.map((d) => (`EMA${period}` ? d[`EMA${period}`] : null)), // Check if key exists
          type: "scatter",
          mode: "lines",
          name: `EMA${period}`,
          line: {
            color: period === 20 ? "orange" : period === 50 ? "blue" : "green",
          }, // Assign different colors
        });
      }
      }
      // const smaPeriods = [20, 50, 100]; // Periods for all desired SMAs
      // for (const period of smaPeriods) {
      //   plots.push({
      //     x: data.map((d) => d.Date),
      //     y: data.map((d) => (`EMA${period}` ? d[`EMA${period}`] : null)), // Check if key exists
      //     type: "scatter",
      //     mode: "lines",
      //     name: `EMA${period}`,
      //     line: {
      //       color: period === 20 ? "orange" : period === 50 ? "blue" : "green",
      //     }, // Assign different colors
      //   });
      // }
    }
    if (selectedIndicator === "EMA20") {
      console.log("Inside EMA20");
      if (Array.isArray(data))
      {
        plots.push({
          x: data.map((d) => d.Date),
          y: data.map((d) => d.EMA20),
          type: "scatter",
          mode: "lines",
          name: "EMA20",
          line: { color: "orange" },
        });
      }
     
    }
    if (selectedIndicator === "EMA50") {
      console.log("Inside EMA50");
      if (Array.isArray(data))
      {
        plots.push({
          x: data.map((d) => d.Date),
          y: data.map((d) => d.EMA50),
          type: "scatter",
          mode: "lines",
          name: "EMA50",
          line: { color: "orange" },
        });
      }
      
    }
    if (selectedIndicator === "EMA100") {
      //console.log("ema: ", data);
      console.log("Inside EMA100");
      if (Array.isArray(data))
      {
        plots.push({
          x: data.map((d) => d.Date),
          y: data.map((d) => d.EMA100),
          type: "scatter",
          mode: "lines",
          name: "EMA100",
          line: { color: "orange" },
        });
      }
      // plots.push({
      //   x: data.map((d) => d.Date),
      //   y: data.map((d) => d.EMA100),
      //   type: "scatter",
      //   mode: "lines",
      //   name: "EMA100",
      //   line: { color: "orange" },
      // });
    }
    if (selectedIndicator === "BB20") {

      console.log("Inside BB20");
      if (Array.isArray(data))
      {
         console.log("bb");

      plots.push(
        {
          x: data.map((d) => d.Date),
          y: data.map((d) => d["Middle Band"]),
          type: "scatter",
          mode: "lines",
          name: "Middle Band",
          line: { dash: "dash", color: "blue" },
        },
        {
          x: data.map((d) => d.Date),
          y: data.map((d) => d["Upper Band"]),
          type: "scatter",
          mode: "lines",
          name: "Upper Band",
          line: { color: "green" },
        },
        {
          x: data.map((d) => d.Date),
          y: data.map((d) => d["Lower Band"]),
          type: "scatter",
          mode: "lines",
          name: "Lower Band",
          line: { color: "red" },
        }
      );
      }
     
    }
    if (selectedIndicator === "MACD") {
      console.log("Inside MACD");
      if (Array.isArray(data))
      {
        plots.push({
        x: data.map((d) => d.Date),
        y: data.map((d) => d.Close),
        type: "scatter",
        mode: "lines",
        name: "Close Price",
        line: { color: "green" }, // Set a color for the Close price line
        yaxis: "y", // Assign this trace to the primary y-axis
      });
      plots.push({
        x: data.map((d) => d.Date),
        y: data.map((d) => d.MACD),
        type: "scatter",
        mode: "lines",
        name: "MACD Line",
        line: { color: "blue" }, // Set a color for the MACD line
        yaxis: "y2", // Assign this trace to the secondary y-axis
      });
      plots.push({
        x: data.map((d) => d.Date),
        y: data.map((d) => d.Signal_line),
        type: "scatter",
        mode: "lines",
        name: "Signal Line",
        line: { color: "orange" }, // Set a color for the signal line
        yaxis: "y2", // Assign this trace to the secondary y-axis
      });
      }
      
    }
    if (selectedIndicator === "ATR") {
      console.log("Inside ATR");
      if (Array.isArray(data))
      {
        plots.push({
        x: data.map((d) => d.Date),
        y: data.map((d) => d.Close),
        type: "scatter",
        mode: "lines",
        name: "Close Price",
        line: { color: "green" }, // Color for the Close price line
        yaxis: "y", // Assign this trace to the primary y-axis
      });
      plots.push({
        x: data.map((d) => d.Date),
        y: data.map((d) => d.ATR || null), // ATR values from the backend
        type: "scatter",
        mode: "lines",
        name: "ATR (14 Days)",
        line: { color: "purple" }, // Color for the ATR line
        yaxis: "y2", // Assign this trace to the secondary y-axis
      });
      }
      
    }

    if (indicators.length > 0 && selectedIndicator === "FR") {
      
      console.log("FR Received Data:", data);

      // Check for empty data
      if (!data.stock_data || data.stock_data.length === 0) {
        return []; // Return empty array if no data
      }

      // Extract Fibonacci levels and stock data
      const fibonacciLevels = data.fibonacci_levels;
      const stockData = data.stock_data;

      // Get date range (handle missing dates if needed)
      const startDate = data.stock_data?.[0]?.Date || "2023-12-01";
      const endDate =
        data.stock_data?.[data.stock_data.length - 1]?.Date || new Date();

      // Iterate over Fibonacci levels and push each retracement line
      Object.entries(fibonacciLevels).forEach(([levelName, levelPrice]) => {
        plots.push({
          x: [startDate, endDate],
          y: [levelPrice, levelPrice],
          type: "scatter",
          mode: "lines",
          name: levelName,
          line: {
            dash: "dash",
            color: "rgba(77, 102, 255, 0.7)",
            width: 2,
          },
        });
      });

      // Add close price line for stock data
      plots.push({
        x: stockData.map((d) => d.Date),
        y: stockData.map((d) => d.Close),
        type: "scatter",
        mode: "lines",
        name: "Close Price",
        line: { color: "black" },
      });
    }
    if (selectedIndicator === "EW00") {
      console.log("Inside if EW");
      console.log("Recieved Data EW before fetch", data);
      // fetchIndicatorData();
      console.log("Recieved Data EW after fetch", data);

      if (!data.buy_signals || !data.sell_signals) {
        console.log("Inside Empty data if, returning empty array");
        return [];
      }
      // Check if buy/sell signals exist
      console.log("Inside if EW, below if");
      // Extract signals from object of objects
      const buySignalsArray = Object.values(data.buy_signals); // Convert buy_signals object to array
      const sellSignalsArray = Object.values(data.sell_signals); // Convert sell_signals object to array
      const closeDataArray = Object.values(data.data); // Convert sell_signals object to array

      plots.push({
        x: closeDataArray.map((d) => d.Date), // Dates are already in the correct string format
        y: closeDataArray.map((d) => d.Close),
        type: "scatter",
        mode: "lines",
        name: "Close Price",
        line: { color: "black" },
        //line: { color: darkMode ? 'white' : 'black' },//   // Set marker color and size for buy signals
      });

      // Buy and Sell Signals for Elliot Wave
      plots.push({
        x: buySignalsArray.map((d) => d.date), // Dates are already in the correct string format
        y: buySignalsArray.map((d) => d.price),
        type: "scatter",
        mode: "markers",
        name: "Buy Signals",
        marker: { color: "green", size: 8 }, // Set marker color and size for buy signals
      });

      plots.push({
        x: sellSignalsArray.map((d) => d.date), // Dates are already in the correct string format
        y: sellSignalsArray.map((d) => d.price),
        type: "scatter",
        mode: "markers",
        name: "Sell Signals",
        marker: { color: "red", size: 8 }, // Set marker color and size for sell signals
      });
    } else {
      // Handle other indicators (e.g., Moving Averages)
      console.log("Inside else block");

      if (
        selectedIndicator === "FR" &&
        data.fibonacci_levels &&
        Array.isArray(data.stock_data)
      ) {
        const fibonacciLevels = data.fibonacci_levels;
        const stockData = data.stock_data;

        // Plotting the Close Price
        plots.push({
          x: stockData.map((d) => d.Date),
          y: stockData.map((d) => d.Close),
          type: "scatter",
          mode: "lines",
          name: "Close Price",
          line: { color: "black" },
        });

        // Plotting Fibonacci levels
        plots.push({
          x: Object.keys(fibonacciLevels),
          y: Object.values(fibonacciLevels),
          type: "scatter",
          mode: "lines+markers",
          name: "Fibonacci Levels",
          line: { dash: "dot", color: "blue" },
          marker: { color: "red", size: 8 },
        });
      } else {
        if (Array.isArray(data))
        {
          plots.push({
            x: data.map((d) => d.Date),
            y: data.map((d) => d[selectedIndicator]),
            type: "scatter",
            mode: "lines",
            name: indicators.find((ind) => ind.value === selectedIndicator)
              ?.label,
          });
        }
        // For other indicators (Moving Averages, etc.)
        // plots.push({
        //   x: data.map((d) => d.Date),
        //   y: data.map((d) => d[selectedIndicator]),
        //   type: "scatter",
        //   mode: "lines",
        //   name: indicators.find((ind) => ind.value === selectedIndicator)
        //     ?.label,
        // });
      }
    }

    return plots;
  };

  return (
    <>
      <Header />
      <div className="chart-container">
        <h2>Stock Indicators Chart</h2>
        <div className="input-container">
          {/* Ticker Input */}
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Enter Ticker (e.g., AAPL)"
            className="ticker-input"
          />

          {/* Dropdown for Indicator Selection */}
          <select
            value={selectedIndicator}
            onChange={(e) => setSelectedIndicator(e.target.value)}
            

            className="indicator-dropdown"
          >
            <option value="" disabled>
              Select Indicator
            </option>
            {indicators.map((indicator) => (
              <option key={indicator.value} value={indicator.value}>
                {indicator.label}
              </option>
            ))}
          </select>

          {/* Fetch Button */}
          <button
            onClick={fetchIndicatorData}
            className="fetch-button"
            // disabled={!selectedIndicator}
          >
            Get Data
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Plot */}
        
        {console.log("Plot data:", data)}

        {selectedIndicator && (
          <Plot
            data={plotData()}
            layout={{
              title: `${ticker} ${
                indicators.find((ind) => ind.value === selectedIndicator)?.label
              }`,
              xaxis: { title: "Date" },
              yaxis: {
                title: "Price",
                side: "left",
                showgrid: true,
              }, // Primary y-axis for Close Price
              ...(selectedIndicator === "MACD" || selectedIndicator === "ATR"
                ? {
                    yaxis2: {
                      title:
                        selectedIndicator === "MACD"
                          ? "MACD & Signal Line"
                          : "ATR",
                      side: "right",
                      overlaying: "y", // Overlay on primary y-axis
                      showgrid: false,
                    },
                  }
                : {}),
              dragmode: "pan",
            }}
          />
        )}
      </div>
    </>
  );
};

export default IndicatorChart;
