"use client";

import React from "react";
import AuthBanner from "../../../../components/Banner/Banner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCheck } from "lucide-react";

export default function ClientSuccess() {
  const { push } = useRouter();

  const handleLoginRedirect = () => {
    push("/");
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

          <div className="bg-white border border-gray-200 rounded-lg px-6 py-8 mt-8 shadow-sm text-center">
            <CheckCheck className="text-green-500 w-8 h-8 mx-auto mb-4" />

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
              Password Reset Successful
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              You have successfully reset your password. Please use your new
              password when you are logging in.
            </p>

            <button
              onClick={handleLoginRedirect}
              className="w-full py-2  cursor-pointer rounded-md bg-blue-primary text-white font-medium hover:bg-blue-800 transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <AuthBanner
        title="Welcome to LexiIntake"
        description={`We’ll guide you step by step — by voice or chat — to make your <br /> immigration process easier. No paperwork. No confusion. Just clear, secure answers. <br/><br/>Need help or have a question? <br/> Just ask — like you would with a real person. Lexi is here to assist you.`}
      />
    </div>
  );
}
