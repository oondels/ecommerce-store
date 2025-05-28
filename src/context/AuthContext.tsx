import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { AuthService } from "../services/AuthService";
import { useNotifications } from "../context/NotificationsContext";

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: true,
});

function parseJwt(token: string) {
  try {
    const base64 = token.split(".")[1];
    const decodedPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );

    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error("Invalid JWT format:", e);
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addNotification } = useNotifications();

  useEffect(() => {
    // Check for existing session
    const savedUser = sessionStorage.getItem("store-user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (token: string) => {
    try {
      const decodedPayload = parseJwt(token);
      if (!decodedPayload) {
        throw new Error("Token inválido ou corrompido");
      }

      const userData: User = {
        id: decodedPayload.id,
        name: decodedPayload.name,
        role: decodedPayload.role,
      };

      setUser(userData);
      sessionStorage.setItem("store-user", JSON.stringify(userData));
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AuthService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      addNotification({
        type: "success",
        title: "Até breve!",
        message: "Logout realizado com sucesso.",
        duration: 1500,
      });
      sessionStorage.removeItem("store-user");
    }
  };

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
