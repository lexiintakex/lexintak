"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3, Save, X, User } from "lucide-react";
import {
  fieldIconMap,
  fieldLabelMap,
} from "@/screens/lawyer/client-details/field-maping";
import { AddNotes } from "@/screens/lawyer/client-details/add-notes";
import useAuth from "@/hooks/useAuth";
import CommentsList from "@/screens/lawyer/client-details/CommentList";

interface PersonalInfoProps {
  personalInfo: any;
  onUpdate: (updatedInfo: any) => void;
}

export function ClientPersonalInfo({
  personalInfo,
  onUpdate,
}: PersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(personalInfo);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { user } = useAuth();

  const handleSave = () => {
    onUpdate(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(personalInfo);
    setIsEditing(false);
  };

  const handleDelete = (field: string) => {
    const updatedInfo = { ...editedInfo };
    delete updatedInfo[field];
    setEditedInfo(updatedInfo);
    onUpdate(updatedInfo);
  };
  const personalInfoMain = useMemo(() => {
    const obj: Record<string, string> = {};
    personalInfo.forEach((item: any) => {
      obj[item.key_name] = item.key_value;
    });
    return obj;
  }, [personalInfo]);

  const fields = Object.keys(fieldLabelMap).map((key) => ({
    key,
    label: fieldLabelMap[key],
    icon: fieldIconMap[key],
  }));

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
            <div className="flex space-x-2">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    size="sm"
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant={"secondary"}
                    size="sm"
                    onClick={handleSave}
                    className="bg-blue-primary text-white cursor-pointer border border-blue-primary hover:bg-transparent hover:text-blue-primary"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {fields.map((field) => {
              const hasValue = personalInfoMain?.[field.key];

              return (
                <div
                  key={field.key}
                  className={`group relative overflow-hidden rounded-md border transition-all duration-300 hover:shadow-lg ${
                    isEditing
                      ? "border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 hover:border-blue-300"
                      : hasValue
                      ? "border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 hover:border-blue-300"
                      : "border-gray-200 bg-gradient-to-br from-gray-50/50 to-slate-50/30 hover:border-gray-300"
                  }`}
                >
                  <div className="relative p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {field.icon}
                        <div>
                          <span className="font-medium text-gray-900">
                            {field.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <div className="flex-1 relative">
                          <Input
                            value={
                              editedInfo?.[field.key] ??
                              personalInfoMain[field.key] ??
                              ""
                            }
                            onChange={(e) =>
                              setEditedInfo({
                                ...editedInfo,
                                [field.key]: e.target.value,
                              })
                            }
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            className="bg-white border-0 shadow-sm focus:shadow-md focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                          />
                        </div>
                      ) : (
                        <div
                          className={`flex-1 rounded-lg transition-all duration-200 ${
                            hasValue
                              ? "bg-white/60 text-gray-900 font-medium"
                              : "bg-gray-100/60 text-gray-500 italic"
                          }`}
                        >
                          {hasValue || "Not provided"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <AddNotes type="personal_information" id={user?.user_id as string} />
        <CommentsList
          userId={user?.user_id as string}
          type="personal_information"
        />
      </Card>
    </div>
  );
}
