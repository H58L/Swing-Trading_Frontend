import React, { useEffect, useState } from "react";
import RNN_Charts from "./RNN_Charts";
import LSTM_Charts from "./LSTM_Charts";
import { useLoginContext } from "../context/LoginContext";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function Prediction() {
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

  return (
    <div>
      {" "}
      <RNN_Charts />
      <LSTM_Charts />
    </div>
  );
}

export default Prediction;
