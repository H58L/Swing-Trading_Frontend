// import React from "react";
// import Card from "./Card";
// import Header from "./Header";
// import Details from "./Details";
// import { mockCompanyDetails } from "../constants/mock";
// import Overview from "./Overview";
// import Header_Stock from "./Header_Stock";
// import Chart from "./Chart";
// import ThemeContext from "../context/ThemeContext";
// import { useContext, useState, useEffect } from "react";
// import ChartDisplay from "./ChartDisplay";
// import StockContext from "../context/StockContext";
// import { fetchStockData } from "../redux/actions/StockActions";
// import { useDispatch, useSelector } from "react-redux"; // Added useSelector to access data
// import { useLoginContext } from "../context/LoginContext";
// import { Navigate } from "react-router-dom";
// const ChartContainer = () => {


//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [period, setPeriod] = useState("1mo"); // Default to 1 month data
//   const [realTimePrice, setRealTimePrice] = useState(null); // Real-time stock price
//   const [previousClose, setPreviousClose] = useState(null); // Previous closing price
//   const [returns, setReturns] = useState({}); // Store percentage returns for each period

//   const { darkMode } = useContext(ThemeContext);
//   const { stockSymbol } = useContext(StockContext);
//   const dispatch = useDispatch(); //allows the component to send actions to the Redux store.
//   const stockData = useSelector((state) => state.stockData);
//   const { isLoggedin } = useLoginContext();
//   // Set real-time and previous close prices from the stock data
 
//   useEffect(() => {
//     const fetchData = async () => {
//       //The fetchStockData action creator is dispatched with the current stockSymbol and period, triggering the API call to fetch the stock data.
//       try {
//         setLoading(true);
//         await dispatch(fetchStockData(stockSymbol, period));
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch stock data.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//     const intervalId = setInterval(fetchData, 30000); // Call API every 30 seconds

//     return () => clearInterval(intervalId);
//   }, [stockSymbol, dispatch, period]); //// This hook runs the provided effect when the component mounts and whenever any dependencies change
//   //(in this case, period, stockSymbol, dispatch, and stockData).

//   // Update real-time prices based on stockData changes
//   useEffect(() => {
//     if (stockData?.close && stockData.close.length > 1) {
//       setRealTimePrice(stockData.close[stockData.close.length - 1]);
//       setPreviousClose(stockData.close[stockData.close.length - 2]);
//     }
//   }, [stockData]); // This effect updates real-time prices whenever stockData changes

//   // Handle period change and fetch returns for that period
//   const handlePeriodChange = async (newPeriod) => {
//     setPeriod(newPeriod);
//     try {
//       setLoading(true);
//       await dispatch(fetchStockData(stockSymbol, newPeriod));
//       const stockDataForPeriod = await fetchStockData(stockSymbol, newPeriod);
//       if (stockDataForPeriod?.close?.length > 1) {
//         const periodReturn =
//           ((stockDataForPeriod.close[stockDataForPeriod.close.length - 1] -
//             stockDataForPeriod.close[0]) /
//             stockDataForPeriod.close[0]) *
//           100;
//         setReturns((prevReturns) => ({
//           ...prevReturns,
//           [newPeriod]: periodReturn.toFixed(2),
//         }));
//       }
//       setLoading(false);
//     } catch (err) {
//       setError("Failed to fetch stock data.");
//       setLoading(false);
//     }
//   };

//   // Calculate price difference and percentage change
//   const priceDifference =
//     realTimePrice && previousClose
//       ? (realTimePrice - previousClose).toFixed(2)
//       : null;

//   const percentageChange =
//     previousClose && realTimePrice
//       ? (((realTimePrice - previousClose) / previousClose) * 100).toFixed(2)
//       : null;

//       if (!isLoggedin) {
//         return <Navigate to="/" replace />;
//       }
    
//   return (
//     <>
//       {/* <Header /> */}
//       <div
//         className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 
//     xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand relative
//     ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"}`}
//       >
//         {/* Removed absolute positioning from ThemeIcon and added relative to container */}

//         {/* Header row
//         <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
//           <Header_Stock />
//         </div>

