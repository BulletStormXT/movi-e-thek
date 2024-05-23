import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    if (userid) {
      setLoginUser(userid);
    }
  }, []);
  return (
    <LoginContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginContext.Provider>
  );
};
