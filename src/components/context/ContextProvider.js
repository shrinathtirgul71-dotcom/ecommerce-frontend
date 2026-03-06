import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext(null);

const BASE_URL = "https://ecommerce-backend-1-b285.onrender.com";

const ContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  // ✅ Check if user is already logged in when app loads
  useEffect(() => {
    const checkValidUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/validuser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // send cookie with request
        });

        if (res.status === 201) {
          const data = await res.json();
          setAccount(data);
        } else {
          setAccount(null);
        }
      } catch (error) {
        console.log("Auth check failed:", error);
        setAccount(null);
      }
    };

    checkValidUser();
  }, []);

  const updateAccount = (data) => {
    setAccount(data);
  };

  return (
    <LoginContext.Provider value={{ account, setAccount: updateAccount }}>
      {children}
    </LoginContext.Provider>
  );
};

export default ContextProvider;
