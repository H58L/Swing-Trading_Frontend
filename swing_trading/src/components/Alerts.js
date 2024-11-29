import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";
import { useEmailContext } from "../context/EmailContext";
import axios from "axios";

const Alerts = () => {
  const { darkMode } = useContext(ThemeContext);
  const { isLoggedin } = useLoginContext();
  const navigate = useNavigate();
  // const { userEmail } = useEmailContext();
  const [userEmail, setUserEmail] = useState(""); // State for user email

  const [alerts, setAlerts] = useState([]);

  // Retrieve email from sessionStorage on component mount
  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (isLoggedin && userEmail) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/alerts/${userEmail}`
          );
          setAlerts(response.data);
        } catch (error) {
          console.error("Error fetching alerts:", error);
        }
      }
    };
    fetchAlerts();
  }, [isLoggedin, userEmail]);

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
          Your Alerts
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
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
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
            No alerts found.
          </p>
        )}
      </ul>
    </div>
  );
};

export default Alerts;
