"use client";

import { useEffect } from "react";
import { Circle } from "lucide-react";

export function StatusHistoryTab() {
  const statusHistory = [
    {
      status: "Status Changed",
      description: "In progress to Submitted",
      date: "08/12/2024",
    },
    {
      status: "Updated Passport Image",
      description: "passport.pdf to passport_Updated.pdf",
      date: "07/04/2024",
    },
    {
      status: "Added Spouse Information",
      description: "Date of Birth",
      date: "05/04/2024",
    },
  ];

  useEffect(() => {
    console.log("Fetching status history data...");
  }, []);

  return (
    <div className="px-[20px] py-[50px]">
      <div className="relative border-l-2 border-blue-primary pl-6 space-y-6">
        {statusHistory.map((item, index) => (
          <div key={index} className="relative pl-4">
            {/* Blue Dot */}
            <div className="absolute left-[-31px] top-1.5">
              <Circle className="h-3 w-3 text-blue-primary" fill="#0A65CC" />
            </div>

            {/* Content */}
            <div>
              <h4 className="text-xl font-semibold text-blue-primary">
                {item.status}
              </h4>
              <p className="text-base text-gray-primary font-normal">
                {item.description}
              </p>
              <p className="text-base text-gray-primary font-normal mt-[3px]">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
