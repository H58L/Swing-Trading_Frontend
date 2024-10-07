import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"; // Import your Home component
import Login from "./Login"; // Import your Login component
import Register from "./Register"; // Import your Register component
import "./App.css"; // Import your global CSS

const App = () => {
  return (
    <Router>
      <div className="App">
        {" "}
        {/* Wrap everything in the App class */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />;
        </Routes>
      </div>
    </Router>
  );
};

export default App;
