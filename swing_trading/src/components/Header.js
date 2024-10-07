import React from 'react'
import Search from './Search'
import ThemeIcon from './ThemeIcon'
import { mockCompanyDetails } from '../constants/mock'

const Header = ({name}) => {
  return (
    <>
     <div className = "xl:px-32">
      
      <h1 className="text-5xl">{name}</h1>
            <Search></Search>
        
    </div>  
    <ThemeIcon></ThemeIcon>
    </>
    
  )
}

export default Header
