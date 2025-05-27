import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { AuthService } from "../services/AuthService";
import { useNotifications } from "../context/NotificationsContext";

interface AuthContextType {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addNotification } = useNotifications();

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("store-user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (token: string) => {
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));

      const userData: User = {
        id: decodedPayload.id,
        name: decodedPayload.name,
        role: decodedPayload.role,
      };

      setUser(userData);
      localStorage.setItem("store-user", JSON.stringify(userData));
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);

      addNotification({
        type: "success",
        title: "Até breve!",
        message: "Logout realizado com sucesso.",
        duration: 1500,
      });
      localStorage.removeItem("store-user");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.error("Logout failed:", error);
      addNotification({
        type: "error",
        title: "Erro ao sair da conta!",
        message: "Logout não realizado.",
        duration: 5000,
      });
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
