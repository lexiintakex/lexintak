"use client";

import ResponsiveSidebar from "@/screens/lawyer/layout/ResponsiveSideBar";
import Sidebar from "@/screens/lawyer/layout/SideBar";
import TopBar from "@/screens/lawyer/layout/TopBar";
import type React from "react";
import { Home } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const menuItems = [{ icon: Home, label: "Dashboard", active: true }];

const dekstopMenuItems = [
  { icon: Home, label: "Dashboard", path: "//dashboard" },
  // {
  //   icon: FileText,
  //   label: "Personal Information",
  //   path: ["/client/personal", "/lawyer/client-details/"],
  // },
  // { icon: Users, label: "FAQS", path: "/lawyer/add-client" },
  // { icon: Settings, label: "HELP", path: "/lawyer/settings" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <aside className="hidden md:block fixed w-64 h-full border-r z-30 bg-gray-100">
        <Sidebar menuItems={dekstopMenuItems} />
      </aside>

      <div className="md:hidden absolute top-4 left-4 z-40">
        <ResponsiveSidebar menuItems={menuItems} />
      </div>

      <div className="flex flex-col flex-1 h-full min-w-0 md:ml-64">
        <header className="hidden md:block sticky top-0 h-16 z-20 bg-white border-b border-gray-200">
          <TopBar />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-[20px] px-6 pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
