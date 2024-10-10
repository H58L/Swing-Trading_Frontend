// XXXXXXXXXXXXXXXXXXXXXXXXORIGINAL CODE///////////

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "../style/Header.css";
import Search from "./Search";
import Alerts from "./Alerts";
import ThemeContext from "../context/ThemeContex";
import ThemeIcon from "./ThemeIcon";

const Header = ({ name, isLoggedIn, onLogin, onLogout }) => {
  const [showAlerts, setShowAlerts] = useState(false);
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  
//FOr Dark Mode and Light Mode
  const {darkMode, setDarkMode} = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log(darkMode);
  }

  const [alerts] = useState([
    "New message from John",
    "Your profile was updated",
    "New friend request",
  ]);

  const handleBellClick = () => {
    setShowAlerts(!showAlerts);
  };

  // Function for login that redirects to /login
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="">
      <Navbar expand="lg" className="navbar-custom">
        <Container className="nav-container">
          <Navbar.Brand className="brand-link" href="/">
            TradingView
          </Navbar.Brand>

          <div className="d-none d-lg-flex ">
            <div className="xl:px-8">
              <h1 className="text-5xl">{name}</h1>
              <Search />
            </div>
          </div>

          <FaBell
            className="h-8 w-8 text-gray-700 mx-0 cursor-pointer"
            onClick={handleBellClick}
          />

          <div className="d-flex align-items-center">
            <NavDropdown
              title={
                <div className="flex items-center">
                  <FaUserCircle className="h-8 w-8 text-gray-700" />
                  <span className="sr-only">Profile Menu</span>
                </div>
              }
              id="profile-dropdown"
              align="end"
              className="dropdown-no-arrow"
            >
              {isLoggedIn ? (
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={handleLogin}>Login</NavDropdown.Item> // Use handleLogin for redirect
              )}
              
                {darkMode? (<NavDropdown.Item onClick={toggleDarkMode}>Light Mode</NavDropdown.Item>): 
                (<NavDropdown.Item onClick={toggleDarkMode}>Dark Mode</NavDropdown.Item>)}
              
             
            </NavDropdown>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="hamburger">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;


