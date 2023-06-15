import { useState, useEffect, createContext } from "react";
import useGetWishList from "../hooks/useGetWishList";

export const AuthContext = createContext(null);

export function ProvideAuth({ children }) {
  const [user, setUser] = useState(null);

  const { wishList } = useGetWishList();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("n-t-user"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, wishList }}>
      {children}
    </AuthContext.Provider>
  );
}
