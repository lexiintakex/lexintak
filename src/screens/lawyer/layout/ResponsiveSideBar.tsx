"use client";

import { ChevronRight, Menu, Search, ChevronDown, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";

export interface Menu {
  icon?: React.ElementType;
  label?: string;
  active: boolean;
}

export default function ResponsiveSidebar({
  menuItems,
}: {
  menuItems: Menu[];
}) {
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="w-64 bg-gray-header border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Search + Language + User on mobile */}
      <div className="block md:hidden p-4 space-y-4">
        <div className="relative bg-white">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            className="pl-10 w-full h-9 bg-[#fff] border border-transparent focus:outline-none text-sm placeholder:text-gray-400"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full bg-white justify-between text-sm text-gray-700"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/dashboard/english.svg"
                  alt="English"
                  width={16}
                  height={16}
                  className="rounded-full"
                />
                English
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Spanish</DropdownMenuItem>
            <DropdownMenuItem>French</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full bg-white justify-between text-sm text-gray-700"
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                John Steve
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-white text-[#1E3A8A]"
                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                }`}
              >
                {item.icon && <item.icon className="w-5 h-5" />}
                {item.label}
                {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="bg-white w-full mb-[10px]">
      <div className="md:hidden  border-b border-gray-200 bg-white">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6 text-gray-800" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar on md+ screens */}
      <div className="hidden md:flex">
        <SidebarContent />
      </div>
    </div>
  );
}
