// import React, { useState, useEffect } from "react";
// import ThemeContext from "../context/ThemeContext";
// import { useContext } from "react";
// import { FaPlus } from "react-icons/fa"; // Icon
// import axios from "axios";
// import { useLoginContext } from "../context/LoginContext";


// const StockWatchlist = () => {
//   const { darkMode } = useContext(ThemeContext);
//   const { isLoggedin } = useLoginContext();
//   const [userEmail, setUserEmail] = useState(""); 

//   const [stocks, setStocks] = useState([  //fetch this data from the databse
//     {
//       symbol: "RELIANCE.NS",
//       companyName: "Reliance Industries",
//       price: null,
//       change: null,
//       percentageChange: null,
//       volume: null,
//       marketCap: null,
//     },
//     {
//       symbol: "TCS.NS",
//       companyName: "Tata Consultancy Services",
//       price: null,
//       change: null,
//       percentageChange: null,
//       volume: null,
//       marketCap: null,
//     },
//     {
//       symbol: "INFY.NS",
//       companyName: "Infosys",
//       price: null,
//       change: null,
//       percentageChange: null,
//       volume: null,
//       marketCap: null,
//     },
//   ]);

  
//   // Retrieve email from sessionStorage on component mount
//   useEffect(() => {
//     const email = sessionStorage.getItem("userEmail");
//     if (email) {
//       setUserEmail(email);
//     }
//   }, []);

//   console.log("IsL= Loogedin "+isLoggedin);
//   console.log("Useremail"+userEmail);
//   useEffect(() => {
//     const fetchWatchlist = async () => {
//       if (isLoggedin && userEmail) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8080/api/watchlist/${userEmail}`
//           );
          
//           console.log("Fetch wathclist frontend: "+response);

          
//         } catch (error) {
//           console.error("Error fetching watchlist:", error);
//         }
//       }
//     };
//     fetchWatchlist();
//   }, [isLoggedin, userEmail]);

//   useEffect(() => {
//     const fetchStockData = async (symbol) => {
//       try {
//         const response = await fetch(
//           // `http://127.0.0.1:5000/api/stock?ticker=${symbol}`
//           `https://swing-trading-backend-fdrx.vercel.app/api/stock?ticker=${symbol}`
//         );
//         const data = await response.json();

//         if (!data.error) {
//           return {
//             price: data.close[data.close.length - 1],
//             volume: data.volume[data.volume.length - 1],
//             change: (
//               data.close[data.close.length - 1] -
//               data.close[data.close.length - 2]
//             ).toFixed(2),
//             percentageChange: (
//               ((data.close[data.close.length - 1] -
//                 data.close[data.close.length - 2]) /
//                 data.close[data.close.length - 2]) *
//               100
//             ).toFixed(2),
//           };
//         }
//         return null;
//       } catch (error) {
//         console.error("Failed to fetch stock data for:", symbol);
//         return null;
//       }
//     };

//     const updateStockData = async () => {
//       const updatedStocks = await Promise.all(
//         stocks.map(async (stock) => {
//           const updatedData = await fetchStockData(stock.symbol);
//           return updatedData ? { ...stock, ...updatedData } : stock;
//         })
//       );
//       setStocks(updatedStocks);
//     };

//     // Fetch data initially
//     updateStockData();

//     // Set up interval to fetch data every 60 seconds
//     const intervalId = setInterval(() => {
//       updateStockData();
//     }, 30000); // 60000 ms = 60 seconds

//     // Cleanup the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   // const handleAddToWatchlist = (stock) => {
//   //   console.log("Adding to watchlist:", stock);
//   //   console.log("Hello Lisa");
//   // };

