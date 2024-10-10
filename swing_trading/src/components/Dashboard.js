import React from "react";
import ChartContainer from "./ChartContainer";
import Alerts from "./Alerts";
import StockWatchlist from "./StockWatchList";
import "../style/Dashboard.css"; // CSS styles
import Header from "./Header";
import Chart from "./Chart";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="chart-container">
          <Chart />
        </div>
        <div className="alerts-sidebar">
          <Alerts />
        </div>
        <div className="stock-watchlist">
          <StockWatchlist />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
