import React from "react";

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

  return (
    <div className="p-0 h-full w-full">
      <ul className="h-full border-gray-300">
        {stocks.map((stock, index) => (
          <li
            key={index}
            className="stock-item mb-3 bg-white rounded p-4 shadow-sm border border-gray-300 w-full"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{stock.companyName}</h3>
                <p className="text-gray-700">{stock.symbol}</p>
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
              <p>Volume: {stock.volume.toLocaleString()}</p>
              <p>Market Cap: {stock.marketCap}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockWatchlist;
