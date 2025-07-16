"use client";

import React, { useState } from "react";
import AuthBanner from "../../../../components/Banner/Banner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function VerificationCheck() {
  const { push } = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const handleChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    if (val && idx < 5) {
      const next = document.getElementById(`otp-${idx + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        // just clear the current input
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        const prev = document.getElementById(`otp-${idx - 1}`);
        if (prev) {
          (prev as HTMLInputElement).focus();
          const newOtp = [...otp];
          newOtp[idx - 1] = "";
          setOtp(newOtp);
        }
      }
    }
  };

  const handleSubmit = () => {
    push("/lawyer/dashboard");
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
            Check your phone
          </h2>
          <p className="text-center font-medium lg:text-xl text-[#686868] mb-6">
            Enter the 6-digit verification code sent to +12******08
          </p>

          <div className="flex justify-between items-center mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full cursor-pointer text-base font-medium mt-2 py-2 bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
          >
            Verify
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Resend code in <span className="font-medium">00:14</span>
          </p>
        </div>
      </div>
      <AuthBanner
        title="LexiIntake"
        description="Streamline your immigration intake process and save hours of paralegal time. Our AI-powered platform guides clients through complex forms, validates documents in real-time, and delivers structured data directly to your workflow."
      />
    </div>
  );
}
