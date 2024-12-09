// XXXXX CODE WITH for dispaying users email Id XXXXXXXXXXXXXXXXXXXX
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "../style/Header.css";
import Search from "./Search";
import Alerts from "./Alerts";
import ThemeContext from "../context/ThemeContext";
import ThemeIcon from "./ThemeIcon";
import { useLoginContext } from "../context/LoginContext";
import { useEmailContext } from "../context/EmailContext";
import { useEffect } from "react";
//import { useState } from "react";

const Header = ({ name, onLogin, onLogout }) => {
  const [showAlerts, setShowAlerts] = useState(false);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { isLoggedin, setIsLoggedIn } = useLoginContext();
  // const { userEmail, setUserEmail } = useEmailContext();
  // const userEmail = sessionStorage.getItem("userEmail"); // Retrieve email from sessionStorage
  const [userEmail, setUserEmail] = useState("");

  console.log("Header email: ", userEmail);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log(darkMode);
  };

  const [alerts] = useState([
    "New message from John",
    "Your profile was updated",
    "New friend request",
  ]);

  const handleBellClick = () => {
    setShowAlerts(!showAlerts);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    // Sync login state and email from sessionStorage
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    sessionStorage.removeItem("userEmail");
    navigate("/");
  };

  useEffect(() => {
    //monitors chanege in userEmail or isLoggedin, used for logout
    if (loggedOut && !isLoggedin) {
      console.log(isLoggedin);
      console.log(userEmail);
      console.log(loggedOut);
      navigate("/");
    }
  }, [isLoggedin, navigate, userEmail, loggedOut]);

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handlePredicition = () => {
    navigate("/prediction");
  };

  const handleData = () => {
    navigate("/data");
  };

  const handleChart = () => {
    navigate("/chart");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar-custom">
        <Container className="nav-container">
          <Navbar.Brand onClick={handleHome} className="brand-link">
            ChartView
          </Navbar.Brand>

          <div className="d-none d-lg-flex">
            <div className="xl:px-8">
              <h1 className="text-5xl">{name}</h1>
              <Search />
            </div>
          </div>

          <div className="d-flex align-items-center">
            {/* Display user email when logged in */}
            {isLoggedin && (
              <span className="user-email text-sm text-white-700 me-3">
                Logged in as: {userEmail}
              </span>
            )}
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
              {isLoggedin ? (
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={handleLogin}>Login</NavDropdown.Item>
              )}

              {darkMode ? (
                <NavDropdown.Item onClick={toggleDarkMode}>
                  Light Mode
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={toggleDarkMode}>
                  Dark Mode
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="hamburger">
              <Nav.Link onClick={handlePredicition}>Prediction</Nav.Link>
              <Nav.Link onClick={handleData}>Data</Nav.Link>
              <Nav.Link onClick={handleDashboard}>Dashboard</Nav.Link>
              <Nav.Link onClick={handleChart}>Chart</Nav.Link>
              {/* <Nav.Link onClick={handleAdmin}>Admin</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
