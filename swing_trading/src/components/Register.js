import React, { useState } from "react";
import "../style/Register.css"; // Import your CSS file for styling

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="login-page">
      <div className="image-container"></div>

      <div className="login-container">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="sign-in-button">
            Register
          </button>

          <p className="sign-up-link">
            Already have an account? <a href="/login">Login Here</a>
          </p>
          <div className="login-with">
            <div class="login-divider">
              <hr />
              <span>Or sign up with</span>
              <hr />
            </div>
            {/* <div className="oauth"> */}
            <button className="google-button">
              <img
                className="google-logo"
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt=""
              />
              <h3>Continue With Google</h3>
            </button>
            {/* </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
