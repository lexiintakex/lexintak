"use client";

import React, { useCallback, useEffect } from "react";
import { Lock, User } from "lucide-react";
import InputField from "@/components/ui/add-input";
import Image from "next/image";
import AuthBanner from "@/components/Banner/Banner";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/hooks/useAuth";

// ✅ Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// ✅ Fields config with email + password
const fields = [
  {
    id: "email",
    label: "Email",
    placeholder: "you@example.com",
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
  const { push } = useRouter();
  const { login, user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = useCallback(
    async (data: LoginFormValues) => {
      try {
        await login(data);
      } catch (err) {
        console.error("Login failed", err);
      }
    },
    [login]
  );

  return (
    <div className="flex min-h-screen py-[20px]">
      <div className="flex flex-col justify-center items-center w-full lg:w-[55%] bg-white">
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

          <form
            className="space-y-4 mt-[30px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {fields.map((field) => (
              <Controller
                key={field.id}
                name={field.id as keyof LoginFormValues}
                control={control}
                render={({ field: controllerField, fieldState: { error } }) => (
                  <InputField
                    {...field}
                    value={controllerField.value || ""}
                    onChange={controllerField.onChange}
                    error={error?.message}
                  />
                )}
              />
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer text-base font-medium mt-4 py-2 bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
            >
              {isSubmitting ? "Logging in..." : "Login"}
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
