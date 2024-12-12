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
import { AlertsProvider } from "./context/AlertsContext";
import Admin from "./components/Admin";
import LandingPage from "./components/LandingPage"
import LoginDisplay from "./components/LoginDisplay"
import { ValidTickerProvider } from "./context/ValidTickerContext";
import LandingPage from "./components/LandingPage";
import LoginDisplay from "./components/LoginDisplay";

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
            <AlertsProvider>
            <ValidTickerProvider>
              <Router>
                <div className="App">
                  {" "}
                  {/* Wrap everything in the App class */}
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/chart" element={<ChartContainer />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/data" element={<StockData />} />
                    <Route path="/alertform" element={<AlertForm />} />
                    <Route path="/prediction" element={<Prediction />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </div>
              </Router>
            </ValidTickerProvider>
              
            </AlertsProvider>
          </EmailProvider>
        </LoginProvider>
      </StockProvider>
    </ThemeContext.Provider>
  );
};

export default App;
