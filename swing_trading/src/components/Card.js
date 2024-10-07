import React from "react"

//Card is a container component

const Card = ({children}) => {
  return (
    <div className="w-full h-full roundes-md relative p-8 border-2 bg-gray-300">
      {children}
    </div>
  )
}

export default Card
