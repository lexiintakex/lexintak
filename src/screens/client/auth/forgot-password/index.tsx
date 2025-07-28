"use client";

import React, { useState } from "react";
import AuthBanner from "@/components/Banner/Banner";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InputField from "@/components/ui/add-input";
import { z } from "zod";
import { useSendOtp } from "@/api/auth";

const emailSchema = z.string().email("Enter a valid email");
const isBrowser = () => typeof window !== "undefined";

export default function ClientForgotPassword() {
  const [email, setEmail] = useState("");
  const { push } = useRouter();

  const { mutateAsync: sendOtp, isPending } = useSendOtp();
  const validate = () => {
    try {
      emailSchema.parse(email);
      return true;
    } catch {
      return false;
    }
  };

  const handleContinue = async () => {
    if (!validate() || !isBrowser()) return;

    try {
      const res = await sendOtp({
        type: "email",
        value: email,
      });
      console.log("🚀 ~ handleContinue ~ res:", res);

      if (res) {
        localStorage.setItem("reset-method", "email");
        localStorage.setItem("reset-value", email);
        localStorage.setItem("otp-timestamp", Date.now().toString());
        push("/auth/verify-otp");
      }
    } catch (err: any) {
      console.error("❌ Failed to send OTP:", err.response?.data?.error || err);
    }
  };

  return (
    <div className="flex min-h-screen py-[20px] transition-all duration-300">
      <div className="flex flex-col justify-center items-center w-full lg:w-[55%] bg-white">
        <div className="w-full max-w-[450px] transition-all duration-300">
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
            Enter your email to receive a verification code.
          </p>

          {/* Input Field */}
          <div className="mt-6 transition-all duration-300">
            <InputField
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              icon={Mail}
            />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            onClick={handleContinue}
            disabled={!email.trim() || isPending}
            className="w-full cursor-pointer text-base font-medium mt-6 py-2 bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
          >
            {isPending ? "Sending..." : "Continue"}
          </button>
        </div>
      </div>

      {/* Right Side Banner */}
      <AuthBanner
        title="Welcome to LexiIntake"
        description="We’ll guide you step by step — by voice or chat — to make your <br /> immigration process easier. No paperwork. No confusion. Just clear, secure answers. <br/>  <br/>Need help or have a question? <br/> Just ask — like you would with a real person. Lexi is here to assist you."
      />
    </div>
  );
}
