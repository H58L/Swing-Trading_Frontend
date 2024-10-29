
import React from 'react';
import ThemeContext from '../context/ThemeContext';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
const AlertHeading = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const handleSetAlert = () => {
    navigate("/alertform");
  };


  return (
    <div className="flex items-center justify-between mb-4">
      <div className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Your Alerts
      </div>
      <button
        className={`px-3 py-1 text-sm font-semibold rounded ${
          darkMode ? 'bg-indigo-700 text-gray-200 hover:bg-purple-700' : 'bg-gray-900 text-white hover:bg-blue-600'
        }`}
            onClick={handleSetAlert}
      >
        Set Alerts
      </button>
    </div>
  );
};

export default AlertHeading;

