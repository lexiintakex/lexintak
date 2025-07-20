"use client";

import { Menu, Search, ChevronDown, User } from "lucide-react";
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
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface Menu {
  icon?: React.ElementType;
  label?: string;
  path: string | string[];
}

export default function ResponsiveSidebar({
  menuItems,
  signOutPath,
}: {
  menuItems: Menu[];
  signOutPath?: string;
}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  const showOriginalPage = () => {
    setLanguage("en");
    setOpen(false);
    const iframe = document.querySelector("iframe.skiptranslate");
    if (iframe) {
      const contentWindow = (iframe as HTMLIFrameElement).contentWindow;
      const originalOption =
        contentWindow?.document.getElementById(":1.close") ||
        contentWindow?.document.querySelector("a.VIpgJd-ZVi9od-TvD9Pc-hSRGPd");
      if (originalOption) originalOption.click();
    } else {
      console.error("Google Translate select element not found.");
    }
  };

  const translatetoSpanish = () => {
    setLanguage("es");
    setOpen(false);
    const selectElement = document.querySelector(".goog-te-combo");
    if (selectElement) {
      (selectElement as HTMLSelectElement).value = "es";
      selectElement.dispatchEvent(new Event("change"));
    } else {
    }
  };

  const languageLabel = language === "en" ? "English" : "Spanish";
  const flagSrc =
    language === "en"
      ? "/assets/dashboard/english.svg"
      : "/assets/dashboard/spanish.jpg";

  const isActive = (itemPath: string | string[]) => {
    if (typeof itemPath === "string") {
      return path === itemPath;
    }

    return itemPath.some(
      (p) => path === p || (p.endsWith("/") && path.startsWith(p))
    );
  };

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
              className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 px-3 py-2 h-auto"
            >
              <div className="flex flex-col items-start cursor-pointer">
                <span className="text-xs text-gray-400">Select Language</span>
                <div className="flex items-center gap-1 cursor-pointer">
                  <Image
                    src={flagSrc}
                    alt={languageLabel}
                    width={16}
                    height={16}
                    className="rounded-full"
                  />
                  <span className="font-medium cursor-pointer">
                    {languageLabel}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-white shadow-lg cursor-pointer"
          >
            <DropdownMenuItem
              onClick={showOriginalPage} // Set back to English
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-header"
            >
              <Image
                src="/assets/dashboard/english.svg"
                alt="English"
                width={16}
                height={16}
                className="rounded-full"
              />
              English
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={translatetoSpanish}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-header"
            >
              <Image
                src="/assets/dashboard/spanish.jpg"
                alt="Spanish"
                width={16}
                height={16}
                className="rounded-full"
              />
              Spanish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button
              variant="ghost"
              className="flex items-center cursor-pointer gap-2 hover:bg-gray-50 px-3 py-2 h-auto"
            >
              <User className="w-5 h-5 text-gray-700" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-800">
                  John Steve
                </span>
                <span className="text-xs text-gray-500">Admin</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg">
            <DropdownMenuItem
              onClick={() => setOpen(false)} // ✅
              className="cursor-pointer hover:bg-gray-header"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpen(false)}
              className="text-red-600"
            >
              <Link href={signOutPath as string}>Sign Out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.path);

            return (
              <li key={item.label}>
                <Link
                  onClick={() => setOpen(false)}
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

      <div className="hidden md:flex">
        <SidebarContent />
      </div>
    </div>
  );
}
