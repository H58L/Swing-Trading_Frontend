import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "./Header";
import Footer from "./Footer";
import ChartContainer from "./ChartContainer";
import Counter from "./Counter";

const Home = () => {
  return (
    <div className="home-container">
      <Header></Header>
      <div className="navigation">
        <Counter />
        {/* <Link to="/login" className="mr-4">
          Login
        </Link>
        <Link to="/register" className="mr-4">
          Register
        </Link> */}

        {/* Image with full width from the public folder */}
        <img
          src={`${process.env.PUBLIC_URL}/Landing_Page_bg.jpg`}
          alt="Landing Page Background"
          className="w-screen h-auto" // Tailwind classes for full width
        />
        <ChartContainer></ChartContainer>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
