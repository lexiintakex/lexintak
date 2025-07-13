"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function ExportDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 transition">
          Export
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={8}
        className="z-50 w-full rounded-md bg-white shadow-lg border border-gray-100 p-1"
      >
        <DropdownMenu.Item className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded">
          Export as CSV
        </DropdownMenu.Item>
        <DropdownMenu.Item className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded">
          Export as Excel
        </DropdownMenu.Item>
        <DropdownMenu.Item className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded">
          Export as PDF
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
