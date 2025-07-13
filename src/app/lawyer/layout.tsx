import ResponsiveSidebar from "@/screens/lawyer/layout/ResponsiveSideBar";
import Sidebar from "@/screens/lawyer/layout/SideBar";
import TopBar from "@/screens/lawyer/layout/TopBar";
import type React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-y-hidden bg-gray-50">
      <aside className="hidden md:block w-64 h-full border-r z-30 bg-gray-100">
        <Sidebar />
      </aside>

      <div className="md:hidden absolute top-4 left-4 z-40">
        <ResponsiveSidebar />
      </div>

      <div className="flex flex-col flex-1 h-full min-w-0">
        <header className="hidden md:block sticky top-0 h-16 z-20 bg-white border-b border-gray-200">
          <TopBar />
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-[20px] px-6 pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
