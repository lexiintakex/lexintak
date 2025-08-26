import React, { useState } from "react";
import { useVapiCallLogs } from "@/api/assistant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Download,
  Calendar,
  Clock,
  MessageSquare,
  Headphones,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface CallLogsData {
  sessionId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  messages: Array<{
    role: string;
    content: string;
    timestamp?: string;
  }>;
  transcript: string;
  audioUrl: string | null;
  duration: number | null;
  cost: number | null;
  metadata: {
    assistantId: string;
    orgId: string;
  };
}

export default function VoiceBotHistory({
  session_id,
}: {
  session_id: string;
}) {
  console.log("session_id", session_id);
  const {
    data: callLogs,
    isLoading,
    error,
    refetch,
  } = useVapiCallLogs(session_id);
  console.log("callLogs", callLogs);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

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
    link.download = `call-recording-${session_id}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading call logs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <span>Error loading call logs</span>
            </div>
            <p className="text-red-600 mt-2 text-sm">
              {error instanceof Error
                ? error.message
                : "Failed to load call logs"}
            </p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              size="sm"
              className="mt-3"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!callLogs) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-500">
              No call logs found for this session.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Voice Bot Call Logs
          </h2>
          <p className="text-gray-600">Session ID: {session_id}</p>
        </div>
        <Button onClick={() => refetch()} variant="outline">
          Refresh
        </Button>
      </div>

      {/* Call Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Headphones className="w-5 h-5" />
            <span>Call Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="font-medium">{formatDate(callLogs.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">
                  {formatDuration(callLogs.duration)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {getStatusIcon(callLogs.status)}
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge className={getStatusColor(callLogs.status)}>
                  {callLogs.status}
                </Badge>
              </div>
            </div>
          </div>

          {callLogs.cost && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">
                <strong>Cost:</strong> ${callLogs.cost.toFixed(4)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs for different content */}
      <Tabs defaultValue="transcript" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transcript">Chat Transcript</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="audio">Audio Recording</TabsTrigger>
        </TabsList>

        {/* Transcript Tab */}
        <TabsContent value="transcript" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Full Transcript</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {callLogs.transcript ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap text-sm">
                    {callLogs.transcript}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No transcript available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {callLogs.messages && callLogs.messages.length > 0 ? (
                  callLogs.messages.map((message: any, index: number) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-blue-50 border-l-4 border-blue-400"
                          : "bg-gray-50 border-l-4 border-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant={
                            message.role === "user" ? "default" : "secondary"
                          }
                        >
                          {message.role === "user" ? "User" : "Assistant"}
                        </Badge>
                        {message.timestamp && (
                          <span className="text-xs text-gray-500">
                            {formatDate(message.timestamp)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No messages available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audio Tab */}
        <TabsContent value="audio" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Headphones className="w-4 h-4" />
                <span>Audio Recording</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {callLogs.audioUrl ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={handlePlayAudio}
                      className="flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>{isPlaying ? "Pause" : "Play"}</span>
                    </Button>

                    <Button
                      onClick={handleDownloadAudio}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </Button>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Audio URL:</strong> {callLogs.audioUrl}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No audio recording available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
