"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function DocumentsTab() {
  const documents = [
    { name: "Passport_Image.pdf", size: "200 KB" },
    { name: "Passport_Image.pdf", size: "200 KB" },
    { name: "Passport_Image.pdf", size: "200 KB" },
    { name: "Passport_Image.pdf", size: "200 KB" },
  ];

  useEffect(() => {
    console.log("Fetching documents data for Documents tab...");
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAction = (action: string, doc: any) => {
    console.log(`${action} clicked on`, doc);
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {documents.map((doc, index) => (
        <Card
          key={index}
          className="flex items-center justify-between bg-[#F9F9F9] border-[1px] border-[#E8E8E8] p-4"
        >
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-muted-foreground" />
            <div>
              <p className="font-medium">{doc.name}</p>
              <p className="text-sm text-muted-foreground">{doc.size}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Image
                  alt="Image"
                  src={"/assets/dashboard/three-dots.svg"}
                  width={20}
                  height={20}
                  className="w-auto h-auto cursor-pointer"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 bg-white">
              <DropdownMenuItem
                className="hover:bg-gray-header cursor-pointer"
                onClick={() => handleAction("view", doc)}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-gray-header cursor-pointer"
                onClick={() => handleAction("edit", doc)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 cursor-pointer"
                onClick={() => handleAction("delete", doc)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
      ))}
    </div>
  );
}
