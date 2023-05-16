import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext(null);

export function ProvideAuth({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("n-t-user"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}