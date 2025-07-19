"use client";

import Banner from "@/components/Banner";
import { Mic, MessageSquare, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

function SeelecBot() {
  return (
    <div>
      <Banner appName="Lexintake" name="Steve" />

      <h2 className="text-xl font-medium text-gray-primary mt-6">
        Choose how you’d like to share your information with us.
      </h2>

      <div className="flex flex-row items-center gap-x-4 py-5 w-[80%]">
        <Link
          href={"/client/dashboard/tts-bot"}
          type="button"
          className="w-full py-[12px]  cursor-pointer flex items-center justify-center gap-2 text-base font-medium mt-4  bg-blue-primary text-white rounded-md hover:bg-blue-800 transition"
        >
          <Mic className="w-5 h-5" />
          Talk with Voicebot
        </Link>

        <Link
          href={"/client/dashboard/text-chatbot"}
          type="button"
          className="w-full  cursor-pointer flex items-center justify-center gap-2 text-base font-medium mt-4 py-[12px] border border-blue-primary text-blue-primary rounded-md hover:bg-blue-50 transition"
        >
          <MessageSquare className="w-5 h-5" />
          Chat with Chatbot
        </Link>

        <Link
          href={"/client/dashboard/client-intake-form"}
          className="w-full cursor-pointer flex items-center justify-center gap-2 text-base font-medium mt-4 py-[12px] border border-blue-primary text-blue-primary rounded-md hover:bg-blue-50 transition"
        >
          <FileText className="w-5 h-5" />
          Fill out Form
        </Link>
      </div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="rounded text-lg font-medium  border-gray-300 text-blue-primary focus:ring-blue-500"
        />
        <span className="text-base font-medium ">
          I accept your Terms and Privacy Policy
        </span>
      </label>
    </div>
  );
}

export default SeelecBot;
