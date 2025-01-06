import { createContext, useState } from "react";

export const tokenContext = createContext(0);
export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }
  return (
    <tokenContext.Provider value={{ token, setToken , logout}}>
      {children}
    </tokenContext.Provider>
  );
}
