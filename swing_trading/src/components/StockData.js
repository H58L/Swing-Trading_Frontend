import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import StockContext from "../context/StockContext";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import Header from "./Header";
import { fetchStockData } from "../redux/actions/StockActions";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector to access data
import ChartDisplay from "./ChartDisplay";
import { useLoginContext } from "../context/LoginContext";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const StockData = () => {
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("candlestick"); // Default to candlestick chart
  const [period, setPeriod] = useState("1mo"); // Default to 1 month data
  const [realTimePrice, setRealTimePrice] = useState(null); // Real-time stock price
  const [previousClose, setPreviousClose] = useState(null); // Previous closing price

  const { stockSymbol } = useContext(StockContext);
  const dispatch = useDispatch(); //allows the component to send actions to the Redux store.

  // This hook accesses the current stockData from the Redux store
  const stockData = useSelector((state) => state.stockData);

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

  // Redirect if not logged in
  useEffect(() => {
    if (isLoggedin === false) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  // Set real-time and previous close prices from the stock data

  useEffect(() => {
    const fetchData = async () => {
      //The fetchStockData action creator is dispatched with the current stockSymbol and period, triggering the API call to fetch the stock data.
      try {
        setLoading(true);
        await dispatch(fetchStockData(stockSymbol, period));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch stock data.");
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 30000); // Call API every 30 seconds

    return () => clearInterval(intervalId);
  }, [stockSymbol, dispatch, period]); //// This hook runs the provided effect when the component mounts and whenever any dependencies change
  //(in this case, period, stockSymbol, dispatch, and stockData).

  // Update real-time prices based on stockData changes
  useEffect(() => {
    if (stockData?.close && stockData.close.length > 1) {
      setRealTimePrice(stockData.close[stockData.close.length - 1]);
      setPreviousClose(stockData.close[stockData.close.length - 2]);
    }
  }, [stockData]); // This effect updates real-time prices whenever stockData changes

  //Locking
  // if (!isLoggedin) {

  //   return <Navigate to="/" replace />;
  // }

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    setLoading(true);
  };

  const chartTitle = `${stockSymbol} - ${
    chartType.charAt(0).toUpperCase() + chartType.slice(1)
  } Chart (${period})`;

  // Calculate price difference and percentage change
  const priceDifference =
    realTimePrice && previousClose
      ? (realTimePrice - previousClose).toFixed(2)
      : null;

  const percentageChange =
    previousClose && realTimePrice
      ? (((realTimePrice - previousClose) / previousClose) * 100).toFixed(2)
      : null;

  return (
    <>
      <Header />
      <div
        className={`min-h-screen p-8 ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
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
            {chartTitle}
          </h1>

          {/* Real-time stock price display */}
          <div className="text-center mb-4">
            <span
              className={`text-xl font-bold ${
                darkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Current Price:{" "}
              {realTimePrice ? `₹${realTimePrice.toFixed(2)}` : "Loading..."}
            </span>
            {priceDifference !== null && (
              <div className="text-lg">
                <span
                  className={`font-bold ${
                    priceDifference >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {priceDifference >= 0
                    ? `+₹${priceDifference}`
                    : `-₹${Math.abs(priceDifference)}`}
                </span>
                <span
                  className={`ml-2 ${
                    percentageChange >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  (
                  {percentageChange >= 0
                    ? `+${percentageChange}%`
                    : `${percentageChange}%`}
                  )
                </span>
              </div>
            )}
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
              darkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <ChartDisplay
              chartTitle={chartTitle}
              period={period}
              chartType={chartType}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StockData;
