import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";
import axios from "axios";

const Alerts = () => {
  const { darkMode } = useContext(ThemeContext);
  const { isLoggedin } = useLoginContext();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [stockPrices, setStockPrices] = useState({}); // Stores real-time prices
  const [triggeredAlerts, setTriggeredAlerts] = useState([]); // Only triggered alerts

  // Retrieve email from sessionStorage on component mount
  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // Fetch user alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      if (isLoggedin && userEmail) {
        try {
          const response = await axios.get(
            `https://swing-trading-backend-java-production.up.railway.app/api/alerts/${userEmail}`
          );
          setAlerts(response.data);
        } catch (error) {
          console.error("Error fetching alerts:", error);
        }
      }
    };
    fetchAlerts();
  }, [isLoggedin, userEmail]);

  // Fetch real-time prices for all tickers every 60 seconds
  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        const prices = await Promise.all(
          alerts.map(async (alert) => {
            const response = await fetch(
              `https://swing-trading-backend-fdrx.vercel.app/api/stock?ticker=${alert.ticker}`
            );
            const data = await response.json();
            return {
              ticker: alert.ticker,
              price: data.close[data.close.length - 1],
            };
          })
        );

        const pricesMap = prices.reduce(
          (acc, curr) => ({ ...acc, [curr.ticker]: curr.price }),
          {}
        );
        setStockPrices(pricesMap);
      } catch (error) {
        console.error("Failed to fetch stock prices:", error);
      }
    };

    // Fetch prices initially and every 60 seconds
    fetchStockPrices();
    const interval = setInterval(fetchStockPrices, 60000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [alerts]);

  // Filter and update triggered alerts
  useEffect(() => {
    const checkConditions = () => {
      const triggered = alerts.filter((alert) => {
        const currentPrice = stockPrices[alert.ticker];
        if (currentPrice === undefined) return false;

        switch (alert.operator) {
          case ">":
            return currentPrice > alert.alertPrice;
          case "<":
            return currentPrice < alert.alertPrice;
          case ">=":
            return currentPrice >= alert.alertPrice;
          case "<=":
            return currentPrice <= alert.alertPrice;
          case "=":
            return currentPrice === alert.alertPrice;
          default:
            console.error("Unknown operator:", alert.operator);
            return false;
        }
      });
      setTriggeredAlerts(triggered);
    };

    checkConditions();
  }, [stockPrices, alerts]);

  const handleSetAlert = () => {
    if (!isLoggedin) {
      const confirmLogin = window.confirm(
        "You must log in to set an alert. Would you like to go to the login page?"
      );
      if (confirmLogin) {
        navigate("/login");
      }
      return;
    }
    navigate("/alertform");
  };

  return (
    <div className="p-0 h-full">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`text-lg font-bold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Triggered Alerts
        </div>
        <button
          className={`px-3 py-1 text-sm font-semibold rounded ${
            darkMode
              ? "bg-indigo-700 text-gray-200 hover:bg-purple-700"
              : "bg-gray-900 text-white hover:bg-blue-600"
          }`}
          onClick={handleSetAlert}
        >
          Set Alerts
        </button>
      </div>
      <ul className="h-full border-gray-300">
        {triggeredAlerts.length > 0 ? (
          triggeredAlerts.map((alert, index) => (
            <li
              key={index}
              className={`alert-item mb-3 rounded p-4 shadow-sm border border-gray-100 w-full ${
                darkMode ? "bg-gray-900 text-gray-100" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold">{alert.ticker}</h3>
              <p
                className={`text-sm ${
                  darkMode ? "bg-gray-900 text-gray-200" : "bg-white"
                }`}
              >
                {alert.operator} {alert.alertPrice}
              </p>
              <p className="text-sm">
                Real-time Price: {stockPrices[alert.ticker]}
              </p>
              <span
                className={`text-sm ${
                  darkMode
                    ? "bg-gray-900 text-gray-500"
                    : "bg-white text-gray-400"
                }`}
              >
                {new Date(alert.createdAt).toLocaleString()}
              </span>
            </li>
          ))
        ) : (
          <p className={darkMode ? "text-gray-200" : "text-gray-800"}>
            No triggered alerts found.
          </p>
        )}
      </ul>
    </div>
  );
};

export default Alerts;
