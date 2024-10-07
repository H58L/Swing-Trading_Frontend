import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { GoogleLogin } from "@react-oauth/google";
import "../style/Login.css"; // Import your CSS file for styling
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({}); // Track validation errors

  const validateEmail = (email) => {
    // Basic email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password should be at least 6 characters and contain at least one number
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
      // If there are errors, update the state and stop form submission
      setErrors(validationErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Handle successful login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);

    // You can also add further logic such as sending the data to your backend API
  };

  return (
    <div className="login-page">
      <div className="image-container"></div>

      <div className="login-container">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <div className="remember-forgot-container">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label>Remember me</label>
            </div>
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </div>

          <button type="submit" className="sign-in-button">
            Sign in
          </button>

          <div className="login-with">
            <div className="login-divider">
              <hr />
              <span>Or login with</span>
              <hr />
            </div>
            <button className="google-button" onClick={() => login()}>
              <img
                className="google-logo"
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt=""
              />
              <h3>Continue With Google</h3>
            </button>
            {/* <GoogleLogin
              className="google-button"
              onSuccess={(credentialResponse) => {
                const credentialResponseDecoded = jwtDecode(
                  credentialResponse.credential
                );
                console.log(credentialResponseDecoded);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            /> */}
          </div>
          <p className="sign-up-link">
            Don’t have an account? <Link to="/register">Register Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
