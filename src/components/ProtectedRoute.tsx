"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("lawyer" | "client")[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles = ["lawyer", "client"],
  redirectTo,
}: ProtectedRouteProps) {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't do anything while still loading
    if (isLoading) return;

    // If no token, redirect to main login page
    if (!token) {
      router.push("/");
      return;
    }

    // If we have a token but no user yet, wait for user data to load
    if (token && !user) {
      // Still loading, don't redirect yet
      return;
    }

    // If user exists but role is not allowed, redirect
    if (user && !allowedRoles.includes(user.role)) {
      if (user.role === "lawyer") {
        router.push("/lawyer/dashboard");
      } else if (user.role === "client") {
        router.push("/client/dashboard");
      }
      return;
    }

    // If redirectTo is specified and user is authenticated, redirect
    if (redirectTo && user) {
      router.push(redirectTo);
      return;
    }
  }, [user, token, allowedRoles, redirectTo, router, pathname, isLoading]);

  // Show loading while checking authentication
  if (isLoading || !token || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-primary"></div>
      </div>
    );
  }

  // If user role is not allowed, show nothing (will redirect)
  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
