import React from "react";
import ThemeContext from "../context/ThemeContex";
import { useContext } from "react";
//Card is a container component

const Card = ({ children }) => {
  const {darkMode} = useContext(ThemeContext);

  return (
    <div className= {`w-full h-full rounded-md relative p-8 border-2 border-neutral-200
    ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200 "  }`}>
      {children}
    </div>
  );
};

export default Card;
