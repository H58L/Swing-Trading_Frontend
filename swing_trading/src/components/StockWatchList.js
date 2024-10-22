import React from "react";
import ThemeContext from "../context/ThemeContex";
import { useContext } from "react";

const StockWatchlist = () => {
  const stocks = [
    {
      symbol: "AAPL",
      companyName: "Apple Inc.",
      price: 174.55,
      change: 1.23,
      percentageChange: 0.71,
      volume: 89014523,
      marketCap: "2.41T",
    },
    {
      symbol: "GOOGL",
      companyName: "Alphabet Inc.",
      price: 138.72,
      change: -0.98,
      percentageChange: -0.7,
      volume: 45612322,
      marketCap: "1.75T",
    },
    {
      symbol: "TSLA",
      companyName: "Tesla Inc.",
      price: 855.9,
      change: 15.45,
      percentageChange: 1.84,
      volume: 62341251,
      marketCap: "830B",
    },
    {
      symbol: "AMZN",
      companyName: "Amazon.com Inc.",
      price: 3311.37,
      change: 25.67,
      percentageChange: 0.78,
      volume: 25475124,
      marketCap: "1.67T",
    },
    {
      symbol: "MSFT",
      companyName: "Microsoft Corporation",
      price: 289.67,
      change: 3.56,
      percentageChange: 1.25,
      volume: 31715481,
      marketCap: "2.29T",
    },
  ];
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={`p-0 h-full w-full `}>
      <ul className={`h-full `}>
        {stocks.map((stock, index) => (
          <li
            key={index}
            className={`stock-item mb-3  rounded p-4 shadow-sm border border-gray-100 w-full ${
              darkMode ? "bg-gray-900 text-gray-100" : "bg-white"
            }`}
          >
            <div
              className={`flex justify-between items-center ${
                darkMode ? "bg-gray-900 text-gray-100" : "bg-white"
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold">{stock.companyName}</h3>
                <p
                  className={`text-left ${
                    darkMode ? "bg-gray-900 text-gray-100" : "bg-white"
                  }`}
                >
                  {stock.symbol}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-bold ${
                    stock.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${stock.price.toFixed(2)}
                </p>
                <p
                  className={`${
                    stock.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)} ({stock.percentageChange}%)
                </p>
              </div>
            </div>
            <div className="mt-2 flex justify-between text-gray-600">
              <p
                className={`${
                  darkMode ? "bg-gray-900 text-gray-100" : "bg-white"
                }`}
              >
                Volume: {stock.volume.toLocaleString()}
              </p>
              <p
                className={`${
                  darkMode ? "bg-gray-900 text-gray-100" : "bg-white"
                }`}
              >
                Market Cap: {stock.marketCap}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockWatchlist;
