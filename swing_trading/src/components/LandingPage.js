import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "./Header";
import Footer from "./Footer";
import ChartContainer from "./ChartContainer";
import Counter from "./Counter";
import Login from "./Login";

const Home = () => {
  return (
    <div className="home-container">
      <div className="navigation">
        {/* <Header></Header> */}
        {/* <img
          src={`${process.env.PUBLIC_URL}/Landing_Page_bg.jpg`}
          alt="Landing Page Background"
          className="w-screen h-auto" // Tailwind classes for full width
        />
         */}
        <Login></Login>
        {/* <Footer></Footer> */}
      </div>
    </div>
  );
};

export default Home;
