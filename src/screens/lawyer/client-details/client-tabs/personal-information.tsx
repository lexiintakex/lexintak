"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fieldIconMap, fieldLabelMap } from "../field-maping";
import { User } from "@/types/auth";
import { AddNotes } from "../add-notes";
import CommentsList from "../CommentList";

interface Props {
  responses: { key_name: string; key_value: string; language: string }[];
  user: User;
}

export function PersonalInformationTab({ responses, user }: Props) {
  useEffect(() => {
    console.log("Fetching personal information data...");
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={user?.profile_image || "/default-avatar.png"}
            alt={user?.full_name || "User Avatar"}
          />
          <AvatarFallback>WF</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{user?.full_name}</h2>
          <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 mt-[5px] text-sm font-medium text-green-500">
            <CheckCircle className="mr-1 h-4 w-4" />
            Approved
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {responses.map((item, idx) => {
          const label = fieldLabelMap[item.key_name] || item.key_name;
          const icon = fieldIconMap[item.key_name];

          return (
            <div key={idx} className="border rounded-md p-3 bg-white shadow-sm">
              <div className="flex items-center gap-2">
                {icon && <span>{icon}</span>}
                <p className="text-sm font-semibold text-gray-800">{label}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.key_value}</p>
            </div>
          );
        })}
      </div>
      <AddNotes type="personal_information" />
      <CommentsList userId={user.user_id as any} type="personal_information" />
    </div>
  );
}
