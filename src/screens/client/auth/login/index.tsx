"use client";

import React, { useCallback } from "react";
import { Lock, User } from "lucide-react";
import InputField from "@/components/ui/add-input";
import Image from "next/image";
import AuthBanner from "@/components/Banner/Banner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

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

export default function ClientLogin() {
  const { login } = useAuth();
  const { push } = useRouter();

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
        push("/client/dashboard");
      } catch (err) {
        console.log("🚀 ~ onSubmit ~ err:", err);
      }
    },
    [login, push]
  );

  return (
    <div className="flex min-h-screen py-[20px]">
      <div className="flex flex-col justify-center items-center w-full lg:w-[55%]  bg-white">
        <div className="w-full max-w-[450px]">
          <Image
            src="/assets/logo.svg"
            alt="LexIntake Logo"
            width={258}
            height={40}
            className="mx-auto w-full"
          />

          <h2 className="text-center text-lg md:text-xl lg:text-2xl font-semibold text-gray-primary mb-1 mt-[30px]">
            Your Immigration Journey Starts Here
          </h2>
          <p className="text-center font-medium lg:text-xl text-[#686868] mb-6">
            Please login to continue
          </p>

          <form
            className="space-y-4 mt-[30px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {fields.map((field) => (
              <div key={field.id}>
                <Controller
                  name={field.id as keyof LoginFormValues}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <InputField
                      {...field}
                      value={value || ""}
                      onChange={onChange}
                      error={error?.message}
                    />
                  )}
                />
              </div>
            ))}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-sm font-medium border-gray-300 text-blue-primary focus:ring-blue-500"
                />
                <span className="text-sm font-medium ">Remember me</span>
              </label>
              <Link
                href="/auth/client-forgot-password"
                className="text-blue-primary text-sm font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer text-base font-medium mt-4 py-2 bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
      <AuthBanner
        title="Welcome to LexiIntake"
        description="We’ll guide you step by step — by voice or chat — to make your <br /> immigration process easier. No paperwork. No confusion. Just clear, secure answers. <br/>  <br/>Need help or have a question? <br/> Just ask — like you would with a real person. Lexi is here to assist you."
      />
    </div>
  );
}
