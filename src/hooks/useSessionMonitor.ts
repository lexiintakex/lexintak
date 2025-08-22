import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";

export const useSessionMonitor = () => {
  const { user, token, logout } = useAuth();
  const router = useRouter();

  const handleVisibilityChange = useCallback(() => {
    // When tab becomes visible, check if session is still valid
    if (document.visibilityState === "visible" && token) {
      // You can add additional session validation here if needed
      // For now, we'll just check if token exists
      if (!localStorage.getItem("token")) {
        logout();
      }
    }
  }, [token, logout]);

  const handleBeforeUnload = useCallback((e: BeforeUnloadEvent) => {
    // Optional: Clear sensitive data when tab is closed
    // This is just a precaution
  }, []);

  useEffect(() => {
    // Monitor tab visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Monitor tab close events
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Monitor focus events (when user switches back to tab)
    const handleFocus = () => {
      if (token && !localStorage.getItem("token")) {
        logout();
      }
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("focus", handleFocus);
    };
  }, [handleVisibilityChange, handleBeforeUnload, token, logout]);

  return {
    isSessionValid: !!token && !!user,
    userRole: user?.role,
  };
};
