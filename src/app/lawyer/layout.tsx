"use client";
import ResponsiveSidebar from "@/screens/lawyer/layout/ResponsiveSideBar";
import Sidebar from "@/screens/lawyer/layout/SideBar";
import TopBar from "@/screens/lawyer/layout/TopBar";
import {
  BarChart3,
  Home,
  Users,
  FileText,
  CheckSquare,
  Settings,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const menuItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Overview", active: false },
  { icon: Users, label: "Clients", active: false },
  { icon: FileText, label: "Analytics", active: false },
  { icon: CheckSquare, label: "Tasks", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const dekstopMenuItems = [
  { icon: Home, label: "Dashboard", path: "/lawyer/dashboard" },
  {
    icon: FileText,
    label: "Client Management",
    path: ["/lawyer/client-management", "/lawyer/client-details/"],
  },
  {
    icon: Users,
    label: "Add Client",
    path: "/lawyer/add-client",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/lawyer/settings",
  },
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
