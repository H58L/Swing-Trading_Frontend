import React from "react";
import RNN_Charts from "./RNN_Charts";
import LSTM_Charts from "./LSTM_Charts";

function Prediction() {
  return (
    <div>
      {" "}
      <RNN_Charts />
      <LSTM_Charts />
    </div>
  );
}

export default Prediction;
