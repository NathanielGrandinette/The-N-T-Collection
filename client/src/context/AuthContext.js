import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext(null);

const checkIfStoredUser = localStorage.getItem("n-t-user")
  ? JSON.parse(localStorage.getItem("n-t-user"))
  : null;

export function ProvideAuth({ children }) {
  const [user, setUser] = useState(checkIfStoredUser);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("n-t-user"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
