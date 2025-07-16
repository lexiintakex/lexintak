"use client";

import React, { FormEvent } from "react";
import { Lock, User } from "lucide-react";
import InputField from "@/components/ui/add-input";
import Image from "next/image";
import AuthBanner from "../../../../components/Banner/Banner";
import { useRouter } from "next/navigation";

const fields = [
  {
    id: "username",
    label: "User Name",
    placeholder: "John Doe",
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

export default function Login() {
  const [values, setValues] = React.useState<Record<string, string>>({});
  const { push } = useRouter();

  const handleChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    push("/lawyer/dashboard");
  };

  return (
    <div className="flex min-h-screen py-[20px]">
      <div className="flex flex-col justify-center items-center w-full lg:w-[55%]  bg-white">
        <div className="w-full max-w-sm">
          <Image
            src="/assets/logo.svg"
            alt="LexIntake Logo"
            width={258}
            height={40}
            className="mx-auto w-full"
          />

          <h2 className="text-center text-lg md:text-xl lg:text-2xl font-semibold text-gray-primary mb-1 mt-[30px]">
            Welcome Back, Counselor
          </h2>
          <p className="text-center font-medium lg:text-xl text-[#686868] mb-6">
            Please login to continue
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
              Login
            </button>

            <button
              type="button"
              onClick={() => push("/auth/lawyer-verification")}
              className="w-full mt-2 py-2 text-sm font-medium cursor-pointer text-blue-primary hover:underline"
            >
              First Time Setup Account
            </button>
          </form>
        </div>
      </div>
      <AuthBanner
        title="LexiIntake"
        description="Streamline your immigration intake process and save hours of paralegal time. Our AI-powered platform guides clients through complex forms, validates documents in real-time, and delivers structured data directly to your workflow."
      />
    </div>
  );
}
