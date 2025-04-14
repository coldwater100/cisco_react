import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const checkLoginStatus = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/status", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("인증 정보 없음");

      const data = await response.json();
      setIsLoggedIn(true);
      setUsername(data.username);
    } catch (error) {
      console.error("로그인 상태 확인 실패:", error);
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, setIsLoggedIn, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);