//   return (
//     <div className="p-0 h-full w-full">
//       <ul className="h-full">
//         {stocks.map((stock, index) => (
//           <li
//             key={index}
//             className={`stock-item mb-3 rounded p-4 shadow-sm border border-gray-100 w-full ${
//               darkMode ? "bg-gray-900 text-gray-100" : "bg-white"
//             }`}
//           >
//             <div className="flex items-center">
//               <button
//                 className="m-1 p-1"
//                 // onClick={() => handleAddToWatchlist(stock)}
//               >
//                 <FaPlus className="text-xl text-gray-600 hover:text-gray-900" />
//               </button>
//               <div className="text-left ml-2">
//                 <h3 className="text-lg font-semibold">{stock.companyName}</h3>
//                 <p>{stock.symbol}</p>
//               </div>
//               <div className="ml-auto text-right">
//                 <p
//                   className={`text-lg font-bold ${
//                     stock.change >= 0 ? "text-green-500" : "text-red-500"
//                   }`}
//                 >
//                   ₹{stock.price ? stock.price.toFixed(2) : "Loading..."}
//                 </p>
//                 <p
//                   className={`text-sm ${
//                     stock.change >= 0 ? "text-green-500" : "text-red-500"
//                   }`}
//                 >
//                   {stock.change >= 0 ? "+" : ""}
//                   {stock.change} ({stock.percentageChange}%)
//                 </p>
//                 <p
//                   className={`text-xs ${
//                     darkMode ? "text-gray-300" : "text-gray-600"
//                   }`}
//                 >
//                   Volume: {stock.volume}
//                 </p>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StockWatchlist;


// // CHATGPT  WITH MY MODIDFCATION

// import React, { useState, useEffect } from "react";
// import ThemeContext from "../context/ThemeContext";
// import { useContext } from "react";
// import { FaPlus } from "react-icons/fa"; // Icon
// import axios from "axios";
// import { useLoginContext } from "../context/LoginContext";


// const StockWatchlist = () => {
//   const { darkMode } = useContext(ThemeContext);
//   const { isLoggedin } = useLoginContext();
//   const [userEmail, setUserEmail] = useState(""); 

//   const [stocks, setStocks] = useState([  //fetch this data from the databse
//     // {
//     //   symbol: "RELIANCE.NS",
//     //   companyName: "Reliance Industries",
//     //   price: null,
//     //   change: null,
//     //   percentageChange: null,
//     //   volume: null,
//     //   marketCap: null,
//     // },
//     // {
//     //   symbol: "TCS.NS",
//     //   companyName: "Tata Consultancy Services",
//     //   price: null,
//     //   change: null,
//     //   percentageChange: null,
//     //   volume: null,
//     //   marketCap: null,
//     // },
//     // {
//     //   symbol: "INFY.NS",
//     //   companyName: "Infosys",
//     //   price: null,
//     //   change: null,
//     //   percentageChange: null,
//     //   volume: null,
//     //   marketCap: null,
//     // },
//   ]);

  
//   // Retrieve email from sessionStorage on component mount
//   useEffect(() => {
//     const email = sessionStorage.getItem("userEmail");
//     if (email) {
//       setUserEmail(email);
//     }
//   }, []);

//   console.log("IsL= Loogedin "+isLoggedin);
//   console.log("Useremail"+userEmail);
//   useEffect(() => {
//     const fetchWatchlist = async () => {
//       if (isLoggedin && userEmail) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8080/api/watchlist/${userEmail}`
//           );
          
//           console.log("Fetch wathclist frontend: "+response);
//           const watchlistData = response.data.map((item) => ({
//             symbol: item.ticker, // Map `ticker` to `symbol`
//             companyName: "", // Placeholder for company name (optional)
//             price: null,
//             change: null,
//             percentageChange: null,
//             volume: null,
//             marketCap: null,
//           }));
//           setStocks(watchlistData);
//           console.log("Stokcs:"+stocks);
          
//         } catch (error) {
//           console.error("Error fetching watchlist:", error);
//         }
//       }
//     };
//     fetchWatchlist();
//   }, [isLoggedin, userEmail]);

//   useEffect(() => {
//     const fetchStockData = async (symbol) => {
//       try {
//         const response = await fetch(
//           // `http://127.0.0.1:5000/api/stock?ticker=${symbol}`
//           `https://swing-trading-backend-fdrx.vercel.app/api/stock?ticker=${symbol}`
//         );
//         const data = await response.json();

