"use client";

import { useEffect, useState, useRef } from "react";
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
import Vapi from "@vapi-ai/web";
import useAuth from "@/hooks/useAuth";
import { useWorkflowId } from "@/api/assistant";
import Loader from "@/components/ui/loader";
import ErrorMessage from "@/components/ui/error-message";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

const API_KEY = "271e8a36-4373-44bd-9804-cde7d4ff9c49";

export default function VoiceAssistantScreen() {
  const router = useRouter();
  const [vapi, setVapi] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [transcripts, setTranscripts] = useState<
    Array<{ role: string; transcript: string; timestamp: Date }>
  >([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const { user, globalLanguage } = useAuth();
  const {
    data: workflowId,
    isLoading,
    isError,
  } = useWorkflowId(user?.form_type, globalLanguage);

  console.log("🚀 ~ VoiceAssistantScreen ~ workflowId:", workflowId);

  // Auto-scroll to bottom when new transcripts arrive
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcripts]);

  useEffect(() => {
    const vapiInstance = new Vapi(API_KEY);
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      console.log("✅ Call started");
      setTranscripts([]);
    });

    vapiInstance.on("call-end", () => {
      console.log("🔴 Call ended");
      setIsRecording(false);
      setIsMicMuted(false);
      setIsSpeakerOn(true);
      router.push("/client/dashboard/client-intake-form");
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript") {
        console.log(`${message.role}: ${message.transcript}`);
        const newTranscript = {
          role: message.role,
          transcript: message.transcript,
          timestamp: new Date(),
        };
        setTranscripts((prev) => [...prev, newTranscript]);
      }
    });
  }, []);

  const handleCreateSession = async () => {
    if (!workflowId) return;

    try {
      const response = await axiosInstance.post("/assistant/session", {
        workflowId: workflowId,
        language: globalLanguage,
        form_type: user?.form_type,
      });
      return response.data.sessionId;
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const handleStartRecording = async () => {
    if (!vapi || !user || !workflowId) return;

    try {
      const sessionId = await handleCreateSession();
      console.log("Session ID:", sessionId);
      vapi.start(null, { maxDurationSeconds: 1800 }, null, workflowId);

      setIsRecording(true);
    } catch (err) {
      console.error("Failed to create session or start Vapi:", err);
    }
  };

  const handleEndCall = () => {
    if (!vapi) return;
    vapi.stop();
  };

  const toggleMicMute = () => {
    if (!vapi) return;
    if (isMicMuted) vapi.unmuteMicrophone();
    else vapi.muteMicrophone();
    setIsMicMuted((prev) => !prev);
  };

  const toggleSpeaker = () => {
    if (!vapi) return;
    if (isSpeakerOn) vapi.mute();
    else vapi.unmute();
    setIsSpeakerOn((prev) => !prev);
  };

  if (isLoading) return <Loader text="Preparing voice assistant..." />;
  if (isError)
    return <ErrorMessage message="Unable to load assistant workflow." />;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {!isRecording ? (
        <Card className="w-full max-w-3xl rounded-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-6 pt-8">
            <div className="flex items-center justify-center space-x-3 text-blue-primary">
              <div className="p-2 bg-blue-50 rounded-full">
                <Lightbulb className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold tracking-tight">
                Voice Assistant Instructions
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-10 px-8 pb-8">
            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
              <ol className="list-decimal list-inside space-y-3 text-base font-medium text-blue-primary">
                <li className="flex items-start space-x-3">
                  <span className="font-semibold">1. </span>
                  <span>Please speak clearly and answer as prompted.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-semibold">2.</span>
                  <span>Your answers will be saved to your profile.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-semibold">3.</span>
                  <span>
                    Click the &quot;Start Recording&quot; button to begin.
                  </span>
                </li>
              </ol>
            </div>

            <div className="flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <Image
                    src="/assets/dashboard/chat-bot-1.png"
                    alt="Voice Bot Avatar"
                    width={220}
                    height={220}
                    className="relative z-10 drop-shadow-lg"
                  />
                </div>
                <div className="mt-4 flex flex-row items-center gap-x-3">
                  <p className="text-xl font-bold text-gray-primary">
                    Voice Bot
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <Image
                    src="/assets/dashboard/user.svg"
                    alt="John Smith Avatar"
                    width={220}
                    height={220}
                    className="relative z-10 drop-shadow-lg"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-xl font-bold text-gray-800">John Smith</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={handleStartRecording}
                className="group relative w-64 h-14 font-semibold text-lg cursor-pointer rounded-full bg-[#0FC254] text-white hover:bg-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  <Mic className="h-5 w-5" />
                  <span>Start Recording</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-4xl rounded-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="space-y-8 p-8">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex flex-col items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-full blur-xl opacity-40 animate-pulse"></div>
                  <Image
                    src="/assets/dashboard/chat-bot-1.png"
                    alt="Voice Bot Avatar"
                    width={200}
                    height={200}
                    className="relative z-10 drop-shadow-lg"
                  />
                </div>
                <div className="mt-4 flex flex-row items-center gap-x-3">
                  <p className="text-xl font-bold text-gray-primary">
                    Voice Bot
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full blur-xl opacity-30"></div>
                  <Image
                    src="/assets/dashboard/user.svg"
                    alt="John Smith Avatar"
                    width={200}
                    height={200}
                    className="relative z-10 drop-shadow-lg"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-xl font-bold text-gray-800">John Smith</p>
                </div>
              </div>
            </div>

            <div className="max-h-96 overflow-hidden border-2 border-blue-100 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-inner">
              <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-white border-b border-blue-200 px-6 py-4 rounded-t-2xl">
                <h3 className="font-bold text-gray-800 text-center text-lg flex items-center justify-center space-x-2">
                  <span className="text-2xl">💬</span>
                  <span>Live Conversation</span>
                  <div className="flex space-x-1 ml-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </h3>
              </div>
              <div
                ref={transcriptRef}
                className="max-h-80 overflow-y-auto p-6 space-y-4"
              >
                {transcripts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
                      <Mic className="h-10 w-10 text-blue-primary animate-pulse" />
                    </div>
                    <p className="text-gray-500 text-base font-medium">
                      Start speaking to see the conversation...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transcripts.map((transcript, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          transcript.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        } animate-in slide-in-from-bottom-2 duration-300`}
                      >
                        <div
                          className={`max-w-[85%] p-4 rounded-2xl shadow-md transition-all  mb-2 duration-200 hover:shadow-lg ${
                            transcript.role === "user"
                              ? "bg-blue-primary text-white rounded-br-md"
                              : "bg-white text-gray-800 border-2 border-gray-100 rounded-bl-md"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold opacity-80 uppercase tracking-wide">
                              {transcript.role === "user"
                                ? "You"
                                : "AI Assistant"}
                            </span>
                            <span className="text-xs opacity-70 font-medium">
                              {transcript.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed font-medium">
                            {transcript.transcript}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-6 shadow-inner border border-gray-100">
              <div className="flex items-center justify-center space-x-8">
                <Button
                  onClick={toggleMicMute}
                  variant="ghost"
                  size="icon"
                  className={`h-16 w-16 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                    isMicMuted
                      ? "border-red-300 text-red-500 bg-red-50 hover:bg-red-100"
                      : "border-blue-primary text-blue-primary bg-blue-50 hover:bg-blue-100"
                  }`}
                >
                  {isMicMuted ? (
                    <MicOff className="h-7 w-7" />
                  ) : (
                    <Mic className="h-7 w-7" />
                  )}
                </Button>

                <Button
                  onClick={handleEndCall}
                  size="icon"
                  className="h-20 w-20 rounded-full bg-red-500 hover:bg-red-600 transform hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl relative group"
                >
                  <div className="absolute inset-0 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 animate-pulse"></div>
                  <PhoneOff className="h-9 w-9 text-white relative z-10" />
                </Button>

                <Button
                  onClick={toggleSpeaker}
                  variant="ghost"
                  size="icon"
                  className={`h-16 w-16 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                    !isSpeakerOn
                      ? "border-red-300 text-red-500 bg-red-50 hover:bg-red-100"
                      : "border-blue-primary text-blue-primary bg-blue-50 hover:bg-blue-100"
                  }`}
                >
                  {isSpeakerOn ? (
                    <Volume2 className="h-7 w-7" />
                  ) : (
                    <VolumeX className="h-7 w-7" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
