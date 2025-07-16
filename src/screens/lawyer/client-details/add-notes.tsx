"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const TiptapEditor = dynamic(() => import("./TipEditor"), { ssr: false });

export function AddNotes() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="space-y-4 border border-gray-100  shadow">
      <p className="font-semibold px-4  rounded-md bg-[#F4F9FF] py-[15px]  text-xl text-gray-primary">
        Add Notes
      </p>
      <Card className="p-4">
        {hydrated ? (
          <TiptapEditor />
        ) : (
          <p className="text-muted-foreground text-sm">Loading editor...</p>
        )}
      </Card>
      <div className="px-[20px] mb-[10px]">
        <button className=" px-[25px] rounded-md py-[10px] bg-[#EFEFEF] font-medium text-base text-[#686868]">
          Add
        </button>
      </div>
    </div>
  );
}
