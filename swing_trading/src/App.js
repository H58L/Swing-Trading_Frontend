import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home"; // Import your Home component
import Login from "./components/Login"; // Import your Login component
import Register from "./components/Register"; // Import your Register component
import "./App.css"; // Import your global CSS
import logo from "./logo.svg";
import "./App.css";
import ChartContainer from "./components/ChartContainer";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import ThemeContext from "./context/ThemeContex";
import StockContext from "./context/StockContext";

const App = () => {

  const [darkMode, setDarkMode] = useState(false); //state for theme,initliazed to false
  const[stockSymbol, setStockSymbol] = useState("FB");

  return (
    // Theme COntext for swtiching between dark and light modes
    <ThemeContext.Provider value={{darkMode, setDarkMode}}> 
       <StockContext.Provider value = {{stockSymbol, setStockSymbol}}>
        <Router>
      <div className="App">
        {" "}
        {/* Wrap everything in the App class */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chart" element={<ChartContainer />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
       </StockContext.Provider>
      
    </ThemeContext.Provider>
    
  );
};

export default App;