//         <div className="flex justify-end items-center space-x-2 mt-4">
//   {["1d", "1mo", "6mo", "1y", "5y", "10y", "all"].map((periodLabel) => (
//     <button
//       key={periodLabel}
//       className={`px-4 py-2 rounded ${
//         darkMode
//           ? "bg-gray-800 text-gray-300"
//           : "bg-gray-200 text-gray-900"
//       } hover:bg-blue-500 hover:text-white transition-all duration-200`}
//       onClick={() => handlePeriodChange(periodLabel)}
//     >
//       {periodLabel.toUpperCase()}
//       {returns[periodLabel] ? (
//         <span className="ml-2 text-sm">
//           {returns[periodLabel] >= 0 ? "+" : ""}
//           {returns[periodLabel]}%
//         </span>
//       ) : null}
//     </button>
//   ))}
// </div> */}

// {/* Header row */}
// <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-between items-center">
//   {/* Header on the left */}
//   <div>
//     <Header_Stock />
//   </div>
  
//   {/* Buttons on the right */}
//   <div className="flex space-x-2">
//     {["1d", "1mo", "6mo", "1y", "5y", "10y", "all"].map((periodLabel) => (
//       <button
//         key={periodLabel}
//         className={`px-4 py-2 rounded ${
//           darkMode
//             ? "bg-gray-800 text-gray-300"
//             : "bg-gray-200 text-gray-900"
//         } hover:bg-blue-500 hover:text-white transition-all duration-200`}
//         onClick={() => handlePeriodChange(periodLabel)}
//       >
//         {periodLabel.toUpperCase()}
//         {returns[periodLabel] ? (
//           <span className="ml-2 text-sm">
//             {returns[periodLabel] >= 0 ? "+" : ""}
//             {returns[periodLabel]}%
//           </span>
//         ) : null}
//       </button>
//     ))}
//   </div>
// </div>



//         {/* Chart box */}
//         <div className="md:col-span-2 row-span-4">
//           <ChartDisplay />
//           {/* <StockChart></StockChart> */}
//         </div>

//         {/* Overview box */}
//         <div>
//           <Overview
//             price={realTimePrice ? `${realTimePrice.toFixed(2)}` : "Loading..."}
//             change={
//               priceDifference >= 0
//                 ? `+₹${priceDifference}`
//                 : `-₹${Math.abs(priceDifference)}`
//             }
//             percentageChange={
//               percentageChange >= 0
//                 ? `+${percentageChange}%`
//                 : `${percentageChange}%`
//             }
//             currency={"INR"}
//           ></Overview>
//         </div>

//         {/* Company details
//         <div className="row-span-2 xl:row-span-3">
//           <Details details={mockCompanyDetails}></Details>
//         </div> */}
//       </div>
//       {/* Time Period Buttons */}
//       {/* <div className="col-span-3 bottom- row-span-1 flex justify-around mt-4">
//         {["1d", "1mo", "6mo", "1y", "5y", "10y", "all"].map((periodLabel) => (
//           <button
//             key={periodLabel}
//             className={`px-4 py-2 rounded ${
//               darkMode
//                 ? "bg-gray-800 text-gray-300"
//                 : "bg-gray-200 text-gray-900"
//             } hover:bg-blue-500 hover:text-white transition-all duration-200`}
//             onClick={() => handlePeriodChange(periodLabel)}
//           >
//             {periodLabel.toUpperCase()}
//             {returns[periodLabel] ? (
//               <span className="ml-2 text-sm">
//                 {returns[periodLabel] >= 0 ? "+" : ""}
//                 {returns[periodLabel]}%
//               </span>
//             ) : null}
//           </button>
//         ))}
//       </div> */}
//     </>
//   );
// };

// export default ChartContainer;

