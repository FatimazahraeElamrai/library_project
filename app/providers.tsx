"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Role = "admin" | "reader";

interface User {
  id: number;
  name: string;
  role: Role;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(
    () => typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null
  );

  useEffect(() => {
    console.log("👤 Utilisateur actuel dans AuthProvider :", user);
  }, [user]);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}
