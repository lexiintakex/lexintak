"use client";
import { Home, Users, FileText, CheckSquare, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: Home, label: "Dashboard", active: true, path: "/lawyer/dashboard" },
  {
    icon: Users,
    label: "Add Client",
    active: false,
    path: "/lawyer/add-client",
  },
  {
    icon: FileText,
    label: "Client Management",
    active: false,
    path: "/lawyer/client-management",
  },
  {
    icon: CheckSquare,
    label: "Tasks",
    active: false,
    path: "/lawyer/dashboard#",
  },
  {
    icon: Settings,
    label: "Settings",
    active: false,
    path: "/lawyer/dashboard#",
  },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <div className="w-64 bg-[#F4F9FF] border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="w-full h-full mt-[10px] mb-[10px]"
          />
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 my-[10px] px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  path === item.path
                    ? "bg-white text-[#1E3A8A]"
                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
