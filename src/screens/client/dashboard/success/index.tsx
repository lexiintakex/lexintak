"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function Successfully() {
  const { push } = useRouter();

  return (
    <div className="py-[50px] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-full bg-[#F5FAFF] border border-blue-100 rounded-lg shadow-sm p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-primary mb-2">
          Form Submitted Successfully
        </h1>
        <p className="text-sm md:text-lg lg:text-xl text-[#686868] mb-6">
          Your form has been sent successfully. Please click on the button below
          to go to dashboard.
        </p>
        <div className="flex justify-center items-center w-full mt-[5px]">
          <Link
            href={"/client/dashboard"}
            onClick={() => push("/client/dashboard")}
            className="bg-blue-primary flex justify-center items-center gap-x-[7px] text-base cursor-pointer hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition-all"
          >
            <LayoutGrid className="w-5 h-5" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
