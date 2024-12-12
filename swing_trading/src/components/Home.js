import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChartContainer from "./ChartContainer";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedIn] = useState(); // Initialize with null to avoid premature redirects

  // Retrieve isLoggedIn from sessionStorage on component mount
  useEffect(() => {
    const storedLoginStatus = sessionStorage.getItem("isLoggedin");
    if (storedLoginStatus) {
      setIsLoggedIn(storedLoginStatus === "true"); // Convert to boolean
    } else {
      setIsLoggedIn(false); // If no value in sessionStorage, assume not logged in
    }
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (isLoggedin === false) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  return (
    <div className="home-container">
      <Header />

      {/* Full-width background image */}
      <div className="image-container">
        <img
          src={`${process.env.PUBLIC_URL}/Landing_Page_bg.jpg`}
          alt="Landing Page Background"
          className="w-screen h-auto"
        />
      </div>

      <ChartContainer />

      <Footer />
    </div>
  );
};

export default Home;
