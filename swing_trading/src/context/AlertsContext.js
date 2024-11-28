import React, { createContext, useState, useContext } from "react";

// Create context
const AlertsContext = createContext();

// Alerts Provider Component
export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([
    {
      title: "Welcome to ChartView!",
      description:
        "You’ve just joined a wonderful platform that will help you trade better.",
      timestamp: "2024-10-08T09:30:00",
    },
  ]);

  const addAlert = (newAlert) => {
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertsContext.Provider>
  );
};

// Custom hook for accessing alerts context
export const useAlertsContext = () => useContext(AlertsContext);
