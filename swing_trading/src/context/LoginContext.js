import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedin, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useLoginContext = () => useContext(LoginContext);
