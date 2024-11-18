import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector to access data
import StockContext from "../context/StockContext";
import { fetchStockData } from "../redux/actions/StockActions";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ChartDisplay = ({ chartTitle, chartType }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [realTimePrice, setRealTimePrice] = useState(null); // Real-time stock price
  const [previousClose, setPreviousClose] = useState(null); // Previous closing price

  const { stockSymbol } = useContext(StockContext);
  const { darkMode } = useContext(ThemeContext);

  const dispatch = useDispatch(); //allows the component to send actions to the Redux store.
  const stockData = useSelector((state) => state.stockData);

  useEffect(() => {


    const fetchData = async () => {
      //The fetchStockData action creator is dispatched with the current stockSymbol and period, triggering the API call to fetch the stock data.
      try {
        setLoading(true);
        await dispatch(fetchStockData(stockSymbol));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch stock data.");
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 30000); // Call API every 30 seconds

    return () => clearInterval(intervalId);
  }, [stockSymbol, dispatch]); //// This hook runs the provided effect when the component mounts and whenever any dependencies change
  //(in this case, period, stockSymbol, dispatch, and stockData).

  // Update real-time prices based on stockData changes
  useEffect(() => {
    if (stockData?.close && stockData.close.length > 1) {
      setRealTimePrice(stockData.close[stockData.close.length - 1]);
      setPreviousClose(stockData.close[stockData.close.length - 2]);
    }
  }, [stockData]); // This effect updates real-time prices whenever stockData changes

  // This hook accesses the current stockData from the Redux store
  const candlestickData = [
    {
      x: stockData?.dates,
      open: stockData?.open,
      high: stockData?.high,
      low: stockData?.low,
      close: stockData?.close,
      type: "candlestick",
      xaxis: "x",
      yaxis: "y",
    },
    {
      x: stockData?.dates, // Match the prediction range
      y: stockData?.predictions,
      type: "scatter",
      mode: "lines",
      line: { color: "#FF5733", width: 2 }, // Customize the line appearance
      name: "LSTM Predictions",
    },
  ];

  const lineChartData = [
    {
      x: stockData?.dates,
      y: stockData?.close,
      type: "scatter",
      mode: "lines+markers",
      line: { color: "#4F46E5" },
      marker: { color: "#4F46E5", size: 6 },
      name: "Closing Prices",
    },
    {
      x: stockData?.dates, // Match the prediction range
      y: stockData?.predictions,
      type: "scatter",
      mode: "lines",
      line: { color: "#FF5733", width: 2 }, // Customize the line appearance
      name: "LSTM Predictions",
    },
  ];

  return (
    <div
      className={`rounded-lg p-4 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {chartType === "candlestick" ? (
        <Plot
          data={candlestickData}
          layout={{
            title: {
              text: chartTitle,
              font: { color: darkMode ? "white" : "black" }, // Set title color based on darkMode
            },
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
            title: {
              text: chartTitle,
              font: { color: darkMode ? "white" : "black" }, // Set title color based on darkMode
            },
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
  );
};

export default ChartDisplay;
