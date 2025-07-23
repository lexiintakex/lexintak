"use client";
import InputField, { FieldMeta } from "@/components/ui/add-input";
import React from "react";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";

function AddClient() {
  const fields: FieldMeta[] = [
    {
      id: "fullName",
      label: "Full Name",
      placeholder: "Hafiz Ahmad Ismail",
      type: "text",
      icon: User,
    },
    {
      id: "email",
      label: "Email",
      placeholder: "ahmadansari55@gmail.com",
      type: "email",
      icon: Mail,
    },
    {
      id: "phone",
      label: "Phone",
      placeholder: "+92 335858669",
      type: "tel",
      icon: Phone,
    },
    {
      id: "visaType",
      label: "Form Type",
      placeholder: "Select",
      type: "select", // Indicate this is a select field
      options: [
        { value: "i-130", label: "I-130" },
        { value: "I-485", label: "I-485" },
      ],
    },
    {
      id: "userName",
      label: "User Name",
      placeholder: "Ahmad Ismail",
      type: "text",
      icon: User,
    },
    {
      id: "password",
      label: "Password",
      placeholder: "••••••••",
      type: "password",
      icon: Lock,
    },
  ];

  const [values, setValues] = React.useState<Record<string, string>>({});

  const handleChange = (key: string, val: string) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  return (
    <>
      {/* <Banner name="Steve" appName="Lexintake" /> */}
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold mt-[20px]">
        Enter Client Details
      </h1>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[30px]">
        {fields.map((f) => (
          <InputField
            key={f.id}
            {...f}
            value={values[f.id] ?? ""}
            onChange={(v) => handleChange(f.id, v)}
          />
        ))}
        <div className="md:col-span-2 flex justify-start mt-4">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-primary hover:bg-blue-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Next
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </>
  );
}

export default AddClient;
