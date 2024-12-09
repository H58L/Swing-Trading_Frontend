import React from "react";
import RNN_Charts from "./RNN_Charts";
import LSTM_Charts from "./LSTM_Charts";
import { useLoginContext } from "../context/LoginContext";
import { Navigate } from "react-router-dom";

function Prediction() {
  const { isLoggedin } = useLoginContext();
  if (!isLoggedin) {
    
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      {" "}
      <RNN_Charts />
      <LSTM_Charts />
    </div>
  );
}

export default Prediction;
