// //sets the context of the stock

// import React from "react";

// const StockContext = React.createContext();

// export default StockContext;

// StockContext.js
import { createContext, useState } from "react";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stockSymbol, setStockSymbol] = useState("RECLTD.NS");  // Empty initially

  return (
    <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockContext;
