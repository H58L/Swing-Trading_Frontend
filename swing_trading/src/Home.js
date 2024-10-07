import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Application</h1>
      <p>This is the home page. You can log in or register from here.</p>
      <div className="navigation">
        <Link to="/login">Login</Link> {/* Use Link instead of anchor tags */}
        <Link to="/register">Register</Link>{" "}
        {/* Use Link instead of anchor tags */}
      </div>
    </div>
  );
};

export default Home;
