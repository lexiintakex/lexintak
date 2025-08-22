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
import { AxiosError } from "axios";

const isBrowser = () => typeof window !== "undefined";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const path = usePathname();
  const { push } = useRouter();
  const [globalLanguage, setGlobalLanguage] = useState<"English" | "Spanish">(
    "English"
  );

  // Tab synchronization and automatic logout
  const handleStorageChange = useCallback((e: StorageEvent) => {
    if (e.key === "token") {
      const newToken = e.newValue;
      const oldToken = e.oldValue;

      // If token was removed (logout in another tab)
      if (!newToken && oldToken) {
        handleAutomaticLogout();
        return;
      }

      // If token changed (login with different role in another tab)
      if (newToken && newToken !== oldToken) {
        handleAutomaticLogout();
        return;
      }
    }
  }, []);

  const handleAutomaticLogout = useCallback(() => {
    // Clear local state
    setUser(null);
    setToken("");

    // Clear API headers
    delete api.defaults.headers.common["Authorization"];

    // Always redirect to main login page after automatic logout
    push("/");
  }, [push]);

  // Listen for storage changes across tabs
  useEffect(() => {
    if (!isBrowser()) return;

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  useEffect(() => {
    if (!isBrowser()) return;
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      // Fetch user data immediately when token is restored
      getUserById().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Handle automatic redirects for already logged-in users
  useEffect(() => {
    if (token && user && path === "/") {
      // If user is on home page and already logged in, redirect to appropriate dashboard
      if (user.role === "lawyer") {
        push("/lawyer/dashboard");
      } else if (user.role === "client") {
        push("/client/dashboard");
      }
    }
  }, [token, user, path, push]);

  // Enhanced getUserById with better error handling
  const getUserById = useCallback(async () => {
    try {
      const response = await api.get("/me");
      setUser(response.data?.user);
    } catch (error) {
      // If token is invalid, logout automatically
      if (error instanceof AxiosError && error.response?.status === 401) {
        handleAutomaticLogout();
      } else {
        // For other errors, just clear the invalid token
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        delete api.defaults.headers.common["Authorization"];
      }
    }
  }, [handleAutomaticLogout]);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (!isBrowser()) return;
      try {
        setIsLoading(true);
        // Clear old session first
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];

        const response = await api.post("/login", { email, password });
        const { user, token } = response.data;

        // Set new session
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Route based on role
        if (user.role === "client") {
          push("/client/dashboard");
        } else if (user.role === "lawyer") {
          push("/lawyer/dashboard");
        }

        return response.data;
      } catch (error) {
        console.error("Login failed", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [push]
  );

  const signup = useCallback(async (data: SignupData) => {
    const response = await api.post("/signup", data);
    return response.data;
  }, []);

  const logout = useCallback(() => {
    if (!isBrowser()) return;

    // Clear local state
    setUser(null);
    setToken("");
    setIsLoading(false);

    // Clear storage and API headers
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];

    // Always redirect to main login page after logout
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
      isLoading,
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
      isLoading,
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
