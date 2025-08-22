"use client";

import ResponsiveSidebar from "@/screens/lawyer/layout/ResponsiveSideBar";
import Sidebar from "@/screens/lawyer/layout/SideBar";
import TopBar from "@/screens/lawyer/layout/TopBar";
import type React from "react";
import { Home } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/client/dashboard" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <div className="flex">
        <aside className="hidden md:block fixed w-64 h-full border-r z-30 bg-gray-100">
          <Sidebar menuItems={menuItems} />
        </aside>

        <div className="md:hidden absolute top-4 left-4 z-40">
          <ResponsiveSidebar menuItems={menuItems} signOutPath="/" />
        </div>

        <div className="flex flex-col flex-1 h-full min-w-0 md:ml-64">
          <header className="hidden md:block sticky top-0 h-16 z-20 bg-white border-b border-gray-200">
            <TopBar signOutPath="/" profilePath="/client/dashboard/profile" />
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden pt-[20px] px-6 pb-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
