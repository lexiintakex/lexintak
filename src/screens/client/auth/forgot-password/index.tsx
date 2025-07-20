"use client";

import React, { useState } from "react";
import AuthBanner from "@/components/Banner/Banner";
import { Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InputField from "@/components/ui/add-input";
import { z } from "zod";
import axiosInstance from "@/lib/axios";

const emailSchema = z.string().email("Enter a valid email");
const phoneSchema = z.string().optional();

export default function ClientForgotPassword() {
  const [selected, setSelected] = useState<"phone" | "email">("phone");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const validate = () => {
    try {
      selected === "phone"
        ? phoneSchema.parse(inputValue)
        : emailSchema.parse(inputValue);
      return true;
    } catch (err: any) {
      console.log("🚀 ~ validate ~ err:", err);
      return false;
    }
  };

  const handleContinue = async () => {
    if (!validate()) return;

    setLoading(true);
    const payload =
      selected === "phone" ? { phone: inputValue } : { email: inputValue };

    const endpoint =
      selected === "phone"
        ? "/verification/send-phone-code"
        : "/verification/send-email-code";

    try {
      const res = await axiosInstance.post(endpoint, payload);
      if (res.data) {
        localStorage.setItem("reset-method", selected);
        localStorage.setItem("reset-value", inputValue);

        // Optional: Set a timestamp for OTP resend timer
        localStorage.setItem("otp-timestamp", Date.now().toString());
        push("/auth/verify-otp");
      }
    } catch (err: any) {
      console.log("🚀 ~ handleContinue ~ err:", err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (val: string) => {
    setInputValue(val);
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
            Choose how you’d like to verify
          </p>

          {/* Method Selector */}
          <div className="space-y-3 mt-[30px]">
            {[
              {
                id: "phone",
                icon: Phone,
                label: "Phone",
                desc: "We will send an SMS with a verification code to your phone.",
              },
              {
                id: "email",
                icon: Mail,
                label: "Email",
                desc: "We will send a verification code to your email.",
              },
            ].map(({ id, icon: Icon, label, desc }) => (
              <div
                key={id}
                className={`flex items-center gap-3 px-4 py-3 border rounded-md cursor-pointer transition ${
                  selected === id
                    ? "bg-[#EAF1FF] border-blue-500"
                    : "bg-[#F8F8F8] border-[#E2E8F0]"
                }`}
                onClick={() => {
                  setSelected(id as "phone" | "email");
                  setInputValue("");
                }}
              >
                <Icon className="text-blue-600" />
                <div>
                  <h4 className="text-base font-semibold text-gray-800">
                    {label}
                  </h4>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Input */}
          <div className="mt-6 transition-all duration-300">
            <InputField
              id="contact"
              type="text"
              label={selected === "phone" ? "Phone Number" : "Email Address"}
              placeholder={
                selected === "phone" ? "+1 987 654 3210" : "you@example.com"
              }
              value={inputValue}
              onChange={handleChange}
              icon={selected === "phone" ? Phone : Mail}
            />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            onClick={handleContinue}
            disabled={!inputValue.trim() || loading}
            className="w-full cursor-pointer text-base font-medium mt-6 py-2 bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
          >
            {loading ? "Sending..." : "Continue"}
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
