import React, { useState, useContext } from "react";
import RNN_Chart from "./RNN_Charts"; // RNN chart component
import LSTM_Chart from "./LSTM_Charts"; // LSTM chart component
import ChartControls from "./ChartControls"; // Chart controls component
import Header from "./Header";
import ThemeContext from "../context/ThemeContext";

const Prediction = () => {
  const [symbol, setSymbol] = useState("RECLTD.NS"); // State for stock symbol
  const [period, setPeriod] = useState("5y"); // State for period selection
  const [selectedModel, setSelectedModel] = useState("RNN"); // Default model is RNN
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
      style={{ height: "100vw" }}
    >
      <div>
        <Header />

        {/* Render ChartControls */}
        <ChartControls
          symbol={symbol}
          setSymbol={setSymbol}
          period={period}
          setPeriod={setPeriod}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        {/* Render the selected chart */}
        {selectedModel === "RNN" ? (
          // eslint-disable-next-line react/jsx-pascal-case
          <RNN_Chart symbol={symbol} period={period} />
        ) : (
          // eslint-disable-next-line react/jsx-pascal-case
          <LSTM_Chart symbol={symbol} period={period} />
        )}
      </div>
    </div>
  );
};

export default Prediction;
