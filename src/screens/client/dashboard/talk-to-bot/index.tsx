"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Lightbulb,
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VoiceAssistantScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleEndCall = () => {
    setIsRecording(false);
    setIsMicMuted(false);
    setIsSpeakerOn(true);
  };

  const toggleMicMute = () => {
    setIsMicMuted((prev) => !prev);
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {!isRecording ? (
        <Card className="w-full max-w-xl rounded-xl shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2 text-blue-primary">
              <Lightbulb className="h-5 w-5" />
              <CardTitle className="text-lg font-semibold">
                Instructions:
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <ol className="list-decimal list-inside space-y-2 text-sm font-medium text-blue-primary">
              <li>Please speak clearly and answer as prompted.</li>
              <li>Your answers will be saved to your profile.</li>
              <li>You can review your recordings later.</li>
              <li>Click the &ldquo;Start Recording&ldquo; button to begin.</li>
            </ol>

            <div className="flex items-center justify-center space-x-2">
              <div className="flex flex-col items-center">
                <Image
                  src="/assets/dashboard/chat-bot-1.png"
                  alt="Voice Bot Avatar"
                  width={236}
                  height={236}
                  className="mt-[-8px]"
                />
                <div className="relative top-[18px] flex flex-row items-center gap-x-[10px]">
                  <span className="h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                  <p className="text-xl font-semibold text-gray-primary">
                    Voice Bot
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/assets/dashboard/user.svg"
                  alt="John Smith Avatar"
                  width={236}
                  height={236}
                  className="rounded-r-md"
                />
                <p className="text-xl font-semibold relative top-[10px]">
                  John Smith
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleStartRecording}
                className="w-1/2 font-medium text-base cursor-pointer rounded-full bg-[#0FC254] py-[10px] text-white hover:bg-green-600"
              >
                <Mic className="mr-2 h-4 w-4" />
                Start Recording
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-xl rounded-xl shadow-lg">
          <CardContent className="space-y-8">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex flex-col items-center">
                <Image
                  src="/assets/dashboard/chat-bot-1.png"
                  alt="Voice Bot Avatar"
                  width={236}
                  height={236}
                  className="mt-[-8px]"
                />
                <div className="relative top-[18px] flex flex-row items-center gap-x-[10px]">
                  <span className="h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                  <p className="text-xl font-semibold text-gray-primary">
                    Voice Bot
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/assets/dashboard/user.svg"
                  alt="John Smith Avatar"
                  width={236}
                  height={236}
                  className="rounded-r-md"
                />
                <p className="text-xl font-semibold relative top-[10px]">
                  John Smith
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-blue-200" />
            <div className="flex items-center justify-center space-x-6 bg-white py-4 shadow-lg w-full">
              <Button
                onClick={toggleMicMute}
                variant="ghost"
                size="icon"
                className="h-13 w-13  cursor-pointerrounded-full border border-blue-primary rounded-full cursor-pointer text-blue-primary hover:bg-blue-200"
              >
                {isMicMuted ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>
              <Button
                onClick={handleEndCall}
                size="icon"
                className="h-16 w-16 rounded-full cursor-pointer bg-red-500 hover:bg-red-600"
              >
                <PhoneOff className="h-8 w-8 text-white" />
              </Button>
              <Button
                onClick={toggleSpeaker}
                variant="ghost"
                size="icon"
                className="h-13 w-13 hover:bg-blue-200 rounded-full border-[1px] cursor-pointer border-blue-primary  text-gray-primary"
              >
                {isSpeakerOn ? (
                  <Volume2 className="h-6 w-6 text-blue-primary" />
                ) : (
                  <VolumeX className="h-6 w-6 text-blue-primary" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
