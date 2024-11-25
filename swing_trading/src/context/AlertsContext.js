import React, { createContext, useState, useContext } from "react";

// Create context
const AlertsContext = createContext();

// Alerts Provider Component
export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([
    {
      title: "Market Open",
      description: "The stock market has opened for trading.",
      timestamp: "2024-10-08T09:30:00",
    },
    {
      title: "New Price Target",
      description: "Analysts have raised the price target for XYZ stock.",
      timestamp: "2024-10-08T12:00:00",
    },
    // Add other initial alerts here
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
