import React, { useContext } from "react";
import Search from "./Search";
import ThemeIcon from "./ThemeIcon";
import { mockCompanyDetails } from "../constants/mock";
import StockContext from "../context/StockContext";

const Header_Stock = () => {
  const { stockSymbol } = useContext(StockContext);
  return (
    <>
      <div className="xl:px-32">
        <h1 className="text-5xl">{stockSymbol.toUpperCase()}</h1>
        {/* <Search></Search> */}
      </div>
      <ThemeIcon></ThemeIcon>
    </>
  );
};

export default Header_Stock;
