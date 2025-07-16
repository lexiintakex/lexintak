"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface BannerProps {
  name: string;
  appName: string;
  className?: string;
  isButton?: boolean;
}

export default function Banner({
  name,
  appName,
  className,
  isButton,
}: BannerProps) {
  const { push } = useRouter();
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-md text-white h-[200px] ",
        "h-16 sm:h-[160px] px-6 flex flex-col justify-center",
        className
      )}
    >
      <div className="absolute inset-0 bg-[#0E3B85] bg-gradient-to-r from-[#0F2E6F] to-[#104598]" />

      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 200C200 200 200 0 400 0H600C400 0 400 200 200 200H0Z"
            fill="url(#stripe)"
            opacity="0.18"
          />
          <path
            d="M300 200C500 200 500 0 700 0H900C700 0 700 200 500 200H300Z"
            fill="url(#stripe)"
            opacity="0.24"
          />
          <path
            d="M600 200C800 200 800 0 1000 0H1200C1000 0 1000 200 800 200H600Z"
            fill="url(#stripe)"
            opacity="0.30"
          />
          <defs>
            <linearGradient
              id="stripe"
              x1="0"
              y1="0"
              x2="0"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0E3B85" />
              <stop offset="1" stopColor="#091F54" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* content */}
      <div className="relative z-10 flex justify-between items-center w-full">
        <div>
          <p className="flex items-center gap-2 font-medium text-sm sm:text-base">
            <span className="text-lg md:text-xl lg:text-2xl">👋</span>
            <span className="text-lg md:text-xl lg:text-2xl font-medium">{`Hi ${name},`}</span>
          </p>
          <p className="text-lg md:text-xl lg:text-2xl font-bold mt-[10px]">{`Welcome to ${appName}`}</p>
        </div>
        {isButton && (
          <button
            onClick={() => push("/client/dashboard/select-visa")}
            className="text-base flex flex-row items-center py-[16px]  gap-x-[10px] font-medium border-[1px] border-white px-[20px] cursor-pointer  bg-transparent rounded-xl"
          >
            <Image
              src={"/assets/dashboard/start.svg"}
              width={20}
              height={20}
              alt="Start"
            />
            Start New Application
          </button>
        )}
      </div>
    </div>
  );
}
