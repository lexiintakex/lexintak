"use client";

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { AuthContextType, SignupData, User } from "@/types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");
  const { push } = useRouter();
  const path = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const response = await api.post("/auth/login", { email, password });
      const { user, token } = response.data;
      console.log("🚀 ~ response:", response);
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return response.data;
    },
    []
  );

  const signup = useCallback(async (data: SignupData) => {
    const response = await api.post("/signup", data);
    return response.data;
  }, []);

  const getUserById = useCallback(async () => {
    // const response = await api.get("/auth/profile");
    setUser(null);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    push("/");
  }, [push]);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getUserById();
    }
  }, [token, path, getUserById]);

  const authValues = useMemo(
    () => ({
      user,
      token,
      login,
      signup,
      logout,
      getUserById,
    }),
    [user, token, login, signup, logout, getUserById]
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
