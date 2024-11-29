import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import ThemeContext from "../context/ThemeContext";
import SupportResistanceTable from "./SupportResistanceTable";
import { useAlertsContext } from "../context/AlertsContext";
import { useEmailContext } from "../context/EmailContext";

const AlertForm = () => {
  const { darkMode } = useContext(ThemeContext);
  const { addAlert } = useAlertsContext(); // Use the alerts context
  // const { userEmail, setUserEmail } = useEmailContext();
  // const userEmail = sessionStorage.getItem("userEmail"); // Retrieve email from sessionStorage
  const [userEmail, setUserEmail] = useState(""); // State for user email

  const [formData, setFormData] = useState({
    ticker: "",
    currentPrice: "",
    operator: ">=",
    alertPrice: "",
  });
  const [latestPrice, setLatestPrice] = useState(null);
  const [supportResistanceData, setSupportResistanceData] = useState([]);
  const [pivotPoint, setPivotPoint] = useState(null);

  // Retrieve email from sessionStorage on component mount
  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchStockData(formData.ticker);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAlert = {
      emailId: userEmail, // Add email to the alert object
      ticker: formData.ticker,
      // currentPrice: parseFloat(formData.currentPrice),
      operator: formData.operator,
      alertPrice: parseFloat(formData.alertPrice),
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:8080/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token if required
        },
        body: JSON.stringify(newAlert),
      });

      if (response.ok) {
        console.log("Alert created successfully");
      } else {
        console.error("Failed to create alert:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating alert:", error);
    }

    addAlert({
      title: `Alert for ${formData.ticker}`,
      description: `Trigger when ${formData.ticker} is ${formData.operator} ${formData.alertPrice}`,
      timestamp: new Date().toISOString(),
    });

    setFormData({
      ticker: "",
      // currentPrice: "",
      operator: ">=",
      alertPrice: "",
    });
  };

  const fetchStockData = async (symbol) => {
    if (!symbol) return;

    try {
      // Fetch the latest stock price
      const priceResponse = await fetch(
        `https://swing-trading-backend-fdrx.vercel.app/api/stock?ticker=${symbol}`
      );
      const priceData = await priceResponse.json();

      if (!priceData.error) {
        const price = priceData.close[priceData.close.length - 1];
        setLatestPrice(price);
        setFormData((prevData) => ({
          ...prevData,
          currentPrice: price,
        }));
      }

      // Fetch support and resistance data
      const srResponse = await fetch(
        `https://swing-trading-backend-fdrx.vercel.app/api/support?ticker=${symbol}`
      );
      const srData = await srResponse.json();

      if (!srData.error) {
        setPivotPoint(srData.pivot_point);
        setSupportResistanceData(
          srData.supports.map((support, index) => ({
            resistance: srData.resistances[index],
            support: support,
          }))
        );
      }
    } catch (error) {
      console.error(
        "Failed to fetch stock or support/resistance data for:",
        symbol
      );
    }
  };

  return (
    <>
      <Header />
      <div
        className={`min-h-screen py-8 px-4 flex flex-col items-center ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        <h2
          className={`text-3xl font-extrabold mb-8 ${
            darkMode ? "text-indigo-400" : "text-gray-800"
          }`}
        >
          Alert Conditions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className={`p-6 rounded-lg shadow-lg ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-300"
            }`}
          >
            <h3 className="text-xl font-semibold mb-6">Set Alert</h3>

            <div className="mb-4">
              <label htmlFor="ticker" className="block font-medium mb-2">
                Stock Ticker
              </label>
              <input
                type="text"
                id="ticker"
                name="ticker"
                value={formData.ticker}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={`w-full p-3 border rounded focus:outline-none ${
                  darkMode
                    ? "border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400"
                    : "border-gray-300 text-gray-900"
                }`}
                placeholder="Enter stock ticker"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="currentPrice" className="block font-medium mb-2">
                Current Price
              </label>
              <input
                type="number"
                id="currentPrice"
                name="currentPrice"
                value={formData.currentPrice}
                readOnly
                className={`w-full p-3 border rounded ${
                  darkMode
                    ? "border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400"
                    : "border-gray-300 text-gray-900"
                }`}
                placeholder={
                  latestPrice ? latestPrice : "Press Enter to fetch price"
                }
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="alertPrice" className="block font-medium mb-2">
                Alert Price
              </label>
              <input
                type="number"
                id="alertPrice"
                name="alertPrice"
                value={formData.alertPrice}
                onChange={handleChange}
                className={`w-full p-3 border rounded focus:outline-none ${
                  darkMode
                    ? "border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400"
                    : "border-gray-300 text-gray-900"
                }`}
                placeholder="Set alert price"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="operator" className="block font-medium mb-2">
                Operator
              </label>
              <select
                id="operator"
                name="operator"
                value={formData.operator}
                onChange={handleChange}
                className={`w-full p-3 border rounded focus:outline-none ${
                  darkMode
                    ? "border-gray-700 bg-gray-700 text-gray-100"
                    : "border-gray-300 text-gray-900"
                }`}
              >
                <option value=">=">&#8805; Greater than or equal to</option>
                <option value="<=">&#8804; Less than or equal to</option>
                <option value="=">= Equal to</option>
                <option value=">">&gt; Greater than</option>
                <option value="<">&lt; Less than</option>
              </select>
            </div>

            <button
              type="submit"
              className={`w-full py-3 font-medium rounded-lg focus:outline-none ${
                darkMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Submit
            </button>
          </form>

          {/* Support and Resistance Table */}
          <SupportResistanceTable
            data={supportResistanceData}
            darkMode={darkMode}
            pivotPoint={pivotPoint}
          />
        </div>
      </div>
    </>
  );
};

export default AlertForm;
