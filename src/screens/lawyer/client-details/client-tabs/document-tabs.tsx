"use client";

import { FileText, Eye, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DocumentsTab({
  documents,
}: {
  documents: { name: string; size: string; url: string }[];
}) {
  const handleAction = (action: string, doc: any) => {
    if (action === "view") {
      window.open(doc.url, "_blank");
    } else {
      console.log(`${action} clicked on`, doc);
    }
  };

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
      {documents.map((doc, index) => (
        <Card
          key={index}
          className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col justify-between min-h-[180px]"
        >
          {/* Top Info */}
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-md bg-gray-100">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-semibold text-gray-800 truncate">{doc.name}</p>
              <p className="text-sm text-gray-500 truncate">{doc.size}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between gap-2">
            <Button
              variant="outline"
              className="flex-1 flex cursor-pointer items-center justify-center gap-1 text-sm"
              onClick={() => handleAction("view", doc)}
            >
              <Eye className="w-4 h-4" />
              View
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
