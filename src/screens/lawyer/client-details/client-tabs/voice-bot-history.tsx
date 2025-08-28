"use client";

import { useState } from "react";
import { useVapiCallLogs } from "@/api/assistant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTimeValue } from "@/lib/utils";
import {
  Play,
  Download,
  Clock,
  MessageSquare,
  Headphones,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Pause,
} from "lucide-react";

export default function VoiceBotHistory({ user_id }: { user_id: string }) {
  console.log("user_id", user_id);
  const {
    data: callLogs,
    isLoading,
    refetch,
    isError,
  } = useVapiCallLogs(user_id);
  console.log("callLogs", callLogs);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  // Using the new formatTimeValue utility function instead of local formatDuration

  const handlePlayAudio = () => {
    if (!callLogs?.audioUrl) return;

    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play();
        setIsPlaying(true);
      }
    } else {
      const audio = new Audio(callLogs.audioUrl);
      audio.onended = () => setIsPlaying(false);
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);

      setAudioElement(audio);
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleDownloadAudio = () => {
    if (!callLogs?.audioUrl) return;

    const link = document.createElement("a");
    link.href = callLogs.audioUrl;
    link.download = `call-recording-${user_id}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-primary mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-blue-50 opacity-20 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900">
              Loading call logs...
            </p>
            <p className="text-sm text-gray-500">
              Please wait while we fetch your data
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 shadow-lg">
          <CardContent className="pt-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-red-900">
                  Error Loading Call Logs
                </h3>
                <p className="text-red-700">
                  We encountered an issue while fetching your call history.
                </p>
              </div>
              <Button
                onClick={() => refetch()}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!callLogs) {
    return (
      <div className="p-8">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-gray-100/50">
          <CardContent className="pt-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  No Call Logs Found
                </h3>
                <p className="text-gray-600">
                  No call logs found for this session. Start a conversation to
                  see your history here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-3 max-w-full mx-auto">
      <div className="flex items-center justify-between bg-white  p-6 rounded-xl border shadow-sm">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Voice Bot Call Logs
          </h2>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs font-medium">
              User ID: {user_id}
            </Badge>
          </div>
        </div>
        <Button
          onClick={() => refetch()}
          variant="outline"
          className="hover:bg-gray-50 transition-all duration-200 hover:scale-105"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Headphones className="w-5 h-5 text-blue-primary" />
            </div>
            <span className="text-gray-900">Call Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {callLogs.messages?.length || 0}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Duration
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {callLogs.messages && callLogs.messages.length > 0
                    ? formatTimeValue(
                        callLogs.messages[callLogs.messages.length - 1]
                          .secondsFromStart
                      )
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200">
                  Completed
                </Badge>
              </div>
            </div>
          </div>

          {callLogs.audioUrl && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                  <Headphones className="w-4 h-4 text-blue-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-primary">
                    Audio Recording Available
                  </p>
                  <p className="text-xs text-blue-primary">
                    High-quality recording ready for playback
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="transcript" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg h-12">
          <TabsTrigger
            value="transcript"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 font-medium"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat Transcript
          </TabsTrigger>
          <TabsTrigger
            value="audio"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200 font-medium"
          >
            <Headphones className="w-4 h-4 mr-2" />
            Audio Recording
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transcript" className="mt-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-blue-primary" />
                </div>
                <span>Full Transcript</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {callLogs.messages && callLogs.messages.length > 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {callLogs.messages.map((message: any, index: number) => (
                      <div
                        key={index}
                        className="group p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Badge
                            variant={
                              message.role === "user" ? "default" : "secondary"
                            }
                            className={`text-xs font-medium ${
                              message.role === "user"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            } transition-colors duration-200`}
                          >
                            {message.role === "user" ? "User" : "Assistant"}
                          </Badge>
                          <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                            {formatTimeValue(message.secondsFromStart)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {message.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No transcript available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="mt-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Headphones className="w-4 h-4 text-blue-primary" />
                </div>
                <span>Audio Recording</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {callLogs.audioUrl ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                    <Button
                      onClick={handlePlayAudio}
                      className="flex items-center space-x-2 bg-blue-primary hover:bg-blue-700 transition-all duration-200 hover:scale-105"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      <span>{isPlaying ? "Pause" : "Play"}</span>
                    </Button>

                    <Button
                      onClick={handleDownloadAudio}
                      variant="outline"
                      className="flex items-center space-x-2 hover:bg-gray-50 transition-all duration-200 hover:scale-105 bg-transparent"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Recording Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Total Messages:</span>
                          <span className="font-medium text-blue-900">
                            {callLogs.messages?.length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Duration:</span>
                          <span className="font-medium text-blue-900">
                            {callLogs.messages && callLogs.messages.length > 0
                              ? formatTimeValue(
                                  callLogs.messages[
                                    callLogs.messages.length - 1
                                  ].secondsFromStart
                                )
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Audio URL
                      </h4>
                      <p className="text-xs text-gray-600 break-all bg-white p-2 rounded border">
                        {callLogs.audioUrl}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Headphones className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No audio recording available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
