import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useGoogleLogin } from "@react-oauth/google";
import "../style/Login.css";

const Login = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({}); // Track validation errors

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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <div
      className="
        bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center
        lg:justify-start lg:pl-16 login-page
      "
      style={{
        backgroundImage: `url('/bg3.jpg')`,
        height: "100vh", // Ensure height is set to the viewport
        padding: "0px",
        fontFamily: "'Poppins', sans-serif", // Apply Poppins font
      }}
    >
      <div className="login-container">
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "10px",
            fontFamily: "'Poppins', sans-serif", // Apply Poppins font here as well
          }}
        >
          <h1 className="text-center text-3xl font-semibold text-gray-700 mb-6">
            Sign in
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
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="form-checkbox text-blue-500"
              />
              <span className="text-gray-600 text-sm remember-me">
                Remember me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 hover:underline font-thin forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
            style={{ borderRadius: "40px" }} // Rounded corners
          >
            Sign in
          </button>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center">
              <hr className="w-1/3 border-gray-300" />
              <span className="px-2 text-sm text-gray-500 login-with">
                Or login with
              </span>
              <hr className="w-1/3 border-gray-300" />
            </div>

            <button
              className="mt-4 flex items-center justify-center w-full py-2 border border-gray-300 rounded-full transition duration-200 hover:bg-gray-100"
              onClick={() => login()}
              style={{ borderRadius: "40px" }} // Rounded corners
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
  );
};

export default Login;
