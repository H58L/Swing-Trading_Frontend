import React from "react";
import Card from "./Card";

const Overview = ({ symbol, price, change, percentageChange, currency }) => {
  // Convert percentageChange to a number for comparison
  const percentage = parseFloat(percentageChange);

  return (
    <Card>
      <div className="w-full h-full flex items-center justify-around">
        <span className="text-2xl xl:text-4xl 2xl:text-5xl flex items-center">
          ₹{price}
        </span>
        <span className="text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2">
          {currency}
        </span>
        <span
          className={`text-lg xl:text-xl 2xl:text-2xl ${
            percentage >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change} <span>({percentageChange})</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
