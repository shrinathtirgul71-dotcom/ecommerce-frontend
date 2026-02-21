import React, { createContext, useState } from "react";

export const LoginContext = createContext(null);

const ContextProvider = ({ children }) => {
  // Start with null - don't load from localStorage initially
  const [account, setAccount] = useState(null);

  const updateAccount = (data) => {
    setAccount(data);
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      localStorage.removeItem('user'); // Clear localStorage on logout
    }
  };

  return (
    <LoginContext.Provider value={{ account, setAccount: updateAccount }}>
      {children}
    </LoginContext.Provider>
  );
};

export default ContextProvider;