"use client";

import React, { useState } from "react";
import AuthBanner from "../../../../components/Banner/Banner";
import { Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ClientForgotPassword() {
  const [selected, setSelected] = useState<"phone" | "email">("phone");
  const { push } = useRouter();

  const handleSubmit = () => {
    push("/auth/client-reset-password");
  };

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

          <div className="space-y-3 mt-[30px]">
            <div
              className={`flex items-center gap-3 px-4 py-3 border rounded-md cursor-pointer transition ${
                selected === "phone"
                  ? "bg-[#EAF1FF] border-blue-500"
                  : "bg-[#F8F8F8] border-[#E2E8F0]"
              }`}
              onClick={() => setSelected("phone")}
            >
              <Phone className="text-blue-600" />
              <div>
                <h4 className="text-base font-semibold text-gray-800">Phone</h4>
                <p className="text-sm text-gray-500">
                  We will send an SMS with a verification code to your phone.
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 px-4 py-3 border rounded-md cursor-pointer transition ${
                selected === "email"
                  ? "bg-[#EAF1FF] border-blue-500"
                  : "bg-[#F8F8F8] border-[#E2E8F0]"
              }`}
              onClick={() => setSelected("email")}
            >
              <Mail className="text-blue-600" />
              <div>
                <h4 className="text-base font-semibold text-gray-800">Email</h4>
                <p className="text-sm text-gray-500">
                  We will send a verification code to your email.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full cursor-pointer text-base font-medium mt-6 py-2 bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
          >
            Continue
          </button>
        </div>
      </div>
      <AuthBanner
        title="Welcome to LexiIntake"
        description="We’ll guide you step by step — by voice or chat — to make your <br /> immigration process easier. No paperwork. No confusion. Just clear, secure answers. <br/>  <br/>Need help or have a question? <br/> Just ask — like you would with a real person. Lexi is here to assist you.  "
      />
    </div>
  );
}
