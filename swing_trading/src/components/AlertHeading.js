// import React from 'react'
// import ThemeContext from '../context/ThemeContext'
// import { useContext } from 'react';



// const AlertHeading = () => {

//     const { darkMode, setDarkMode } = useContext(ThemeContext);
//   return (
//     <div className = {`text-gray-100 text-lg font-semibold alert-item mb-3  rounded p-4 shadow-sm border border-gray-100 w-full
//     ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white"}`}>
//       Set Alerts
//     </div>
//   )
// }

// export default AlertHeading


// import React from 'react';
// import ThemeContext from '../context/ThemeContext';
// import { useContext } from 'react';

// const AlertHeading = () => {
//   const { darkMode } = useContext(ThemeContext);

//   return (
//     <div className={`text-lg font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//       Your Alerts
//     </div>
//   );
// };

// export default AlertHeading;

import React from 'react';
import ThemeContext from '../context/ThemeContext';
import { useContext } from 'react';

const AlertHeading = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Your Alerts
      </div>
      <button
        className={`px-3 py-1 text-sm font-semibold rounded ${
          darkMode ? 'bg-gray-700 text-gray-200' : 'bg-blue-500 text-white'
        } hover:${darkMode ? 'bg-gray-600' : 'bg-blue-600'}`}
      >
        Set Alerts
      </button>
    </div>
  );
};

export default AlertHeading;
