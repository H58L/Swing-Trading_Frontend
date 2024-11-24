import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./components/Home"; // Import your Home component
import Login from "./components/Login"; // Import your Login component
import Register from "./components/Register"; // Import your Register component
import "./App.css"; // Import your global CSS
import logo from "./logo.svg";
import "./App.css";
import ChartContainer from "./components/ChartContainer";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import ThemeContext from "./context/ThemeContext";
import StockContext from "./context/StockContext";
import StockData from "./components/StockData";
import { StockProvider } from "./context/StockContext";
import AlertForm from "./components/AlertForm";
import { LoginProvider, useLoginContext } from "./context/LoginContext";
import Header from "./components/Header";
import { EmailProvider } from "./context/EmailContext";
import Prediction from "./components/Prediction";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState(""); //state for theme,initliazed to false
  //const {isLoggedin, setIsLoggedIn} = useLoginContext();
  //const [email, setEmail] = useState("");

  return (
    // Theme COntext for swtiching between dark and light modes
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockProvider value={{ stockSymbol, setStockSymbol }}>
        <LoginProvider>
          <EmailProvider>
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
                  <Route path="/data" element={<StockData />} />
                  <Route path="/alertform" element={<AlertForm />} />
                  <Route path="/prediction" element={<Prediction />} />
                </Routes>
              </div>
            </Router>
          </EmailProvider>
        </LoginProvider>
      </StockProvider>
    </ThemeContext.Provider>
  );
};

export default App;
