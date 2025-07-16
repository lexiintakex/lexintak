"use client";

import React, { FormEvent, useState } from "react";
import AuthBanner from "../../../../components/Banner/Banner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";
import InputField from "@/components/ui/add-input";

export default function ClientResetPassword() {
  const [values, setValues] = useState<Record<string, string>>({});
  const { push } = useRouter();

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    push("/auth/client-success");
  };

  const fields = [
    {
      id: "password",
      label: "Update Password",
      placeholder: "••••••••",
      type: "password",
      icon: Lock,
    },
  ];

  return (
    <div className="flex min-h-screen py-[20px]">
      <div className="flex flex-col justify-center items-center w-full lg:w-[55%] bg-white">
        <div className="w-full max-w-[450px]">
          <Image
            src="/assets/logo.svg"
            alt="LexIntake Logo"
            width={258}
            height={40}
            className="mx-auto w-full"
          />
          <h2 className="text-center text-lg md:text-xl lg:text-2xl font-semibold text-gray-primary mb-1 mt-[30px]">
            Forgot your password?
          </h2>
          <p className="text-center font-medium lg:text-xl text-[#686868] mb-6">
            Choose how you’d like to verify
          </p>

          <form className="space-y-4 mt-[30px]" onSubmit={handleSubmit}>
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
              Reset My Password
            </button>
          </form>
        </div>
      </div>
      <AuthBanner
        title="Welcome to LexiIntake"
        description="We’ll guide you step by step — by voice or chat — to make your <br /> immigration process easier. No paperwork. No confusion. Just clear, secure answers. <br/>  <br/>Need help or have a question? <br/> Just ask — like you would with a real person. Lexi is here to assist you.  "
      />
    </div>
  );
}
