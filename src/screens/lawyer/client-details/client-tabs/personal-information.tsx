"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PersonalInformationTab() {
  useEffect(() => {
    console.log("Fetching personal information data...");
  }, []);

  const userDetails = [
    {
      title: "Today's Date:",
      desc: "05/04/2023",
    },
    {
      title: "Full Name:",
      desc: "Hafiz Ahmad Ismail",
    },
    {
      title: "Phone Number:",
      desc: "+92 3338692074",
    },
    {
      title: "Email:",
      desc: "ahmadismail23@gmail.com",
    },
    {
      title: "Marital Status:",
      desc: "Married",
    },
    {
      title: "Date Of Birth:",
      desc: "06/10/1993",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src="/assets/dashboard/profile.svg"
            alt="Williams Flemming"
          />
          <AvatarFallback>WF</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">Williams Flemming</h2>
          <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 mt-[5px] text-sm font-medium text-green-500">
            <CheckCircle className="mr-1 h-4 w-4" />
            Approved
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {userDetails.map((item, idx) => (
          <div key={idx}>
            <p className="text-base text-gray-primary font-bold">
              {item.title}
            </p>
            <p className="font-normal text-base text-[#686868]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
