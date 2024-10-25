import React from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";

const ChartFilter = ({ text, active, onClick }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-neutral-200 "
      }`}
    >
      <button
        className={`p-2 m-1 rounded ${
          active ? "bg-indigo-500 text-white" : "bg-gray-200 text-black"
        }`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default ChartFilter;
