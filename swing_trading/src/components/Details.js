
import React, { useContext } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContex";

const Details = ({ details }) => {
  const detailsList = {
    name: "Name",
    country: "Country",
    currency: "Currency",
    exchange: "Exchange",
    ipo: "IPO Date",
    marketCapitalization: "Market Capitalization",
    finnhubIndustry: "Industry",
  };

  const convertMillionToBillion = (number) => {
    return (number / 1000).toFixed(2);
  };

  const {darkMode} = useContext(ThemeContext);

  return (
    <Card>
      <ul className={`w-full h-full flex flex-col justify-between divide-y divide-gray-200
      ${darkMode ? "divide-gray-800" : null}`}>
        {Object.keys(detailsList).map((item) => {
          return (
            <li key={item} className="flex justify-between items-center py-2">
              <span>{detailsList[item]}</span>
              <span className="font-bold">
                {item === "marketCapitalization"
                  ? `${convertMillionToBillion(details[item])}B`
                  : details[item]}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;
