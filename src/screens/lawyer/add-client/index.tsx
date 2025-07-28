"use client";

import React from "react";
import InputField, { FieldMeta } from "@/components/ui/add-input";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { useRegisterClient } from "@/api/auth";
import useAuth from "@/hooks/useAuth";

function AddClient() {
  const { user } = useAuth();
  console.log("🚀 ~ AddClient ~ user:", user);

  const fields: FieldMeta[] = [
    {
      id: "full_name",
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
      id: "form_type",
      label: "Form Type",
      placeholder: "Select",
      type: "select",
      options: [
        { value: "I130", label: "I-130" },
        { value: "I485", label: "I-485" },
      ],
    },
    {
      id: "username",
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

  const lawyerId = user?.user_id ?? "";

  const { mutateAsync: registerClient, isPending } = useRegisterClient(
    () => console.log("Client registered!"),
    (msg) => console.log(msg)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerClient({
      ...values,
      created_by: lawyerId,
      full_name: values.full_name,
      email: values.email,
      phone: values.phone,
      form_type: values.form_type,
      username: values.full_name,
      password: values.password,
    });
  };

  return (
    <>
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold mt-[20px]">
        Enter Client Details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[30px]"
      >
        {fields.map((f) => (
          <InputField
            key={f.id}
            {...f}
            value={values[f.id] ?? ""}
            onChange={(v) => handleChange(f.id, v)}
          />
        ))}
        <div className="md:col-span-2 flex justify-start mt-4">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-primary hover:bg-blue-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isPending ? "Submitting..." : "Next"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </>
  );
}

export default AddClient;
