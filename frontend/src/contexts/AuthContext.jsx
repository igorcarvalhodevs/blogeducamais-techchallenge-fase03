import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("blog_user");
    const savedToken = localStorage.getItem("blog_token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  async function login(credentials) {
    const data = await loginRequest(credentials);

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("blog_user", JSON.stringify(data.user));
    localStorage.setItem("blog_token", data.token);

    return data;
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("blog_user");
    localStorage.removeItem("blog_token");
  }

  const isAuthenticated = !!token;
  const isTeacher = user?.role === "teacher";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        isTeacher,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}