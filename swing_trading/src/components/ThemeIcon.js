import React from 'react';
import { MoonIcon } from '@heroicons/react/solid';

const ThemeIcon = () => {
  return (
    <button className='rounded-lg border border-neutral-400 p-2 absolute right-8 xl:right-32 shadow-lg'>
      {/* Remove stroke and add a fill color for better visibility */}
      <MoonIcon className='h-8 w-8 cursor-pointer text-neutral-400' />
    </button>
  );
};

export default ThemeIcon;
