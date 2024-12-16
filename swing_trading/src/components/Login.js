import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import "../style/Login.css";
import { useLoginContext } from "../context/LoginContext";
import Header from "./Header";
import { useEmailContext } from "../context/EmailContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoggedin, setIsLoggedIn] = useState(false); //use login context
  //  const { isLoggedin, setIsLoggedIn } = useLoginContext();
  // const { userEmail, setUserEmail } = useEmailContext();

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  // Redirect on successful login, React is asynchronoues
  useEffect(() => {
    if (isLoggedin) {
      console.log("login", isLoggedin);
      console.log("email ", email);
    }
  }, [isLoggedin, email]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.{6,})/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    let validationErrors = {};
    if (!email) validationErrors.email = "Email is required.";
    else if (!validateEmail(email))
      validationErrors.email = "Please enter a valid email.";

    if (!password) validationErrors.password = "Password is required.";
    else if (!validatePassword(password))
      validationErrors.password =
        "Password must be at least 6 characters long and contain at least one number.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // Simulate API call
    fetch(
      "https://swing-trading-backend-java-production.up.railway.app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Successfully logged in!") {
          sessionStorage.setItem("isLoggedin", true); // Store isLoggedin in sessionStorage
          sessionStorage.setItem("userEmail", email);
          setIsLoggedIn(true); // Store email in sessionStorage
          navigate("/home"); // Navigate to home
        } else {
          setMessage(data.message || "Invalid credentials.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div>
      {/* <Header /> */}
      <div
        className="bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center login-page"
        style={{
          backgroundImage: `url('/bg3.jpg')`,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="login-container">
          <form onSubmit={handleSubmit} className="p-6">
            <h1 className="text-center text-3xl font-semibold text-gray-700 mb-6">
              Sign in
            </h1>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
                className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="form-checkbox text-blue-500"
                />
                <span className="text-gray-600 text-sm">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
            >
              Sign in
            </button>

            {message && (
              <p className="mt-4 text-center text-red-500">{message}</p>
            )}

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center">
                <hr className="w-1/3 border-gray-300" />
                <span className="px-2 text-sm text-gray-500">
                  Or login with
                </span>
                <hr className="w-1/3 border-gray-300" />
              </div>
              <button
                className="mt-4 flex items-center justify-center w-full py-2 border border-gray-300 rounded-full transition duration-200 hover:bg-gray-100"
                onClick={() => login()}
              >
                <img
                  className="h-6 w-6 mr-2"
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt="Google"
                />
                <span className="text-gray-600 text-sm font-bold">
                  Continue with Google
                </span>
              </button>
            </div>

            <p className="mt-4 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
