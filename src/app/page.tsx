"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Login from "@/screens/lawyer/auth/login";

export default function Home() {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect to appropriate dashboard
    if (token && user) {
      if (user.role === "lawyer") {
        router.push("/lawyer/dashboard");
      } else if (user.role === "client") {
        router.push("/client/dashboard");
      }
    }
  }, [user, token, router]);

  // If user is logged in, show loading while redirecting
  if (token && user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-primary"></div>
      </div>
    );
  }

  // Show login page for non-authenticated users
  return <Login />;
}
