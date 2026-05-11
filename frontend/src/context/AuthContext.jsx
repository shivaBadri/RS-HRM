import React, { createContext, useContext, useState } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("risehr_user") || "null");
  });

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      if (!response.data.success && !response.data.token) {
        throw new Error("Login failed");
      }

      localStorage.setItem(
        "risehr_token",
        response.data.token || "demo-token"
      );

      localStorage.setItem(
        "risehr_user",
        JSON.stringify(response.data.user)
      );

      setUser(response.data.user);

      return response.data;
    } catch (error) {
      console.log("AUTH LOGIN ERROR:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("risehr_token");
    localStorage.removeItem("risehr_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);