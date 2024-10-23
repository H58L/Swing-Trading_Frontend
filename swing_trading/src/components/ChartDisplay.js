import React from "react";
import Plot from "react-plotly.js";

const ChartDisplay = ({ chartTitle, chartType, candlestickData, lineChartData, darkMode }) => {
  return (
    <div
      className={`rounded-lg p-4 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <h2
        className={`text-2xl font-semibold text-center mb-4 ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        {chartTitle}
      </h2>
      {chartType === "candlestick" ? (
        <Plot
          data={candlestickData}
          layout={{
            title: {
              text: chartTitle,
              font: { color: darkMode ? "white" : "black" }, // Set title color based on darkMode
            },
            xaxis: { title: "Date", color: darkMode ? "white" : "black" },
            yaxis: {
              title: "Price (INR)",
              color: darkMode ? "white" : "black",
            },
            dragmode: "zoom",
            plot_bgcolor: darkMode ? "#1F2937" : "#F9FAFB",
            paper_bgcolor: darkMode ? "#1F2937" : "#F9FAFB",
          }}
          style={{ width: "100%", height: "500px" }}
        />
      ) : (
        <Plot
          data={lineChartData}
          layout={{
            title: {
              text: chartTitle,
              font: { color: darkMode ? "white" : "black" }, // Set title color based on darkMode
            },
            xaxis: { title: "Date", color: darkMode ? "white" : "black" },
            yaxis: {
              title: "Price (INR)",
              color: darkMode ? "white" : "black",
            },
            dragmode: "zoom",
            plot_bgcolor: darkMode ? "#1F2937" : "#F9FAFB",
            paper_bgcolor: darkMode ? "#1F2937" : "#F9FAFB",
          }}
          style={{ width: "100%", height: "500px" }}
        />
      )}
    </div>
  );
};

export default ChartDisplay;
