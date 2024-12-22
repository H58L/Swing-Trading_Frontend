import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ChartControls = ({
  symbol,
  setSymbol,
  period,
  setPeriod,
  selectedModel,
  setSelectedModel,
}) => {
  const { darkMode } = useContext(ThemeContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputSymbol = event.target.elements.stockSymbol.value
      .trim()
      .toUpperCase();
    if (inputSymbol) {
      setSymbol(inputSymbol);
    }
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-5">
        <label
          htmlFor="stockSymbol"
          className={`mr-3 ${darkMode ? "text-gray-200" : "text-gray-800"}`}
        >
          Enter Stock Symbol:
        </label>
        <input
          type="text"
          id="stockSymbol"
          name="stockSymbol"
          placeholder="e.g., RECLTD.NS"
          className={`p-2 border rounded-md mr-3 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-gray-100 text-black border-gray-300"
          }`}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Load Chart
        </button>
      </form>

      <div className="mb-5">
        <label
          htmlFor="period"
          className={`mr-3 ${darkMode ? "text-gray-200" : "text-gray-800"}`}
        >
          Select Period:
        </label>
        <select
          id="period"
          value={period}
          onChange={handlePeriodChange}
          className={`p-2 border rounded-md ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-gray-100 text-black border-gray-300"
          }`}
        >
          <option value="1mo">1 Month</option>
          <option value="6mo">6 Months</option>
          <option value="1y">1 Year</option>
          <option value="2y">2 Years</option>
          <option value="5y">5 Years</option>
          <option value="10y">10 Years</option>
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="model-select"
          className={`mr-3 ${darkMode ? "text-gray-200" : "text-gray-800"}`}
        >
          Select Model:
        </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          className={`p-2 border rounded-md ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-gray-100 text-black border-gray-300"
          }`}
        >
          <option value="RNN">RNN</option>
          <option value="LSTM">LSTM</option>
        </select>
      </div>
    </div>
  );
};

export default ChartControls;
