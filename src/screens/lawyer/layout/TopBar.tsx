"use client";
import { ChevronDown, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function TopBar({
  signOutPath,
  profilePath,
}: {
  signOutPath: string;
  profilePath: string;
}) {
  const [language, setLanguage] = useState("en");

  const showOriginalPage = () => {
    setLanguage("en");
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

  return (
    <div className="hidden md:flex h-16 bg-white border-b border-gray-200  items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            className="pl-10 w-64 h-9 bg-[#F5F9FF] border border-transparent focus:outline-none focus:ring-0 text-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
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

        {/* <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button> */}

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
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-header">
              <User className="w-4 h-4 mr-2" />
              <Link href={profilePath}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Link href={signOutPath}>Sign Out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
