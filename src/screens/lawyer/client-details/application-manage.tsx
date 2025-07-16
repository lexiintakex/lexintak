"use client";

import InputField from "@/components/ui/add-input";
import React from "react";

export function ApplicationManagement() {
  const [values, setValues] = React.useState<Record<string, string>>({});
  const fields = [
    {
      id: "Updated Status Application",
      label: "Updated Status Application",
      placeholder: "Select",
      type: "select",
      options: [
        { value: "type1", label: "Type 1" },
        { value: "type2", label: "Type 2" },
        { value: "type3", label: "Type 3" },
      ],
    },
  ];
  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="space-y-2">
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[30px]">
        {fields.map((f) => (
          <InputField
            key={f.id}
            {...f}
            value={values[f.id] ?? ""}
            onChange={(v) => handleChange(f.id, v)}
          />
        ))}
      </form>
    </div>
  );
}
