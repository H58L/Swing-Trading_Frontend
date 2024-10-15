import React from "react";
import Card from "./Card";
import Header from "./Header";
import Details from "./Details";
import { mockCompanyDetails } from "../constants/mock";
import ThemeIcon from "./ThemeIcon"; // import the ThemeIcon component
import Overview from "./Overview";
import Header_Stock from "./Header_Stock";
import Chart from "./Chart";
import ThemeContext from "../context/ThemeContex";
import { useContext} from "react";
import Search from "./Search";
import { useEffect, useState }from "react";
import StockContext from "../context/StockContext";
import { fetchQuote, fetchStockDetails } from "../api/stock-api";


const ChartContainer = () => {
  const {darkMode} = useContext(ThemeContext);
  const {stockSymbol} = useContext(StockContext);

  const [stockDetails, setStockDetails] = useState({});  //State to manage compnay details
  const [quote, setQuote ] = useState({}); //state to manage quote, ie the most recent price of the stock

  useEffect(() => {    //React hook that changes rendering each time stock symbol is changed
    const updateStockDetails = async() => {
      try {
          const result = await fetchStockDetails(stockSymbol);  //fetching stock details from API
          setStockDetails(result);
      }
      catch(error) {
        setStockDetails([]);
        console.log(error);
      }
    };

    const updateStockOverview = async() => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      }
      catch(error) {
        setQuote({});
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();

  }, [stockSymbol]);



  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 
    xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand relative
    ${darkMode ? "bg-gray-900 text-gray-300": "bg-neutral-100"}`}
    >
      {/* Removed absolute positioning from ThemeIcon and added relative to container */}

      {/* Header row */}
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header_Stock name={stockDetails.name}></Header_Stock>
        
      </div>

      {/* Chart box */}
      <div className="md:col-span-2 row-span-4">
        <Chart></Chart>
      </div>

      {/* Overview box */}
      <div>
        <Overview
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}
        ></Overview>
      </div>

      {/* Company details */}
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails}></Details>
      </div>
    </div>
  );
};

export default ChartContainer;
