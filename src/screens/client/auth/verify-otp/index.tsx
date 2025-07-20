"use client";

import React, { useEffect, useState } from "react";
import AuthBanner from "@/components/Banner/Banner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

const isBrowser = () => typeof window !== "undefined";

export default function VerifyOtp() {
  const { push } = useRouter();

  /* ── state ── */
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"phone" | "email">("email");
  const [value, setValue] = useState("");

  /* ── init (client‑only) ── */
  useEffect(() => {
    if (!isBrowser()) return;

    /** timestamp → timer */
    const ts = localStorage.getItem("otp-timestamp");
    if (ts) {
      const remaining = 60 - Math.floor((Date.now() - parseInt(ts, 10)) / 1000);
      setTimer(remaining > 0 ? remaining : 0);
    }

    /** method / value */
    const m = localStorage.getItem("reset-method");
    const v = localStorage.getItem("reset-value");
    if (m === "phone" || m === "email") setMethod(m);
    if (v) setValue(v);
  }, []);

  /* ── countdown ── */
  useEffect(() => {
    if (timer === 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const resetTimer = () => {
    if (!isBrowser()) return;
    localStorage.setItem("otp-timestamp", Date.now().toString());
    setTimer(60);
  };

  /* ── input change ── */
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

  /* ── verify ── */
  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 6 || !isBrowser()) return;

    setLoading(true);
    try {
      const payload =
        method === "phone" ? { phone: value, code } : { email: value, code };

      const endpoint =
        method === "phone"
          ? "/verification/verify-phone-code"
          : "/verification/verify-email-code";

      const res = await axiosInstance.post(endpoint, payload);
      if (res.data?.success) {
        localStorage.removeItem("otp-timestamp");
        push("/client/reset-password");
      }
    } catch (err) {
      console.error("OTP verification failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── resend ── */
  const handleResend = async () => {
    if (!isBrowser()) return;
    const m = localStorage.getItem("reset-method");
    const v = localStorage.getItem("reset-value");
    if (!m || !v) return;

    try {
      /* call resend endpoint here if needed */
      resetTimer();
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
            Check your {method === "phone" ? "phone" : "email"}
          </h2>
          <p className="text-center font-medium lg:text-xl text-[#686868] mb-6">
            Enter the 6-digit verification code sent to{" "}
            <span className="font-medium">{value}</span>
          </p>

          {/* OTP Inputs */}
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
            disabled={otp.join("").length !== 6 || loading}
            className="w-full cursor-pointer text-base font-medium mt-2 py-2 bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">
            {timer > 0 ? (
              <p>
                Resend code in{" "}
                <span className="font-medium">
                  00:{timer.toString().padStart(2, "0")}
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-blue-primary cursor-pointer text-base font-medium hover:underline"
              >
                Resend Code
              </button>
            )}
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
