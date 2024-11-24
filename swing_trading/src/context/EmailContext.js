import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
const EmailContext = createContext();

// Create a provider component
export const EmailProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(false);

  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useEmailContext = () => useContext(EmailContext);
