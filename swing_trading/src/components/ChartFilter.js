// //1-W 1M 1Y

// import React from 'react'

// const ChartFilter = (text, active, onCLick) => {
//   return (
//     <button onCLick={onCLick} className={`w-12 m-2 h-8 border-1 rounded-md flex itesm-center jusitfy-center cursor-pointer 
//     ${active ? "bg-indigo-600 border-indigo-700 text-gray-100" : "border-indigo-300 text-indigo-300"
//     } `}>
//         {text}
//     </button>
//   )
// }

// export default ChartFilter

import React from 'react';
import Card from './Card';
import ThemeContext from '../context/ThemeContex';
import { useContext } from 'react';

const ChartFilter = ({ text, active, onClick }) => {
  const {darkMode} = useContext(ThemeContext);
  return (
   <div className= {`${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200 "  }`}>
       <button 
      className={`p-2 m-1 rounded ${active ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-black'}` }
      onClick={onClick}
    >
      {text}
    </button>
   </div>
   
    
    
  );
};

export default ChartFilter;
