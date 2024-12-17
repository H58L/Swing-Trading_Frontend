import React, { useContext } from "react";
import Search from "./Search";
import ThemeIcon from "./ThemeIcon";
import { mockCompanyDetails } from "../constants/mock";
import StockContext from "../context/StockContext";
import { useValidTickerContext } from "../context/ValidTickerContext";


const Header_Stock = () => {
  const { stockSymbol } = useContext(StockContext);
  const {isValidTicker} = useValidTickerContext();
  return (
    <>
      <div className="xl:px-32">
        <h1 className="text-5xl">{isValidTicker ? stockSymbol.toUpperCase() : 'Invalid Ticker'}</h1>
        {/* <Search></Search> */}
      </div>
      <ThemeIcon></ThemeIcon>
    </>
  );
};

export default Header_Stock;
