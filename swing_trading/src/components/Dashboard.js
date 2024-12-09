import React from "react";
import Alerts from "./Alerts";
import StockWatchlist from "./StockWatchList";
import Header from "./Header";
import Chart from "./Chart";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
import ChartDisplay from "./ChartDisplay";
import StockWatchlistSearch from "./StockWatchlistSearch"
import { useLoginContext } from "../context/LoginContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
 const {isLoggedin} = useLoginContext();

  if (!isLoggedin) {
   
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <div
        className={`grid grid-cols-1 md:grid-cols-3 h-screen gap-2 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-200"
        }`}
      >
        <div className={`col-span-2 p-4 overflow-hidden `}>
          <ChartDisplay />
        </div>

        <div
          className={`p-4 bg-gray-200 overflow-y-auto ${
            darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-200"
          }`}
        >
          <Alerts />
        </div>
        <div
          className={`col-span-1 md:col-span-3 p-4 bg-gray-200 overflow-y-auto ${
            darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-200"
          }`}
        >
        <StockWatchlistSearch></StockWatchlistSearch>
          <StockWatchlist />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
