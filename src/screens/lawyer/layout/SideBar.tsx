"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SideMenu {
  icon?: React.ElementType;
  label?: string;
  path: string | string[];
}

export default function Sidebar({ menuItems }: { menuItems: SideMenu[] }) {
  const path = usePathname();

  const isActive = (itemPath: string | string[]) => {
    if (typeof itemPath === "string") {
      return path === itemPath;
    }

    return itemPath.some(
      (p) => path === p || (p.endsWith("/") && path.startsWith(p))
    );
  };

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
          {menuItems.map((item) => {
            const active = isActive(item.path);

            return (
              <li key={item.label}>
                <Link
                  href={
                    typeof item.path === "string" ? item.path : item.path[0]
                  }
                  className={`flex items-center gap-3 my-[10px] px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-white text-[#1E3A8A]"
                      : "text-gray-600 hover:bg-white hover:text-gray-900"
                  }`}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
