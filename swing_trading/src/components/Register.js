import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Register.css"; // Import CSS styles
import { useLoginContext } from "../context/LoginContext";
import { Navigate } from "react-router-dom"; // Use Navigate for redirection
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); // Track validation errors
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.{6,})/; // At least 6 characters and one number
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Validate email
    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email.";
    }

    // Validate password
    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (!validatePassword(password)) {
      validationErrors.password =
        "Password must be at least 6 characters long and contain at least one number.";
    }

    // Validate confirm password
    if (!confirmPassword) {
      validationErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // Send the registration data to the backend
    fetch(
      "https://swing-trading-backend-java-production.up.railway.app/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Display success message
      })
      .catch((error) => console.error("Error during registration:", error));
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url('/bg3.jpg')`,
        height: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-3xl font-semibold text-gray-700 mb-6">
            Register
          </h1>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              style={{ borderRadius: "40px" }} // Rounded corners
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              style={{ borderRadius: "40px" }} // Rounded corners
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              style={{ borderRadius: "40px" }} // Rounded corners
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
            style={{ borderRadius: "40px" }} // Rounded corners
          >
            Register
          </button>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
