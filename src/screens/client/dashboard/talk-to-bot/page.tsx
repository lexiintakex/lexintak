"use client";

import React from "react";
import Image from "next/image";
import { Mic, PhoneOff, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VoiceBotCallUI() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6FAFF] px-4">
      {/* Top Card */}
      <div className="bg-white shadow-md rounded-md w-full max-w-md text-center p-4 mb-8">
        <ul className="text-left text-sm text-gray-700 space-y-1 mb-4">
          <li>💡 Speak clearly and answer the questions</li>
          <li>Transcription powered by VoiceBot</li>
          <li>Ensure a quiet environment</li>
          <li>Camera will be turned on</li>
        </ul>

        {/* Avatars */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <Image src="/voicebot.png" alt="Voice Bot" width={70} height={70} />
            <p className="text-green-600 text-xs mt-1">● Voice Bot</p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/john-smith.jpg"
              alt="John Smith"
              width={70}
              height={70}
              className="rounded-md object-cover"
            />
            <p className="text-sm mt-1">John Smith</p>
          </div>
        </div>

        <Button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white rounded-md">
          🎙 Start Recording
        </Button>
      </div>

      {/* Call Ongoing UI */}
      <div className="flex items-center gap-8">
        {/* VoiceBot */}
        <div className="flex flex-col items-center">
          <Image src="/voicebot.png" alt="Voice Bot" width={70} height={70} />
          <p className="text-green-600 text-sm mt-1">● Voice Bot</p>
        </div>

        {/* User */}
        <div className="flex flex-col items-center">
          <Image
            src="/john-smith.jpg"
            alt="John Smith"
            width={70}
            height={70}
            className="rounded-md object-cover"
          />
          <p className="text-sm mt-1">John Smith</p>
        </div>
      </div>

      {/* Call Controls */}
      <div className="flex items-center gap-4 mt-6">
        <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800">
          <Mic size={20} />
        </button>
        <button className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700">
          <PhoneOff size={20} />
        </button>
        <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300">
          <Video size={20} />
        </button>
      </div>

      {/* Optional: Eye icon for privacy toggle */}
      {/* Replace <Video /> with <Eye /> if needed */}
    </div>
  );
}
