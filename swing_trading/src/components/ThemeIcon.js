import React, { useContext } from 'react';
import { MoonIcon } from '@heroicons/react/solid';
import ThemeContext from '../context/ThemeContex';

const ThemeIcon = () => {
  const {darkMode, setDarkMode} = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log(darkMode);
  }

  return (
    <button className={`rounded-lg border border-neutral-400 p-2 absolute right-8 xl:right-32 shadow-lg 
    ${darkMode ? "shadow-gray-800" : null}` }
    onClick={toggleDarkMode}>
      {/* Remove stroke and add a fill color for better visibility */}
      <MoonIcon className={`h-8 w-8 cursor-pointer text-neutral-400 
      ${darkMode ? "fill-yellow-400 stroke-yellow-400" : "fill-none stroke-neutral-400"}`}
       />
    </button>
  );
};

export default ThemeIcon;
