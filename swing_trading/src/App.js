import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home"; // Import your Home component
import Login from "./components/Login"; // Import your Login component
import Register from "./components/Register"; // Import your Register component
import "./App.css"; // Import your global CSS
import logo from "./logo.svg";
import "./App.css";
import ChartContainer from "./components/ChartContainer";

const App = () => {
  return (
    <Router>
      <div className="App">
        {" "}
        {/* Wrap everything in the App class */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chart" element={<ChartContainer />} />; //Change
          Register endpoint
        </Routes>
      </div>
    </Router>
  );
};

export default App;
