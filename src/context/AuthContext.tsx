"use client";

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import api from "@/lib/axios";
import { AuthContextType, SignupData, User } from "@/types/auth";

const isBrowser = () => typeof window !== "undefined";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");
  const path = usePathname();
  const [globalLanguage, setGlobalLanguage] = useState<"English" | "Spanish">(
    "English"
  );

  useEffect(() => {
    if (!isBrowser()) return;
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (!isBrowser()) return;
      const response = await api.post("/login", { email, password });
      const { user, token } = response.data;
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
    const response = await api.get("/me");
    setUser(response.data?.user);
  }, []);

  const logout = useCallback(() => {
    if (!isBrowser()) return;
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }, []);

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
      globalLanguage,
      setGlobalLanguage,
    }),
    [
      user,
      token,
      login,
      signup,
      logout,
      getUserById,
      globalLanguage,
      setGlobalLanguage,
    ]
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
