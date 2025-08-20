"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  signupUser,
  logoutUser,
  getSessionUser,
} from "@/lib/actions/auth.actions";

interface User {
  id: string;
  email: string;
  name: string;
  role: "organizer" | "participant" | "judge";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    role: User["role"]
  ) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate user from cookie session
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const sessionUser = await getSessionUser();
        setUser(sessionUser);
      } catch (err) {
        console.error("Failed to fetch session:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const loggedInUser = await loginUser(email, password);
      setUser(loggedInUser);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: User["role"]
  ) => {
    setLoading(true);
    try {
      const newUser = await signupUser({ email, password, name, role });
      setUser(newUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
