import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
const ValidTickerContext = createContext();

// Create a provider component
export const ValidTickerProvider = ({ children }) => {
  const [isValidTicker, setIsValidTicker] = useState(true);

  return (
    <ValidTickerContext.Provider value={{ isValidTicker, setIsValidTicker }}>
      {children}
    </ValidTickerContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useValidTickerContext = () => useContext(ValidTickerContext);
