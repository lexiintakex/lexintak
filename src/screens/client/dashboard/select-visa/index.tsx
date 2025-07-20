"use client";
import Banner from "@/components/Banner";
import InputField from "@/components/ui/add-input";
import ToastAlert from "@/components/ui/toast-alerts";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function SeelectVisa() {
  const [visible, setVisible] = useState(true);
  const [values, setValues] = React.useState<Record<string, string>>({});
  const { push } = useRouter();

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    push("/client/dashboard/files");
  };

  const fields = [
    {
      id: "visaType",
      label: "Form Type",
      placeholder: "Select",
      type: "select",
      options: [
        { value: "type1", label: "Type 1" },
        { value: "type2", label: "Type 2" },
        { value: "type3", label: "Type 3" },
      ],
    },
  ];

  return (
    <div>
      <Banner appName="Lexintake" name="Steve" />
      <div className="mt-[20px]">
        {visible && (
          <ToastAlert
            message="Suggestions: If your lawyer didn’t assigned the Visa Status, please select your visa status from the list."
            variant="info"
            onClose={() => setVisible(false)}
          />
        )}
      </div>
      <form className="space-y-4 mt-[30px] w-[30%]" onSubmit={handleSubmit}>
        {fields.map((f) => (
          <InputField
            key={f.id}
            {...f}
            value={values[f.id] ?? ""}
            onChange={(v) => handleChange(f.id, v)}
          />
        ))}

        <button
          type="submit"
          className="w-full cursor-pointer text-base font-medium u mt-4 py-2 bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SeelectVisa;
