"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import InputField, { FieldMeta } from "@/components/ui/add-input";
import { Button } from "@/components/ui/button";

const filterFields: FieldMeta[] = [
  {
    id: "status",
    label: "Status",
    placeholder: "Select",
    type: "select",
    options: [
      { value: "in_progress", label: "In Progress" },
      { value: "completed", label: "Completed" },
      { value: "pending", label: "Pending" },
    ],
  },
  {
    id: "formType",
    label: "Form Type",
    placeholder: "Select",
    type: "select",
    options: [
      { value: "work_visa", label: "Work Visa" },
      { value: "student_visa", label: "Student Visa" },
    ],
  },
];

export default function FiltersModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [values, setValues] = useState({
    status: "in_progress",
    caseType: "work_visa",
    riskLevel: "medium",
    fromDate: "1993-06-15",
    toDate: "1993-06-15",
  });

  const handleChange = (key: string) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-black/20 min-h-screen items-center flex justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-xl  shadow-lg p-4 overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-600 border px-[5px] py-[4px] rounded-full border-blue-primary cursor-pointer hover:text-gray-900"
          >
            <X className="w-5 h-5 text-blue-primary" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <fieldset className="border border-blue-primary rounded-md px-3 pb-2 pt-1">
            <legend className="text-xs text-blue-primary font-medium ml-2">
              Date Range
            </legend>
            <div className="flex gap-3 items-center">
              <input
                type="date"
                value={values.fromDate}
                onChange={(e) => handleChange("fromDate")(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm"
              />
              <input
                type="date"
                value={values.toDate}
                onChange={(e) => handleChange("toDate")(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm"
              />
            </div>
          </fieldset>

          {filterFields.map((field) => (
            <InputField
              key={field.id}
              {...field}
              value={values[field.id as keyof typeof values]}
              onChange={handleChange(field.id)}
              className="cursor-pointer"
            />
          ))}

          <div className="flex justify-between pt-4 gap-x-[30px]">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-[50%] border border-blue-primary text-base font-medium text-blue-primary cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              className="w-[50%] cursor-pointer text-base font-medium  py-2 bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
              //   onClick={() => console.log("Apply Filters", values)}
              onClick={onClose}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
