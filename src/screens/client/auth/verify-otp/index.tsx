"use client";

import React, { useEffect, useState } from "react";
import AuthBanner from "@/components/Banner/Banner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSendOtp, useVerifyOtp } from "@/api/auth";

const isBrowser = () => typeof window !== "undefined";

export default function VerifyOtp() {
  const { push } = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { mutateAsync: verifyOtp } = useVerifyOtp();
  const { mutateAsync: resendOtp, isPending } = useSendOtp();

  useEffect(() => {
    if (!isBrowser()) return;

    const storedEmail = localStorage.getItem("reset-value");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return;
    setOtp((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
    if (val && idx < 5) {
      const nextEl = document.getElementById(`otp-${idx + 1}`);
      nextEl && (nextEl as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key !== "Backspace") return;
    setOtp((prev) => {
      const next = [...prev];
      if (next[idx]) {
        next[idx] = "";
      } else if (idx > 0) {
        next[idx - 1] = "";
        const prevEl = document.getElementById(`otp-${idx - 1}`);
        prevEl && (prevEl as HTMLInputElement).focus();
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 6 || !isBrowser()) return;

    setLoading(true);
    try {
      const res = await verifyOtp({
        email,
        otp: code,
        type: "email",
      });
      if (res) {
        localStorage.removeItem("otp-timestamp");
        push("/auth/client-reset-password");
      }
    } catch (err) {
      console.error("OTP verification failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!isBrowser()) return;
    try {
      await resendOtp({
        type: "email",
        value: email,
      });
    } catch (err) {
      console.error("Resend OTP failed", err);
    }
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
            Check your email
          </h2>
          <p className="text-center font-medium lg:text-xl text-[#686868] mb-6">
            Enter the 6-digit verification code sent to{" "}
            <span className="font-medium">{email}</span>
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
                onPaste={(e) => {
                  e.preventDefault();
                  const pasted = e.clipboardData
                    .getData("text")
                    .replace(/\D/g, "")
                    .slice(0, 6);
                  if (pasted.length === 6) {
                    const split = pasted.split("");
                    setOtp(split);
                    const lastEl = document.getElementById(`otp-5`);
                    lastEl && (lastEl as HTMLInputElement).focus();
                  }
                }}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={otp.join("").length !== 6 || loading}
            className="w-full cursor-pointer text-base font-medium mt-2 py-2 bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">
            <button
              onClick={handleResend}
              className="text-blue-primary cursor-pointer text-base font-medium hover:underline"
            >
              {isPending ? "Resending..." : "Resend Code"}
            </button>
          </div>
        </div>
      </div>
      <AuthBanner
        title="Welcome to LexiIntake"
        description="We’ll guide you step by step — by voice or chat — to make your <br /> immigration process easier. No paperwork. No confusion. Just clear, secure answers. <br/>  <br/>Need help or have a question? <br/> Just ask — like you would with a real person. Lexi is here to assist you."
      />
    </div>
  );
}
