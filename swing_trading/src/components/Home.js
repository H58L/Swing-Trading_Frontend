import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "./Header";
import Footer from "./Footer";
import ChartContainer from "./ChartContainer";

const Home = () => {
  return (
    <div className="home-container">
      <Header></Header>
      <div className="navigation">
        {/* <Link to="/login" className="mr-4">
          Login
        </Link>
        <Link to="/register" className="mr-4">
          Register
        </Link> */}

        {/* Image with full width */}
        <img
          src="https://img.freepik.com/free-photo/3d-fantasy-scene_23-2151127998.jpg"
          alt="Fantasy Scene"
          className="w-screen h-auto" // Tailwind classes for full width
        />
        <ChartContainer></ChartContainer>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