import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header_Stock from "./Header_Stock";
import ChartDisplay from "./ChartDisplay";
import Overview from "./Overview";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { useLoginContext } from "../context/LoginContext";
import { fetchStockData } from "../redux/actions/StockActions";
import { useValidTickerContext } from "../context/ValidTickerContext";
// import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const ChartContainer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("1mo");
  const [realTimePrice, setRealTimePrice] = useState(null);
  const [previousClose, setPreviousClose] = useState(null);
  const [returns, setReturns] = useState({});
  const {isValidTicker, setIsValidTicker} = useValidTickerContext();

  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const dispatch = useDispatch();
  const stockData = useSelector((state) => state.stockData);
  // Set real-time and previous close prices from the stock data

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

  useEffect(() => {
    const fetchData = async () => {
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
    const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, [stockSymbol, dispatch, period]);

  useEffect(() => {
    if (stockData?.close && stockData.close.length > 1) {
      setRealTimePrice(stockData.close[stockData.close.length - 1]);
      setPreviousClose(stockData.close[stockData.close.length - 2]);
    }
  }, [stockData]);

  const handlePeriodChange = async (newPeriod) => {
    setPeriod(newPeriod);
    try {
      setLoading(true);
      await dispatch(fetchStockData(stockSymbol, newPeriod));
      if (stockData?.close?.length > 1) {
        const periodReturn =
          ((stockData.close[stockData.close.length - 1] -
            stockData.close[0]) /
            stockData.close[0]) *
          100;
        setReturns((prevReturns) => ({
          ...prevReturns,
          [newPeriod]: periodReturn.toFixed(2),
        }));
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch stock data.");
      setLoading(false);
    }
  };

  const priceDifference =
   isValidTicker ? ( realTimePrice && previousClose
      ? (realTimePrice - previousClose).toFixed(2)
      : null) : "Invalid";

  const percentageChange =
    isValidTicker ?  (previousClose && realTimePrice
      ? (((realTimePrice - previousClose) / previousClose) * 100).toFixed(2)
      : null) : "Inavlid";

  if (!isLoggedin) {
    return <Navigate to="/" replace />;
  }


  return (
    <div
      className={`h-screen flex flex-col space-y-6 p-6 font-quicksand ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      {/* Header */}
      <header className="flex justify-between items-center">
        <Header_Stock />
        <Overview
          price={isValidTicker ? (realTimePrice ? `${realTimePrice.toFixed(2)}` : "Loading...") : 'Invalid'}
          change={
            priceDifference >= 0
              ? `+₹${priceDifference}`
              : `-₹${Math.abs(priceDifference)}`
          }
          percentageChange={
            percentageChange >= 0
              ? `+${percentageChange}%`
              : `${percentageChange}%`
          }
          currency={"INR"}
        />
      </header>

      {/* Content Section */}
      <div className="flex flex-1">
        {/* Buttons on the left */}
        <aside className="flex flex-col space-y-2 w-1/6">
          {["1d", "1mo", "6mo", "1y", "5y", "10y", "all"].map((periodLabel) => (
            <button
              key={periodLabel}
              className={`px-4 py-2 rounded ${
                period === periodLabel
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-200 text-gray-900"
              } hover:bg-blue-500 hover:text-white transition-all duration-200`}
              onClick={() => handlePeriodChange(periodLabel)}
            >
              {periodLabel.toUpperCase()}
              {returns[periodLabel] && (
                <span className="ml-2 text-sm">
                  {returns[periodLabel] >= 0 ? "+" : ""}
                  {returns[periodLabel]}%
                </span>
              )}
            </button>
          ))}
        </aside>

        {/* Chart in the center */}
        <main className="flex-1">
          {loading ? (
            <p>Loading chart...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ChartDisplay />
          )}
        </main>

      {periodLabel.toUpperCase()}
      {returns[periodLabel] ? (
        <span className="ml-2 text-sm">
          {returns[periodLabel] >= 0 ? "+" : ""}
          {returns[periodLabel]}%
        </span>
      ) : null}
    </button>
  ))}
</div> */}

        {/* Header row */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-between items-center">
          {/* Header on the left */}
          <div>
            <Header_Stock />
          </div>

          {/* Buttons on the right */}
          <div className="flex space-x-2">
            {["1d", "1mo", "6mo", "1y", "5y", "10y", "all"].map(
              (periodLabel) => (
                <button
                  key={periodLabel}
                  className={`px-4 py-2 rounded ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-200 text-gray-900"
                  } hover:bg-blue-500 hover:text-white transition-all duration-200`}
                  onClick={() => handlePeriodChange(periodLabel)}
                >
                  {periodLabel.toUpperCase()}
                  {returns[periodLabel] ? (
                    <span className="ml-2 text-sm">
                      {returns[periodLabel] >= 0 ? "+" : ""}
                      {returns[periodLabel]}%
                    </span>
                  ) : null}
                </button>
              )
            )}
          </div>
        </div>

        {/* Chart box */}
        <div className="md:col-span-2 row-span-4">
          <ChartDisplay />
          {/* <StockChart></StockChart> */}
        </div>

        {/* Overview box */}
        <div>
          <Overview
            price={realTimePrice ? `${realTimePrice.toFixed(2)}` : "Loading..."}
            change={
              priceDifference >= 0
                ? `+₹${priceDifference}`
                : `-₹${Math.abs(priceDifference)}`
            }
            percentageChange={
              percentageChange >= 0
                ? `+${percentageChange}%`
                : `${percentageChange}%`
            }
            currency={"INR"}
          ></Overview>
        </div>

        {/* Company details */}
        <div className="row-span-2 xl:row-span-3">
          <Details details={mockCompanyDetails}></Details>
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;
