import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedInState] = useState(false);
  const [username, setUsernameState] = useState("");
  const [isAuthLoaded, setIsAuthLoaded] = useState(false); // ✅ 추가

  useEffect(() => {
    const storedLogin = sessionStorage.getItem("isLoggedIn");
    const storedUsername = sessionStorage.getItem("username");

    if (storedLogin === "true" && storedUsername) {
      setIsLoggedInState(true);
      setUsernameState(storedUsername);
    }

    setIsAuthLoaded(true); // ✅ 로딩 완료
  }, []);

  const setIsLoggedIn = (value) => {
    setIsLoggedInState(value);
    sessionStorage.setItem("isLoggedIn", value ? "true" : "false");
  };

  const setUsername = (value) => {
    setUsernameState(value);
    sessionStorage.setItem("username", value);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, setIsLoggedIn, setUsername, isAuthLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