//         if (!data.error) {
//           return {
//             price: data.close[data.close.length - 1],
//             volume: data.volume[data.volume.length - 1],
//             change: (
//               data.close[data.close.length - 1] -
//               data.close[data.close.length - 2]
//             ).toFixed(2),
//             percentageChange: (
//               ((data.close[data.close.length - 1] -
//                 data.close[data.close.length - 2]) /
//                 data.close[data.close.length - 2]) *
//               100
//             ).toFixed(2),
//           };
//         }
//         return null;
//       } catch (error) {
//         console.error("Failed to fetch stock data for:", symbol);
//         return null;
//       }
//     };

//     const updateStockData = async () => {
//       const updatedStocks = await Promise.all(
//         stocks.map(async (stock) => {
//           const updatedData = await fetchStockData(stock.symbol);
//           return updatedData ? { ...stock, ...updatedData } : stock;
//         })
//       );
//       setStocks(updatedStocks);
//     };

//     // Fetch data initially
//     updateStockData();

//     // Set up interval to fetch data every 60 seconds
//     const intervalId = setInterval(() => {
//       updateStockData();
//     }, 30000); // 60000 ms = 60 seconds

//     // Cleanup the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   // const handleAddToWatchlist = (stock) => {
//   //   console.log("Adding to watchlist:", stock);
//   //   console.log("Hello Lisa");
//   // };

//   return (
//     <div className="p-0 h-full w-full">
//       <ul className="h-full">
//         {stocks.map((stock, index) => (
//           <li
//             key={index}
//             className={`stock-item mb-3 rounded p-4 shadow-sm border border-gray-100 w-full ${
//               darkMode ? "bg-gray-900 text-gray-100" : "bg-white"
//             }`}
//           >
//             <div className="flex items-center">
//               <button
//                 className="m-1 p-1"
//                 // onClick={() => handleAddToWatchlist(stock)}
//               >
//                 <FaPlus className="text-xl text-gray-600 hover:text-gray-900" />
//               </button>
//               <div className="text-left ml-2">
//                 <h3 className="text-lg font-semibold">{stock.companyName}</h3>
//                 <p>{stock.symbol}</p>
//               </div>
//               <div className="ml-auto text-right">
//                 <p
//                   className={`text-lg font-bold ${
//                     stock.change >= 0 ? "text-green-500" : "text-red-500"
//                   }`}
//                 >
//                   ₹{stock.price ? stock.price.toFixed(2) : "Loading..."}
//                 </p>
//                 <p
//                   className={`text-sm ${
//                     stock.change >= 0 ? "text-green-500" : "text-red-500"
//                   }`}
//                 >
//                   {stock.change >= 0 ? "+" : ""}
//                   {stock.change} ({stock.percentageChange}%)
//                 </p>
//                 <p
//                   className={`text-xs ${
//                     darkMode ? "text-gray-300" : "text-gray-600"
//                   }`}
//                 >
//                   Volume: {stock.volume}
//                 </p>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StockWatchlist;


// CHATGPT  

// 


import React, { useState, useEffect } from "react";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import { FaPlus } from "react-icons/fa"; // Icon
import axios from "axios";
import { useLoginContext } from "../context/LoginContext";

const StockWatchlist = () => {
  const { darkMode } = useContext(ThemeContext);
  const { isLoggedin } = useLoginContext();
  const [userEmail, setUserEmail] = useState("");
  const [stocks, setStocks] = useState([]);
  const [stockData, setStockData] = useState([]);

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
            `http://localhost:8080/api/watchlist/${userEmail}`
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
            return { ...stock, price: null, volume: null, change: null, percentageChange: null };
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

  return (
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
                <FaPlus className="text-xl text-gray-600 hover:text-gray-900" />
              </button>
              <div className="text-left ml-2">
                <h3 className="text-lg font-semibold">{stock.symbol || "Unknown Company"}</h3>
                {/* <p>{stock.symbol}</p> */}
              </div>
              <div className="ml-auto text-right">
                <p
                  className={`text-lg font-bold ${
                    stock.change >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  ₹{stock.price !== null ? stock.price.toFixed(2) : "Loading..."}
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
  );
};

export default StockWatchlist;
