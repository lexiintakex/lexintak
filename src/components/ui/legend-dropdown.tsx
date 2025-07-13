"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function LegendDropdown({ label }: { label?: string }) {
  const [selectedValue, setSelectedValue] = useState("All Months");

  const options = [
    "All Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative  min-w-[150px] flex items-center justify-between  text-sm text-gray-700 bg-white border border-gray-300 rounded-md px-3 py-3 shadow-sm hover:bg-gray-50 transition focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <span className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500 font-medium">
              {label || "Legend Type"}
            </span>
            <span className="text-gray-900">{selectedValue}</span>
            <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-full h-[250px] min-w-[150px]  overflow-y-auto bg-white"
        >
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => setSelectedValue(option)}
              className="cursor-pointer"
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
